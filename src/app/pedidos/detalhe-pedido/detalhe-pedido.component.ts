import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../shared/pedido.service';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.scss']
})
export class DetalhePedidoComponent implements OnInit {
  pedido: any = {}
  produtos: Observable<any[]>

  constructor(private pedidoService: PedidoService, private route: ActivatedRoute) { }

  ngOnInit() {
    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      const subscribe = this.pedidoService.getByKey(key).subscribe((pedido: any) => {
        subscribe.unsubscribe();
        this.pedido = pedido;
      });

      this.produtos = this.pedidoService.getAllProdutos(key);
    }
  }

  getStatusNome(status: number) {
    return this.pedidoService.getStatusNome(status);
  }

  getFormaPagamentoNome(tipoPagamento: number) {
    return this.pedidoService.getFormaPagamentoNome(tipoPagamento);
  }
}
