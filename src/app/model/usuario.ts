import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";

export class Usuario extends Persona {

  public cuenta: string;
  public correo: string;
  public password: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;

  constructor(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date | undefined)
  {
    super();
    this.cuenta = cuenta;
    this.correo = correo;
    this.password = password;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nivelEducacional = nivelEducacional;
    this.fechaNacimiento = fechaNacimiento;
  }

  public static buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
    return Usuario.getListaUsuarios().find(
      usu => usu.cuenta === cuenta && usu.password === password);
  }

  public buscarUsuarioPorCorreo(correo: string): Usuario | undefined {
    return Usuario.getListaUsuarios().find(
      usu => usu.correo === correo);
  }

  public validarCuenta(): string {
    if (Usuario.buscarUsuarioValido(this.cuenta, this.password)) {
      return '';
    }
    return 'Para ingresar al sistema debe ingresar una cuenta y contraseña válidos.';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    for (let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    let error = this.validarCuenta();
    if (error) return error;
    error = this.validarPassword();
    if (error) return error;
    const usu = Usuario.buscarUsuarioValido(this.cuenta, this.password);
    if (!usu) return 'Las credenciales del usuario son incorrectas.';
    return '';
  }

  public getTextoNivelEducacional(): string {
    if (this.nivelEducacional) {
      return this.nivelEducacional.getTextoNivelEducacional();
    }
    return 'No asignado';
  }

  public override toString(): string {
    return `      ${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getTextoNivelEducacional()}
      ${this.formatDateDDMMYYYY(this.fechaNacimiento)}`;
  }

  public formatDateDDMMYYYY(date: Date | undefined): string {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0'); // Obtener el día y agregar un cero inicial si es necesario
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (agregando 1) y agregar un cero inicial si es necesario
    const year = date.getFullYear(); // Obtener el año
    return `${day}/${month}/${year}`;
  }

  public static getListaUsuarios(): Usuario[] {
    return [
      new Usuario(
        'atorres', 
        'atorres@duocuc.cl', 
        '1234', 
        '¿Cuál es tu animal favorito?', 
        'gato', 
        'Ana', 
        'Torres', 
        NivelEducacional.findNivelEducacionalById(6)!,
        new Date(2000, 0, 1)
      ),
      new Usuario(
        'jperez',
        'jperez@duocuc.cl',
        '5678',
        '¿Cuál es tu postre favorito?',
        'panqueques',
        'Juan',
        'Pérez',
        NivelEducacional.findNivelEducacionalById(5)!,
        new Date(2000, 1, 1)
      ),
      new Usuario(
        'cmujica',
        'cmujica@duocuc.cl',
        '0987',
        '¿Cuál es tu vehículo favorito?',
        'moto',
        'Carla',
        'Mujica',
        NivelEducacional.findNivelEducacionalById(6)!,
        new Date(2000, 2, 1)
      ),
    ]
  }

  recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
    activatedRoute.queryParams.subscribe(() => {
      debugger
      const nav = router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          const cuenta = nav.extras.state['cuenta'];
          const password = nav.extras.state['password'];
          const usu = Usuario.buscarUsuarioValido(cuenta,password);
          this.cuenta = usu!.cuenta;
          this.correo = usu!.correo;
          this.password = usu!.password;
          this.preguntaSecreta  = usu!.preguntaSecreta;
          this.respuestaSecreta = usu!.respuestaSecreta;
          this.nombre = usu!.nombre;
          this.apellido = usu!.apellido;
          this.nivelEducacional = usu!.nivelEducacional;
          this.fechaNacimiento = usu!.fechaNacimiento;
          return;
        } 
      }
      router.navigate(['/login']);
    })
  }

  navegarEnviandousuario(router: Router, pagina: string) {
    debugger
    const navigationExtras: NavigationExtras = {
      state: {
        cuenta: this.cuenta,
        password: this.password,
      }
    }
    if (this.cuenta.trim() !== '' && this.password.trim() !== '') {
      router.navigate([pagina], navigationExtras);
    } else {
      router.navigate(['/login' ]);
    }
  }
}