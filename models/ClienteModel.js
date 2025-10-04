class Cliente {
  constructor(id, nombre, apellido, email, telefono, fechaNacimiento, activo = true) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
    this.activo = activo;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  static fromObject(obj) {
    return new Cliente(
      obj.id,
      obj.nombre,
      obj.apellido,
      obj.email,
      obj.telefono,
      obj.fechaNacimiento,
      obj.activo
    );
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento,
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

  getNombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  getEdad() {
    const hoy = new Date();
    const nacimiento = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}

export default Cliente;
