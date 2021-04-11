import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { UserInformation } from 'src/app/models/userInformation';
import { UserInformationService } from 'src/app/services/user-information.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  userInformationForm: FormGroup;
  user:UserInformation;
  constructor(private formBuilder:FormBuilder,
    private userInformationService:UserInformationService,
    private toastrService:ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.createUserInformationForm();
        this.setUser(params["userId"]);
      }
    });
  }
  setUser(userId:number){
    this.userInformationService.getByUserId(userId).subscribe(response=>{
      this.user=response.data;
    });
  }
  createUserInformationForm(){
    this.userInformationForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      findeksPoint:[""],
      imagePath:[""]
    })
  }
  update(){
    if(this.userInformationForm.valid){
      let userInformationModel = Object.assign({},this.userInformationForm.value);
      this.userInformationService.update(userInformationModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success");
      },responseError=>{
        if(responseError.error.message!=null){
          this.toastrService.error(responseError.error.message);
        }
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Validation error");            
          }
        }
      })
    }else{
      this.toastrService.error("Form error!");
    }
  }

}
