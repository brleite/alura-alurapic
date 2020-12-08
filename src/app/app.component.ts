import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photos/photo/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  photos: Object[] = [];

  constructor(private photoService: PhotoService) {}

  // Ocorre depois da instanciação e depois de receber as inbound properties
  ngOnInit(): void {
    this.photoService
      .listFromUser('flavio')
      .subscribe(photos => this.photos = photos)
  }

  /* photos = [
    {
      url: "https://cdn.leroymerlin.com.br/products/quadro_leao_bronze_100x100cm_90658085_0001_600x600.jpg",
      description: "Leão"
    },
    {
      url: "https://s2.glbimg.com/awP2KnJnzIYEWAVOYLFL4d2nG0I=/0x0:2400x1599/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/a/m/0T0EZ4QZqcrtzp9ZwNeg/2018-10-21t152242z-534837741-rc174f509210-rtrmadp-3-usa-zoo-lions.jpg",
      description: "Leoa"
    }
  ]; */
}
