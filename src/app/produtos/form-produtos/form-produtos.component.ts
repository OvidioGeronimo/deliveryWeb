import { ProdutosService } from '../shared/produtos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@ Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.scss']
})
export class FormProdutosComponent implements OnInit {
  formProduto: FormGroup;
  key:string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private produtosService: ProdutosService,
              private toastr: ToastrService,
              private router: Router

  ) { }

  ngOnInit() {
    this .criarFormulario();
    this .key = this .route.snapshot.paramMap.get('key');
        if(this .key){

          const produtoSubscribe = this .produtosService.getByKey(this .key)
          .subscribe((produtos:any) => {

            produtoSubscribe.unsubscribe();
            this .formProduto.setValue({nome: produtos.nome, descricao: produtos.descricao, preco: produtos.preco});
          });
        }
      }

      get nome(){ return this .formProduto.get('nome'); }
      get descricao() { return this .formProduto.get('descricao'); }
      get preco() { return this .formProduto.get('preço'); }



    criarFormulario() {
      this .key = null;
      this .formProduto = this .formBuilder.group({
        nome: ['', Validators.required],
        descricao: [''],
      });
  }

  onSubmit(){
    if(this .formProduto.valid) {
      if(this .key) {
      this .produtosService.update(this .formProduto.value, this .key);
      } else {
        this .produtosService.insert(this .formProduto.value);
      }
       this .router.navigate(['produtos']);
      this .toastr.success('Produto salvo com sucesso!!!');
    }
  }



}
