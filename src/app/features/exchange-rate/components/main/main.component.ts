import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'; 
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  defaultSort = [{ prop: 'Descripcion', dir: 'ASC' }];
  pagination = { totalPages: 1, totalElements: 0, pageNumber: 1, size: 10 };
  procesandoBuscar = false;
  limitOptions = [10, 20, 30, 40];
  modelo: any = {
    filtro: {},
    lista: [],
  };
  mensajes = {
    emptyMessage: '<small> NO SE ENCONTRARON REGISTROS</small>',
    totalMessage: 'Total',
  };
  habilitado: boolean | null;

  update(row) {

    const dialogRef = this.dialog.open(RegisterComponent,{
      width: '640px',disableClose: true,
      data:  Object.assign({}, row)
    }).afterClosed().subscribe(result => {
      this._buscar();
    });
  }

  constructor(public dialog: MatDialog ,private servicio: ExchangeRateService,private toastr: ToastrService) {}
  ngOnInit(): void {
    this._buscar();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent,{
      width: '640px',disableClose: true,
      data:  Object.assign({}, {Id:0,AcceptTerms:false})
    }).afterClosed().subscribe(result => {
      this._buscar();
    });

}
public obtenerFiltro() {
  return {
    Filter: {
      Dni: this.modelo.filtro.Dni,
      Status:true,
    },
    CriterioPaginar: {
      Pagina: this.pagination.pageNumber,
      Tamanio: this.pagination.size,
      Orden: this.defaultSort[0].prop,
      Dir: this.defaultSort[0].dir.toUpperCase(),
    },
  };
}
_buscar() {
  if (this.procesandoBuscar) {
    return false;
  }
  this.procesandoBuscar = true;
  this.modelo.lista = [];
  this.limpiarPaginacion();
  this.servicio
    .search(this.obtenerFiltro())
    .pipe()
    .subscribe(
      (c) => {
        if (c.status === 'OK') {
          this.modelo.lista = c.data;  
        } else {
          this.toastr.error(c.Message);
        }
        this.procesandoBuscar = false;
      },
      (error) => {
        this.procesandoBuscar = false;
        if (error.name == 'HttpErrorResponse') {
          this.toastr.error('El servicio externo no responde.');
        } else {
          this.toastr.error(error);
        }
      }
    );
}

limpiarPaginacion() {
  this.pagination.totalPages = 0;
  this.modelo.lista = [];
  this.pagination.totalElements = 0;
}
limpiarFiltro() {
  this.limpiarPaginacion();
  this.defaultSort = [{ prop: 'Descripcion', dir: 'ASC' }];
  this.pagination = {
    totalPages: 1,
    totalElements: 0,
    pageNumber: 1,
    size: 10,
  };
  this.procesandoBuscar = false;
  this.limitOptions = [10, 20, 30, 40];
}
setPage(pageInfo) {
  this.pagination.pageNumber = pageInfo.offset + 1;
  this._buscar();
  // console.log(pageInfo);
}
onSort(event) {
  this.defaultSort = event.sorts;
  this.pagination.pageNumber = 1;
  this._buscar();

}
setPagePager(pageInfo) {
  this.pagination.pageNumber = pageInfo.page; // pageInfo.offset + 1;
  this._buscar();
}
 

}
