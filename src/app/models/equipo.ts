export interface equipoI{
   
   
    id_comp:  string,
    tipo:  string,
    marca: string,
    modelo:  string,
    n_serie:  string,
    m_ram:  string,
    procesador:  string,
    f_garantia:  string,
    f_compra:  string,
    estatus:  string,
    t_memoria:  string,
    capacidad:  string,
    observaciones:  string

}

export interface adminI{
    id:  string,
    nombre:  string,
    email:  string,
    password:  string
}

export interface mouseI{
    id_mouse:  string,
    tipo_mouse:  string,
    marca_mouse:  string,
    modelo_mouse:  string,
    n_serie_mouse:  string,
    estatus_mouse:  string
}