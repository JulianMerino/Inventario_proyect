import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { EquipoService } from 'src/app/services/equipo.service';
import { equipoI, mouseI } from 'src/app/models/equipo';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { empleadoI } from 'src/app/models/empleado';
import { equipo_empleadoI } from 'src/app/models/equipo_asignado';
import { MouseService } from 'src/app/services/mouse.service';
import { formatDate } from '@angular/common';
import { MarcaEquipoService } from 'src/app/services/marca-equipo.service';
import { marcasI } from 'src/app/models/marca_equipo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
 
  resultado: any;
  totalRegistros: any;
  totalEquipos: any;
  marcas: any;
  datos: equipoI= {id_comp: '',tipo: '', marca:'', modelo: '', n_serie: '', m_ram: '', procesador: '', t_memoria: '' , capacidad: '',  f_garantia: '', f_compra: '',estatus: '', observaciones:''};
  //Variables para la paginación de las tablas 
  page: any;
  //formularios
  addEquipo: FormGroup;
  cambiarEstatus: any;
  equipos:equipoI[]=[];
  allEquipments: equipoI[] = [];
  Equipments: equipo_empleadoI[] = [];
  allEquipmentsMouse: mouseI[]=[];
  //variables para el filtro
  term = '';
  searching = '';
  fecha: any; //variable para la fecha
 
  empleados: empleadoI[]=[];
  equipo_empleado: equipo_empleadoI[]=[];

  //estado: any;
  //Recibe los datos del formulario de equipos asignados
  equipo_asignado: FormGroup;
  //Recupera los datos, para insertar un nuevo empleado
  empleado_form: FormGroup;
  nuevaMarca: FormGroup;

  formularioEquipo = false;
  pageMouse: any;
  mouses: mouseI[]=[];
  totalMouses: any;
  filterMouse: any;
  mouseAsignado: mouseI ={id_mouse:'', tipo_mouse: '', marca_mouse: '', modelo_mouse: '', n_serie_mouse: '',estatus_mouse: ''};
  
  marcas_equipo: marcasI[]=[];
  constructor( 
              private router: Router, 
              private fb: FormBuilder,
              private api: EquipoService,
              private emp: EmpleadoService, 
              private e_a: ApiService,
              private mouse: MouseService,
              private marca_equipo: MarcaEquipoService
               
            ) {
    this.nuevaMarca = this.fb.group({
      marca: ['']
      });

    this.addEquipo = this.fb.group({
      tipo: [''],
      marca: [''],
      modelo:[''],
      n_serie:[''],
      m_ram: [''],
      procesador: [''],
      t_memoria: [''],
      capacidad: [''],
      f_garantia: [''],
      f_compra: [''],
      estatus:['No asignado'],
      observaciones:[''],
      });

    this.equipo_asignado = this.fb.group({
      fk_id_empleado: [,[Validators.required]],
      fk_id_equipo: [,[Validators.required]],
      fk_id_mouse:[],
      f_asignacion: [],
      estado: ['Activo']
      });

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
    this.registrosMarcas();
    }


    registrosMarcas(){
      this.marca_equipo.registrosMarcas().subscribe( res =>{
        this.marcas_equipo = res;
        console.log("Marcas de equipos: ---", this.marcas_equipo)
      });
    }
  //------------------------------------------------------------
 // Datos para los equipos
  mostrarRegistros(){
     this.api.obtenerEquipos().subscribe(res =>{
      this.equipos = res;
      console.log(res)
      this.totalEquipos = res.length
   
      this.allEquipments = this.equipos;
     });
  }

//Función para agregar un nuevo equipo
 enviarDatos(){
 console.log("Datos a enviar: ",this.addEquipo.value);
          this.api.agregarEquipo(this.addEquipo.value).subscribe( res =>{
            if(res.resultado == true){
              this.mostrarRegistros(); 
              this.addEquipo.get('tipo')?.reset('');
              this.addEquipo.get('marca')?.reset('');
              this.addEquipo.get('modelo')?.reset('');
              this.addEquipo.get('n_serie')?.reset('');
              this.addEquipo.get('m_ram')?.reset('');
              this.addEquipo.get('procesador')?.reset('');
              this.addEquipo.get('t_memoria')?.reset('');
              this.addEquipo.get('capacidad')?.reset('');
              this.addEquipo.get('f_compra')?.reset('');
              this.addEquipo.get('f_garantia')?.reset('');
              this.addEquipo.get('observaciones')?.reset('');
              
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                });
             Toast.fire({
                icon: 'success',
                title: 'Registro agregado correctamente'
                }); 
               }
            else
            {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
              Toast.fire({
                icon: 'error',
                title: 'Error al insertar'
              });   
            }
          });
        }
 //Obtiene solo un registro por id
 obtenerEquipo(id_comp: any){
    this.api.obtenerEquipo(id_comp).subscribe( res  =>{
    this.datos = res;
  });
 }

