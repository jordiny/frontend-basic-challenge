import { ExchangeRateService } from './../../../exchange-rate/services/exchange-rate.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from './../../../exchange-rate/components/register/register.component';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/app.constants';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  watcher: Subscription;
  public breakpoint: number; // Breakpoint observer code
  exchange: FormGroup;
  wasFormChanged = false;
new:boolean=true;
response:any;

  ngOnInit(): void {
  }
  mobileQuery: MediaQueryList;
 
  private _mobileQueryListener: () => void;

  constructor(
    private fb: FormBuilder,

    private service: ExchangeRateService,private toastr: ToastrService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    medias: MediaObserver, private authService: AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.watcher = medias.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });

    this.exchange = this.fb.group({
      currencyFrom: ['', [Validators.required]],
      currencyTo: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      exchangeRate: ['', ],
      calculatedAmount: ['', ]});
  
      this.new=false;

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService.setLogOut();
    this.router.navigate(['/auth']);
    return false;
  }
 
  calculate(): void {
 
   let model = {
      currencyFrom:this.exchange.value.currencyFrom,
      currencyTo:this.exchange.value.currencyTo,
      amount: this.exchange.value.amount
    };


this.service.calculate(model)
      .pipe()
      .subscribe(
        (c) => {
          if (c.status === 'OK') {
            this.toastr.success('Montó calculado correctamente.'); 
            this.exchange.controls['exchangeRate'].setValue(c.data.exchangeRate);
            this.exchange.controls['calculatedAmount'].setValue(c.data.calculatedAmount);
            this.response=c;
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

   

  formChanged() {
    this.wasFormChanged = true;
  }
}
 