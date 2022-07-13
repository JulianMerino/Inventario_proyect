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
}

export interface adminI{
    id:  string,
    nombre:  string,
    email:  string,
    password:  string
}