editarEquipo(){
  this.api.editarEquipo(this.datos).subscribe( res =>{
    this.resultado = res.resultado;
    if(res.resultado == true){
        this.mostrarRegistros();
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
      });
        Toast.fire({
        icon: 'success',
        title: 'Registro editado correctamente'
      });
      this.datos.tipo = '';
      this.datos.marca = '';
      this.datos.modelo = '';
      this.datos.n_serie = '';
      this.datos.m_ram = '';
      this.datos.procesador = '';
      this.datos.t_memoria = '';
      this.datos.capacidad= '';
      this.datos.f_compra = '';
      this.datos.f_garantia = '';
      this.datos.estatus = '';
      this.datos.observaciones= '';   
    }
    else{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'error',
        title: 'Error'
      });
    this.mostrarRegistros();
    }
  });
}
 /*
agregarMarca(){
  this.api.agregarMarca(this.nuevaMarca.value).subscribe( res =>{
    if(res.resultado == true){
      this.mostrarRegistros();
      this.nuevaMarca.reset();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Nueva marca agregada correctamente'
      });
    }
  });
}
 */
  agregarMarcaEquipo(){
    this.marca_equipo.agregarMarca(this.nuevaMarca.value).subscribe( res =>{
      console.log(res);
      if(res.resultado == true){
        this.registrosMarcas();
        this.nuevaMarca.reset();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Nueva marca agregada correctamente'
        });
      }
    });

  }
  

 //-----------------------------------------------------------------------------------

// Aqui todos los datos de los empleados
obtenerEmpleados(){
  this.emp.obtenerEmpleados().subscribe( res =>{
    this.empleados = res;
  });
}

//Mande un nuevo dato al api, inserta un nuevo registro de la tabla empleados
agregarEmpleado(){
  if(this.empleado_form.valid){
    this.emp.agregar(this.empleado_form.value).subscribe( res =>{
      this.obtenerEmpleados();
      if(res.resultado == true){
        this.empleado_form.get('n_completo')?.reset('');
        this.empleado_form.get('cliente')?.reset('');
      }
    });
  }
}
agregarCliente(){
  this.emp.agregar(this.empleado_form.value).subscribe( res =>{
    if(res.resultado == true){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
        Toast.fire({
        icon: 'success',
        title: 'Nuevo cliente agregado'
      });
      this.obtenerEmpleados();
      this.empleado_form.get('tipo_clientes')?.reset('');
    }
    else
    {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'No se agregó'
      });
    }
  })
}



//-----------------------------------------------------------------------------------------
// Aqui va todas las funciones respecto a las asignaciones

asignarEquipo(datos: any){
var cambiarEstatus =
 {
    id_comp: datos.id_comp,
    estatus: datos.estatus = 'Asignado'
  }

  var asignarEquipo = 
  {
    fk_id_empleado: this.equipo_asignado.get('fk_id_empleado')?.value,
    fk_id_equipo: this.equipo_asignado.get('fk_id_equipo')?.value,
    fk_id_mouse: this.equipo_asignado.get('fk_id_mouse')?.value,
    f_asignacion: this.equipo_asignado.get('f_asignacion')?.value,
    estado: this.equipo_asignado.get('estado')?.value,
  }
  var estatusMouse = {
    id_mouse: this.equipo_asignado.get('fk_id_mouse')?.value,
    estatus_mouse: 'Asignado'
  }

 
  this.e_a.agregarAsignacion(asignarEquipo).subscribe( res =>{
    if(res.resultado == true){
       this.api.cambiarEstatus(cambiarEstatus).subscribe( res =>{ this.mostrarRegistros()});
       this.mouse.editarEstatus(estatusMouse).subscribe( res =>{ this.registrosMouse();});
        const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
        Toast.fire({
        icon: 'success',
        title: 'Equipo asignado correctamente'
      });
         
       this.registros();
       this.resetForm();
    }
    else{
     this.resetForm();
      this.registros();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'error',
        title: 'Error al realizar esta acción'
      });
    }
  });
}
registros(){
  this.e_a.registros().subscribe( res =>{
    this.equipo_empleado = res;
    this.Equipments = this.equipo_empleado;
    this.totalRegistros = res.length;
      });
     }
//-------------------------------------------------------------------
resetForm(){
  this.equipo_asignado.get('fk_id_empleado')?.reset();
  this.equipo_asignado.get('fk_id_mouse')?.reset();
  }

//--------------------------------------------------------

//----------------------------------------------------------
mostrarFormularioEquipo(){ //Funcion para mostrar el formulario de equipos
  this.formularioEquipo = true;
}
cerrarFormularioEquipo(){
  this.formularioEquipo = false;
}
//-----------------------------------------------------------
//Aqui están todas las funciones para la parte de los MouseService

registrosMouse(){
  this.mouse.registrosMouse().subscribe( res =>{
    this.totalMouses = res.length;
    this.mouses = res;
    });
}
 
agregarMouse(){
  var addMouse= {
    tipo_mouse: this.addEquipo.get('tipo')?.value,
    marca_mouse: this.addEquipo.get('marca')?.value,
    modelo_mouse: this.addEquipo.get('modelo')?.value,
    n_serie_mouse: this.addEquipo.get('n_serie')?.value,
    estatus_mouse: this.addEquipo.get('estatus')?.value
   }
   this.mouse.agregarMouse(addMouse).subscribe( res =>{
    this.registrosMouse();
    if(res.resultado == true){
      console.log("Mouse agregado",res);
      this.addEquipo.get('tipo')?.reset('');
      this.addEquipo.get('marca')?.reset('');
      this.addEquipo.get('modelo')?.reset('');
      this.addEquipo.get('n_serie')?.reset('');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Registro agregado correctamente'
      });     
    }
  });
}

obtenerMouse(){
  this.mouse.registroMouse(this.equipo_asignado.get('fk_id_mouse')?.value).subscribe( res =>{
    this.mouseAsignado = res;
    });
  }
}
