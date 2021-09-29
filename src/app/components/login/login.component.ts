import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = {
    username: "",
    password: ""
  }
  token: string = '';
  error: string = '';

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void { }

  onLogin() {
    console.log(this.loginForm.username);
    console.log(this.loginForm.password);

    this.usersService.loginUser(this.loginForm.username, this.loginForm.password)
      .subscribe(
        res => {
          this.token = res.headers.get("Authorization");
          console.log(this.token);
          localStorage.setItem("token", this.token);
          this.usersService.isLoggedIn();
          this.router.navigate(["home"]);
        },
        error => {
          this.error = "Unable to login with username and password."
          alert(this.error);
        }
      );
  }
}