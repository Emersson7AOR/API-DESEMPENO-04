class Empleado {
  constructor(
    id,
    nombre,
    apellido,
    email,
    telefono,
    fechaNacimiento,
    activo = true,
    cargo = "",
    departamento = "",
    fechaContratacion = new Date(),
    salario = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
    this.activo = activo;
    this.cargo = cargo;
    this.departamento = departamento;
    this.fechaContratacion = fechaContratacion;
    this.salario = salario;

    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  static fromObject(obj) {
    return new Empleado(
      obj.id,
      obj.nombre,
      obj.apellido,
      obj.email,
      obj.telefono,
      obj.fechaNacimiento,
      obj.activo,
      obj.cargo,
      obj.departamento,
      obj.fechaContratacion,
      obj.salario
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
      cargo: this.cargo,
      departamento: this.departamento,
      fechaContratacion: this.fechaContratacion,
      salario: this.salario,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion,
    };
  }

  update(data) {
    Object.keys(data).forEach((key) => {
      if (this.hasOwnProperty(key) && key !== "id" && key !== "fechaCreacion") {
        this[key] = data[key];
      }
    });
    this.fechaActualizacion = new Date();
  }

  getNombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
}

export default Empleado;
