import { FormGroup, ValidatorFn } from "@angular/forms";

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
  const userName = formGroup.get('userName').value;
  const password = formGroup.get('password').value;

  // Faz a validação somente se os campos não forem em branco
  if (userName.trim() + password.trim()) {
    return userName != password ? null : { userNamePassword: true }
  } else {
    return null;
  }
}
