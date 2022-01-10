import { Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Usuario } from './auth/models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent  {
  title = 'app-features-compoente';
  watcher: Subscription;
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat'; 
  userInformation:Usuario;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    medias: MediaObserver, private authService: AuthService, private router: Router,
    public dialog: MatDialog) {
 
      this.getUserInformation();

    this.watcher = medias.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });

  }
   
   
  private getUserInformation() {
    this.authService
      .getLoggedUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: any) => (this.userInformation = user));
  }
  logout() {
    this.authService.setLogOut();
    this.router.navigate(['/auth']);
    return false;
  }
}
