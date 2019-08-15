import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.scss']
})
export class FormProdutosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private categoriasService: CategoriasService,
              private toastr: ToastrService,
              private router: Router

  ) { }

  ngOnInit() {
    this .criarFormulario();
    this .key = this .route.snapshot.paramMap.get('key');
        if(this .key){

          const categoriaSubscribe = this .categoriasService.getByKey(this .key)
          .subscribe((categorias:any) => {

            categoriaSubscribe.unsubscribe();
            this .formCategoria.setValue({nome: categorias.nome, descricao: categorias.descricao});
          });
        }
      }

      get nome(){ return this .formCategoria.get('nome'); }
      get descricao() { return this .formCategoria.get('descricao'); }
      get preco() { return this .formCategoria.get('preço'); }



    criarFormulario() {
      this .key = null;
      this .formCategoria = this .formBuilder.group({
        nome: ['', Validators.required],
        descricao: [''],
      });
  }

}
