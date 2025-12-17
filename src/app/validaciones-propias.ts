import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class ValidacionesPropias {

  static validateFormat(control: AbstractControl): ValidationErrors | null {
    const file = control.value;

    if (!file || file === '') return null;

    const parts = file.split(".");

    if (parts.length < 2) return {validateFormat: true};

    const format = parts[parts.length - 1]. toLowerCase();

    const imageFormats:  string[] = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
      "bmp",
      "tiff",
      "avif",
      "heic"
    ];

    if (imageFormats.includes(format)) {
      return null;
    }

    return {validateFormat: true};
  }

  static validatedDni(control: AbstractControl): ValidationErrors | null {
    const id = control.value;

    if (!id || id === '') return null;

    if (id.length !== 9) return {validateDni: true};

    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const numero = id.substring(0, 8);

    if (!/^\d{8}$/.test(numero)) return {validateDni: true};

    const resto = parseInt(numero) % 23;
    const letraCalculada = letras[resto];
    const letraIngresada = id[8].toUpperCase();

    if (letraCalculada !== letraIngresada) {
      return {validateDni:  true};
    }

    return null;
  }

  static validateEstado(control: AbstractControl): ValidationErrors | null {
    const estado = control.value;

    if (!estado || estado === '') {
      return {required: true};
    }

    const estadosValidos = ['trabajando', 'desempleado', 'busquedaActiva', 'estudiante'];

    if (!estadosValidos. includes(estado)) {
      return {estadoInvalido: true};
    }

    return null;
  }

  static validateFecha(control: AbstractControl): ValidationErrors | null {
    const cadena = control.value;

    if (!cadena || cadena === '') return null;

    // Verificar longitud
    if (cadena. length !== 10) {
      return {validateFecha: true};
    }

    // Comprobar formato y rangos
    const lista = cadena.split("/");

    if (lista.length !== 3) {
      return {validateFecha: true};
    }

    const dia = parseInt(lista[0]);
    const mes = parseInt(lista[1]);
    const año = parseInt(lista[2]);

    // Validar rangos básicos
    if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
      return {validateFecha: true};
    }

    if (dia <= 0 || dia > 31 || mes <= 0 || mes > 12) {
      return {validateFecha: true};
    }

    // Validar que la fecha sea válida (considerando meses con diferentes días)
    const fecha = new Date(año, mes - 1, dia);
    if (fecha.getDate() !== dia || fecha.getMonth() !== mes - 1 || fecha.getFullYear() !== año) {
      return {validateFecha: true};
    }

    // Verificar edad mínima (14 años)
    if (!ValidacionesPropias.isAgeAppropriate(cadena, 14)) {
      return {validateFecha:  true};
    }

    return null;
  }

  private static isAgeAppropriate(cadena: string, minAge:  number): boolean {
    const lista = cadena.split("/");
    const dia = parseInt(lista[0]);
    const mes = parseInt(lista[1]) - 1; // Meses en JavaScript son 0-indexados
    const año = parseInt(lista[2]);

    const fechaNacimiento = new Date(año, mes, dia);
    const hoy = new Date();

    // Calcular la fecha hace minAge años
    const fechaMinima = new Date();
    fechaMinima.setFullYear(hoy.getFullYear() - minAge);

    // La persona debe haber nacido antes o en la fecha mínima
    return fechaNacimiento <= fechaMinima;
  }
}
