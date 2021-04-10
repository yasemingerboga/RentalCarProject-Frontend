import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let registerModel=Object.assign({},this.loginForm.value);
      this.authService.login(registerModel).subscribe(response=>{
        this.toastrService.info(response.message);
        this.localStorageService.setLocalStorage("token",response.data.token);
      },responseError=>{
        this.toastrService.error(responseError.error);
      })
    }
  }
}
