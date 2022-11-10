import { Component, OnInit } from '@angular/core';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyecto: Proyectos[] = [];

  constructor(private proyectoS: ProyectosService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarProyecto();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyecto(): void {
    this.proyectoS.lista().subscribe(
      data => {
        this.proyecto = data;
      }
    )
  }

  delete(id?: number) {
    if (id != undefined) {
      this.proyectoS.delete(id).subscribe(
        data => {
          this.cargarProyecto();
        }, err => {
          alert("Error al eliminar el proyecto");
        }
      )
    }
  }
}
