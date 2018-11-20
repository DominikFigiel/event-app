import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
      this.alertify.success('Zalogowano.');
    }, error => {
      this.showErrorNotificationsFromRequest(error);
    });
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

  showErrorNotificationsFromRequest(errorString) {
    const errors = errorString.split('\n');
    for (let i = errors.length - 1; i >= 0; i--) {
      if (errors[i] !== '') {
        this.alertify.error(errors[i]);
      }
    }
  }

}
