import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoService } from '../shared/pedido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: Observable<any[]>;
  @Input() dashboardMode = false;

  constructor(private pedidoService: PedidoService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.dashboardMode) {
      this.pedidos = this.pedidoService.getAllAbertos();
    } else {
      this.pedidos = this.pedidoService.getAll();
    }
  }

  getStatusNome(status: number) {
    return this.pedidoService.getStatusNome(status);
  }

  setStatusEmPreparacao(pedido: any) {
    this.setStatusPedido(pedido, PedidoService.STATUS.EM_PREPARACAO);
  }

  setStatusSaiuParaEntrega(pedido: any) {
    this.setStatusPedido(pedido, PedidoService.STATUS.SAIU_PARA_ENTREGA);
  }

  setStatusEntregue(pedido: any) {
    this.setStatusPedido(pedido, PedidoService.STATUS.ENTREGUE);
  }

  setStatusPedido(pedido: any, status: number) {
    this.pedidoService.updateStatus(pedido, status);
    this.toastr.show('Status alterado com sucesso.');
  }
}
