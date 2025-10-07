class Departamento {
  constructor(id, nombre, descripcion, codigo, ubicacion, telefonoContacto, activo = true) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.ubicacion = ubicacion;
    this.telefonoContacto = telefonoContacto;
    this.activo = activo;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  // ✅ Crea una instancia desde un objeto plano
  static fromObject(obj) {
    return new Departamento(
      obj.id,
      obj.nombre,
      obj.descripcion,
      obj.codigo,
      obj.ubicacion,
      obj.telefonoContacto,
      obj.activo
    );
  }

  // ✅ Convierte la instancia en un objeto JSON listo para enviar o guardar
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      codigo: this.codigo,
      ubicacion: this.ubicacion,
      telefonoContacto: this.telefonoContacto,
      activo: this.activo,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion
    };
  }

  // ✅ Actualiza solo las propiedades válidas
  update(data) {
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key) && key !== 'id' && key !== 'fechaCreacion') {
        this[key] = data[key];
      }
    });
    this.fechaActualizacion = new Date();
  }

  // ✅ Método de utilidad: genera una etiqueta identificativa
  getEtiqueta() {
    return `${this.codigo} - ${this.nombre}`;
  }

  // ✅ Método opcional: devuelve un resumen legible
  getResumen() {
    return `Departamento ${this.nombre} (${this.codigo}) ubicado en ${this.ubicacion || 'ubicación no especificada'}.`;
  }
}

export default Departamento;
