// models/SucursalModel.js
class Sucursal {
  constructor(id, nombre, direccion, ciudad, telefono = '', horario = '', activo = true) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.telefono = telefono;
    this.horario = horario;
    this.activo = activo;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  static fromObject(obj) {
    return new Sucursal(
      obj.id,
      obj.nombre,
      obj.direccion,
      obj.ciudad,
      obj.telefono,
      obj.horario,
      obj.activo
    );
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      direccion: this.direccion,
      ciudad: this.ciudad,
      telefono: this.telefono,
      horario: this.horario,
      activo: this.activo,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion
    };
  }

  update(data) {
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key) && key !== 'id' && key !== 'fechaCreacion') {
        this[key] = data[key];
      }
    });
    this.fechaActualizacion = new Date();
  }

  // Método auxiliar similar
}