import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;

  commentForm: FormGroup;

  comments$: Observable<PhotoComment[]>;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.photoId);
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    })
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;

    console.log('chamei');

    this.comments$ = this.photoService
      .addComment(this.photoId, comment)
      // Muda o fluxo do primeiro Observable (addComments) para o segundo (getComments)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      // Antes do getComments retornar o Observable, é possível executar o código no tap
      .pipe(tap(() => {
        this.commentForm.reset();
      }));
  }
}
