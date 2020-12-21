import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    /* const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value; */
    const {description, allowComments} = this.photoForm.getRawValue();
    /* console.log(description);
    console.log(allowComments);
    console.log(this.file); */

    this.photoService
      .upload(description, allowComments, this.file)
      // Operador para executar operação dando certo ou errado
      .pipe(finalize(() => {
        this.router.navigate(['/user', this.userService.getUserName()])
      }))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event.type == HttpEventType.Response /*event instanceof HttpResponse */) {
            this.alertService.success('Upload complete!', true);
            // Isso é tratado no finalize
            // this.router.navigate(['/user', this.userService.getUserName()])
          }
        },
        err => {
          console.log(err);
          this.alertService.danger('Upload error!', true);
          // Isso é tratado no finalize
          // this.router.navigate(['/user', this.userService.getUserName()])
        });
  }

  handleFile(file: File) {
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
