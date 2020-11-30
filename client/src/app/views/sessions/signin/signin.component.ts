import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from 'app/shared/models/token.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  error: string;

  constructor(
    private _router: Router,
    private _http: HttpClient,
    @Inject('BASE_URL') private _baseUrl: string
  ) { 
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentToken");
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  signin() {
    const signinData = this.signinForm.value
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    setTimeout(() => {
      this._http.post(this._baseUrl + 'login', { email: signinData.username, password: signinData.password }, {responseType: 'text'}).subscribe(result => {
        if (result) {
          localStorage.setItem("currentUser", signinData.username);
          localStorage.setItem("currentToken", result);
          this._router.navigate(['/']);
        }
      }, err =>{ 
        console.error(err);
        this.error = "Login failed";
      });
      this.submitButton.disabled = false;
      this.progressBar.mode = null;
    }, 1000);
  }

}
