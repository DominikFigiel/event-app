import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsLocaleService, defineLocale, BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';
import { plLocale } from 'ngx-bootstrap/locale';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common';
defineLocale('pl', plLocale);

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder, private bsLocale: BsLocaleService ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-default',
      maxDate: this.getMaxDate(18)
    };
    this.bsLocale.use('pl');
    this.createRegisterForm();
  }

  getMaxDate(minAge: number) {
    const maxDate = new Date();
    const maxYear = maxDate.getFullYear() - minAge;
    maxDate.setFullYear(maxYear);
    return maxDate;
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      dateOfBirth: [null, [Validators.required]]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  ageValidator(g: FormGroup) {
    // TO DO: Check if user is an adult
    return true;
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Rejestracja zakończona.');
        this.alertify.success('Zostałeś zalogowany.');
      }, error => {
        this.showErrorNotificationsFromRequest(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/events']);
        });
      });

    }
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Rejestracja zakończona.');
    //   this.alertify.success('Teraz możesz się zalogować.');
    // }, error => {
    //   this.showErrorNotificationsFromRequest(error);
    // });
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  showErrorNotificationsFromRequest(errorString) {
    const errors = errorString.split('\n');
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] !== '') {
        if (errors[i].charAt(0) === ',') {
          this.alertify.error(errors[i].slice(1, errors[i].length));
        } else {
          this.alertify.error(errors[i]);
        }
      }
    }
  }

}
