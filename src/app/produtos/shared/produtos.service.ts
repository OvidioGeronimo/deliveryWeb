import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@ Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  produtosRef: AngularFireList < any >;

  constructor(private db: AngularFireDatabase) {
    this .produtosRef = this .db.list('produtos/');
  }

insert(produto: any) {
  return this .produtosRef.push(produto);
}

update(produto: any, key: string) {
  return this .produtosRef.update(key, produto);

}

getAll() {
  return this .produtosRef.snapshotChanges().pipe(
    map(changes => {
      return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
    })
  )
}

getProdutosByCategoria(key: string) {
}

getByKey(key: string) {
  const path = 'produtos/'+key;
  return this .db.object(path).snapshotChanges().pipe(
    map(change =>{
      return ({ key: change.key, ...change.payload.val() });
    })
  );


}

remove(key: string) {
  // return new Promise((resolve, reject) => {
  //   const subscribe = this.getProdutosByCategoria(key).subscribe((produtos: any) => {
  //     subscribe.unsubscribe();

  //     if (produtos.length == 0) {
        return this .produtosRef.remove(key);
  //     } else {
  //       reject('Não é possível excluir a categoria pois ela tem produtos associados.')
  //     }
  //   });
  // });
  // this .categoriasRef.remove(key);

}

}
