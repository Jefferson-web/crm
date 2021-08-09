export default interface Mayorista {
    id?: number;
    nombres?: string;
    ap_paterno?: string;
    ap_materno?: string;
    fecha_registro: Date;
    celular?: string;
    telef_fijo?: string;
    ruc?: string;
    razon_social?: string;
    estado:boolean;
    email?: string;
    direccion_cliente?: string;
    complemento_direccion?: string;
    departamento?: string;
    provincia?: string;
    distrito?: string;
    ciudad?: string;
    comentario_reg_cliente?: string;
    fecha_nacimiento?: Date;
    genero?: string;
    proteccion_datos?: boolean;
}