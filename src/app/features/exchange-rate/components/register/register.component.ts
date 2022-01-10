import { Optional } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/app.constants';
import { MustMatch } from 'src/app/shared/utils/confirmed-validator';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  public breakpoint: number; // Breakpoint observer code
  exchange: FormGroup;
  wasFormChanged = false; 
  title:string="Actualizar Tipo Cambio";
  new:boolean=true;
  constructor(
    private fb: FormBuilder,

    private service: ExchangeRateService,private toastr: ToastrService,
    @Optional() private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

     ngOnInit(): void {

    this.exchange = this.fb.group({
      currencyFrom: [this.data.currencyFrom, [Validators.required]],
      currencyTo: [this.data.currencyTo, [Validators.required]],
      exchangeRate: [this.data.exchangeRate, [Validators.required]]});
  
      this.new=false;
     
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }
  
  public onAddCus(): void {
    this.markAsDirty(this.exchange);
  }

  close(): void {
    this.dialogRef.close({result:false});
  }

  save(): void {
  if(!this.exchange.valid){
    this.toastr.warning('Ingrese correctamente los datos de entrada.',AppConstants.TitulosToastr.Warning);
    return;
  }
   let model = {
      currencyFrom:this.exchange.value.currencyFrom,
      currencyTo:this.exchange.value.currencyTo,
      exchangeRate: this.exchange.value.exchangeRate
    };


this.service.update(model)
      .pipe()
      .subscribe(
        (c) => {
          if (c.status === 'OK') {
            this.toastr.success('Se actualizó correctamente.');
            this.dialogRef.close({result:true,data:model});
          } else {
            this.toastr.error(c.Message);
          }
        },
        (error) => {
          this.toastr.error(error);
        }
      );

  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }
}
