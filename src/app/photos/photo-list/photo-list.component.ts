import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  // Ocorre depois da instanciação e depois de receber as inbound properties
  ngOnInit(): void {
    console.log('init photo-list');

    console.log(this.photos.length);

    /**
     *
     Componentes que atendem mais de uma rota, como em rotas parametrizadas, por exemplo, apresentam um comportamento inesperado com relação à lógica do OnInit. O ngOnInit é executado apenas uma vez quando o componente é carregado para a rota. Mas se a rota mudar e o componente for o mesmo, ele não será recarregado e o código em ngOnInit não será executado novamente. Uma solução é monitorar alterações nos parâmetros da rota.
     */
    /*
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos;
    */
   this.activatedRoute.params.subscribe(params => {
     this.userName = params.userName;
     this.photos = this.activatedRoute.snapshot.data['photos'];
   })
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        // Não funciona porque o componente não sabe que o this.photos mudou, já que a referência é a mesma
        // this.photos.push(...photos);
        this.photos = this.photos.concat(photos);

        if (!photos.length) {
          this.hasMore = false;
        }
      });
  }
}
