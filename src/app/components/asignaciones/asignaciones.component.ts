import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { EquipoService } from 'src/app/services/equipo.service';
import { equipoI, mouseI } from 'src/app/models/equipo';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { empleadoI } from 'src/app/models/empleado';
import { equipo_empleadoI } from 'src/app/models/equipo_asignado';
import { MouseService } from 'src/app/services/mouse.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {

  ///
  totalRegistros: any;
  totalEquipos: any;
  datos: equipoI= {id_comp: '',tipo: '', marca:'', modelo: '', n_serie: '', m_ram: '', procesador: '', t_memoria: '' , capacidad: '',  f_garantia: '', f_compra: '',estatus: '', observaciones:''};
  //Variables para la paginación de las dos tablas 
  page: any;
  pages: any;
  //formularios
  cambiarEstatus: any;
  equipos:equipoI[]=[];
  searching = '';
  fecha: any; //variable para la fecha
 
  empleados: empleadoI[]=[];
  equipo_empleado: equipo_empleadoI[]=[];
  
  //Recupera los datos, para insertar un nuevo empleado
  empleado_form: FormGroup;
 

  verAsignaciones = false;
  formularioEquipo = false;
 ////
  pageMouse: any;
  mouses: mouseI[]=[];
  
  constructor( 
              private fb: FormBuilder,
              private api: EquipoService,
              private emp: EmpleadoService, 
              private e_a: ApiService,
              private mouse: MouseService
               
            ) {
    this.empleado_form = this.fb.group({
      n_completo: [''],
      cliente: [''],
      tipo_clientes: ['']
    });

 
   }


   fechaDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')

  ngOnInit(): void {
    //Obtenemos todos los registros de las computadoras
    this.mostrarRegistros();
    // Muestra todos los registros de los empleados
    this.obtenerEmpleados();
    this.fecha = new Date();
    this.registros();
    this.registrosMouse(); 
  }
  


  //------------------------------------------------------------
 // Datos para los equipos
  mostrarRegistros(){
     this.api.obtenerEquipos().subscribe(res =>{
      this.equipos = res;
      this.totalEquipos = res.length;
      console.log(this.equipos)
      console.log("Total: ",this.equipos.length);
     });
  }

 //Obtiene solo un registro por id
 obtenerEquipo(id_comp: any){
  this.api.obtenerEquipo(id_comp).subscribe( res  =>{
    this.datos = res;
  
  } );
 }

 //-----------------------------------------------------------------------------------

// Aqui todos los datos de los empleados
obtenerEmpleados(){
  this.emp.obtenerEmpleados().subscribe( res =>{
    this.empleados = res;
    console.log("Empleados: ", res)
  });
}
registros(){
  this.e_a.registros().subscribe( res =>{
    this.equipo_empleado = res;
    this.totalRegistros = res.length;
      });
}

//Función para dejar inactivo un equipo asignado -----------
bajaEquipoAsig(estado: any, id: any, equipo: any, estatus: any, f_baja: any, id_comp: any, id_mouse: any){
  
  var cambiarEstatus= {
    id_comp: id_comp,
    estatus: 'No asignado'
  }
  if(estado == 'Activo'){
    var bajaEquipoAsignado = {
      id_empleado_equipo: id,
      f_baja: this.fechaDate,
      estado: 'Inactivo',
    }
     var estatusMouse = {
      id_mouse: id_mouse,
      estatus_mouse: 'No asignado'
     }
    
   
//---
Swal.fire({
  title: '¿Estás seguro?',
  text: "Baja de equipo asignado",
  icon: 'warning',
  showCancelButton: true,
  cancelButtonText: 'Cancelar',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Aceptar'
}).then((result) => {
  if (result.isConfirmed) {
    this.e_a.editarAsignacion(bajaEquipoAsignado).subscribe( res  =>{
      if(res.resultado == true){
       this.api.cambiarEstatus(cambiarEstatus).subscribe( res =>{ 
        this.registrosMouse();
        this.registros();
        this.mostrarRegistros();
       });
       this.mouse.editarEstatus(estatusMouse).subscribe( res =>{
        this.registrosMouse();
        this.registros();
        this.mostrarRegistros();});
      this.registros();

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Acción realizada correctamente'
        })
      }
      console.log(res);
      this.registros();
    });
  
      }
    });
  } 
}

//_-------------------------

registrosMouse(){
  this.mouse.registrosMouse().subscribe( res =>{
    this.mouses = res;
    });
}

}
