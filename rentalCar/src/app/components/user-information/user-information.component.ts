import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { UserInformation } from 'src/app/models/userInformation';
import { AuthService } from 'src/app/services/auth.service';
import { UserInformationService } from 'src/app/services/user-information.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
})
export class UserInformationComponent implements OnInit {
  userInformationForm: FormGroup;
  currentUser: UserInformation;
  userId: number;
  constructor(
    private formBuilder: FormBuilder,
    private userInformationService: UserInformationService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((response) => {
      this.userId = response.userId;
    });
    this.setUser(this.userId);
    this.createUserInformationForm();
  }
  setUser(userId: number) {
    this.userInformationService.getByUserId(userId).subscribe(
      (response) => {
        this.currentUser = response.data;
      },
      (errorResponse) => {
        this.toastrService.error('Cannot get user informations!');
      }
    );
  }
  createUserInformationForm() {
    this.userInformationForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      findeksPoint: [''],
      imagePath: [''],
      userId: [''],
    });
  }
  update() {
    if (this.userInformationForm.valid) {
      let userInformationModel = Object.assign(
        {},
        this.userInformationForm.value
      );
      userInformationModel.userId = this.userId;
      this.userInformationService.update(userInformationModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success');
        },
        (responseError) => {
          if (responseError.error.message != null) {
            this.toastrService.error(responseError.error.message);
          }
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation error'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form error!');
    }
  }
}
