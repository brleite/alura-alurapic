import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while(route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => this.titleService.setTitle(event.title));
  }
}
