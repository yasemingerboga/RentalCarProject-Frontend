import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardValid:boolean;
  cardNumber:string;
  cvv:number;
  month:number;
  year:number;
  flag:boolean=false;
  constructor(private paymentService:PaymentService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
      }
      if(params["cardNumber"]){
        this.check(params["cardNumber"]);
    }
    })
  }
  check(cardNumber:string){
    this.paymentService.CheckCreditCard(cardNumber).subscribe(response=>{
      this.cardValid=response.success;
    },errorResponse=>{
      this.cardValid=errorResponse.success;
    })
  }
  toastrOptions(){
    if(this.cardValid==true){
      this.toastrService.success("Payment is ok!");
    }
    else{
      this.toastrService.error("Payment not okay");
    }
  }
    
}
