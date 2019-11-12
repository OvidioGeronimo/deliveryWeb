import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/pedidos/shared/pedido.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalAguardandoConfirmacao: Observable<number>;
  totalEmPreparacao: Observable<number>;
  totalSaiuParaEntrega: Observable<number>;
  totalEntregue: Observable<number>;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.popularDashboard();
  }

  popularDashboard() {
    this.totalAguardandoConfirmacao = this.pedidoService.getTotalAguardandoConfirmacao();
    this.totalEmPreparacao = this.pedidoService.getTotalEmPreparacao();
    this.totalSaiuParaEntrega = this.pedidoService.getTotalSaiuParaEntrega();
    this. totalEntregue = this.pedidoService.getTotalEntregue();
  }
}
