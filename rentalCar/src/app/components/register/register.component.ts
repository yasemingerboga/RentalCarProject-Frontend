import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { UserInformation } from 'src/app/models/userInformation';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserInformationService } from 'src/app/services/user-information.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  flag:boolean;
  currentUser:RegisterModel;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private userInformationService:UserInformationService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      userId:[""]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel=Object.assign({},this.registerForm.value);
      
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.info(response.message);
        this.localStorageService.setLocalStorage("token",response.data.token);
      },responseError=>{
        this.toastrService.error(responseError.error);
      })
    }
  }
}
