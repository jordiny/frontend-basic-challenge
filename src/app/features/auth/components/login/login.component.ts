import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/app.constants';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true; 
  signinForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  isLoading:boolean=false;
  istrue=true;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() { }

  loginUser() {
    if(!this.signinForm.valid){
      this.toastr.warning('No se ha ingresado los datos requeridos.',AppConstants.TitulosToastr.Warning);
      return;
    }
    this.isLoading=true;
    this.signinForm.disable();
    this.authService
    .login(this.signinForm.value.email, this.signinForm.value.password)
    .subscribe(success => { 
      this.signinForm.enable();
      this.isLoading=false;
      if(success.status!='OK'){
        this.toastr.warning( success.Message,AppConstants.TitulosToastr.Warning);
      }else{
      let data:any=success.data;
      this.authService.setToken(data.token);
      this.setearUsuarioMenu(data);
      this.router.navigate(['/home']);
    }
    },error =>{
      console.log(error);
      this.signinForm.enable();
      this.isLoading=false;
    })
  }
 

  private setearUsuarioMenu(datos:any){
    const usuario:Usuario = {
      userId: datos.id,
      fullName: datos.fullname.toUpperCase(),
      email:datos.email,
      userName: datos.username,
    };
    this.authService.setLoggedUser(usuario); 
  }

}
