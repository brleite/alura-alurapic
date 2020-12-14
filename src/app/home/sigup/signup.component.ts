import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-no-taken.validator.service';

@Component({
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]],
      userName: ['', [
        Validators.required,
        // Validators.pattern(/^[a-z0-9_\-]+$/),
        lowerCaseValidator,
        Validators.minLength(2),
        Validators.maxLength(30)
      ], this.userNotTakenValidatorService.checkUserNameTaken()],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
      ]]
    });
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;

    this.signUpService
      .signup(newUser)
      .subscribe(
        () => {
          return this.router.navigate([''])
        },
        err => console.log(err)
      )
  }
}
