import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Photo } from "../photo/photo";
import { PhotoComment } from "../photo/photo-comment";
import { PhotoService } from "../photo/photo.service";

@Component({
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
  photo$: Observable<Photo>;

  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
    ) {
  }
  ngOnInit(): void {
    this.photoId = this.route.snapshot.params.photoId;

    this.photo$ = this.photoService.findById(this.photoId);
  }
}
