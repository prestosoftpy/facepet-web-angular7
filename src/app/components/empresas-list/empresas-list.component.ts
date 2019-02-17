import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../servicios/empresa.service';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit {

  empresas: any = [];


  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.getEmpresa();
  }

  getEmpresa() {
        this.empresaService.getEmpresas().subscribe(
      res => {
        this.empresas = res;
        console.log(res);
      },
      err => console.error(err)
    );
  }

  borrarEmpresa(id: number) {
    if (window.confirm('Desea borrar esta empresa')) {
      this.empresaService.deleteEmpresa(id).subscribe(
        res => {
          console.log(res);
          this.getEmpresa();
        },
        err => console.log(err)
      );
    }
  }
}
