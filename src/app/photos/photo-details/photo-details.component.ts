import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/core/user/user.service";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { Photo } from "../photo/photo";
import { PhotoService } from "../photo/photo.service";

@Component({
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
  photo$: Observable<Photo>;

  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
    ) {
  }
  ngOnInit(): void {
    this.photoId = this.route.snapshot.params.photoId;

    this.photo$ = this.photoService.findById(this.photoId);

    this.photo$.subscribe(() => {}, err => {
      console.log(err);
      this.router.navigate(['not-found']);
    });
  }

  remove() {
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(
        () => {
          this.alertService.success('Photo removed!', true);
          // Remove a rota atual da history API para que não seja possível voltar com o back button do browser
          // A rota nova é incluída em seu lugar.
          // É útil em operações de remoção, pois não faz sentido voltar para uma rota de algo inexistente
          this.router.navigate(['/user', this.userService.getUserName()], {replaceUrl: true})
        },
        err => {
          console.log(err);
          this.alertService.warning('Could not delete the photo!', true);
        });
  }

  like(photo: Photo) {
    this.photoService
      .like(photo.id)
      .subscribe(
        liked => {
          if (liked) {
            this.photo$ = this.photoService.findById(photo.id);
          }
        },
        err => alert(err));
  }
}
