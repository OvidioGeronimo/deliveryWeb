import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FirebasePath } from './../../core/shared/firebase-path';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public static TIPO_FORMA_PAGAMENTO = {
    DINHEIRO: 1,
    CARTAO: 2
  };

  public static STATUS = {
    AGUARDANDO_CONFIRMACAO: 0,
    EM_PREPARACAO: 1,
    SAIU_PARA_ENTREGA: 2,
    ENTREGUE: 3
  };

  constructor(private db: AngularFireDatabase) { }

  getByKey(key: string) {
    const path = `${FirebasePath.PEDIDOS}${key}`;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );
  }

  getAll() {
    return this.db.list(FirebasePath.PEDIDOS, q => q.orderByChild('data')).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getAllAbertos() {
    return this.db.list(FirebasePath.PEDIDOS,
      q => q.orderByChild('status').endAt(PedidoService.STATUS.SAIU_PARA_ENTREGA))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        })
      )
  }

  getStatusNome(status: number) {
    switch (status) {
      case PedidoService.STATUS.AGUARDANDO_CONFIRMACAO:
        return 'Aguardando confirmação';
      case PedidoService.STATUS.EM_PREPARACAO:
        return 'Em preparação';
      case PedidoService.STATUS.SAIU_PARA_ENTREGA:
        return 'Saiu para entrega';
      case PedidoService.STATUS.ENTREGUE:
        return 'Entregue';
    }
  }

  getFormaPagamentoNome(paymentType: number) {
    switch (paymentType) {
      case PedidoService.TIPO_FORMA_PAGAMENTO.DINHEIRO:
        return 'Dinheiro';
      case PedidoService.TIPO_FORMA_PAGAMENTO.CARTAO:
        return 'Cartão de crédito/débido';
    }
  }

  updateStatus(pedido: any, novoStatus: number) {
    this.db.list(FirebasePath.PEDIDOS)
      .update(pedido.key, {
        status: novoStatus,
        usuarioStatus: pedido.usuarioKey + '_' + novoStatus
      });
  }

  getAllProdutos(key: string) {
    const path = `${FirebasePath.PEDIDOS_PRODUTOS}${key}`;
    return this.db.list(path).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getTotalAguardandoConfirmacao() {
    return this.getTotalPorStatus(PedidoService.STATUS.AGUARDANDO_CONFIRMACAO);
  }

  getTotalEmPreparacao() {
    return this.getTotalPorStatus(PedidoService.STATUS.EM_PREPARACAO);
  }

  getTotalSaiuParaEntrega() {
    return this.getTotalPorStatus(PedidoService.STATUS.SAIU_PARA_ENTREGA);
  }

  getTotalEntregue() {
    return this.getTotalPorStatus(PedidoService.STATUS.ENTREGUE);
  }

  private getTotalPorStatus(status: number) {
    return this.db.list(FirebasePath.PEDIDOS, q => q.orderByChild('status').equalTo(status))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.length;
        })
      )
  }
}
