import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePedidoComponent } from './detalhe-pedido.component';

describe('DetalhePedidoComponent', () => {
  let component: DetalhePedidoComponent;
  let fixture: ComponentFixture<DetalhePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
