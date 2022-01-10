import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './Material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AllowNumberDirective } from './directives/allow-numer.directive';
 

@NgModule({
  declarations: [ConfirmDialogComponent,AllowNumberDirective],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NgxDatatableModule,
    ToastrModule,
    FlexLayoutModule,
    AllowNumberDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {
static forRoot(): ModuleWithProviders<SharedModule> {
  return {
    ngModule: SharedModule,
    providers: [
      ToastrModule.forRoot().providers
    ],
  };
}
}
