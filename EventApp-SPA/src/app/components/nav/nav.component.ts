import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      // this.alertify.success('Zalogowano.');
    }, error => {
      console.log(error);
      // this.alertify.error('Logowanie nieudane.');
    }, () => {
      // this.router.navigate(['/welcome']);
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
    // return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    // this.alertify.message('Zostałeś wylogowany.');
    // this.router.navigate(['/home']);
  }

}
