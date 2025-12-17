import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ValidacionesPropias} from './validaciones-propias';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl:  './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('deJovenes');
  jovenesForm: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.jovenesForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), ValidacionesPropias.validatedDni]],
      fecha:  ['', [Validators.required, Validators.pattern(/^[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}$/), ValidacionesPropias.validateFecha]],
      cp:  ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],  // Fixed: removed the async validator
      sexo: ['', [Validators. required]],
      provincia: ['', Validators.required],
      gustos: [[], [Validators.required, Validators.minLength(1)]],
      estado: ['', [Validators.required, ValidacionesPropias.validateEstado]],
      dni_foto: [null, [Validators.required, ValidacionesPropias.validateFormat]],
      terminos: [false, [Validators.requiredTrue]],
    });

    // Suscribirse a cambios en el CP para actualizar la provincia
    this.jovenesForm.get('cp')?.valueChanges.subscribe(cp => {
      if (cp && cp. toString().length >= 2) {
        const cpString = cp.toString().padStart(5, '0');
        const codigoProvincia = cpString.substring(0, 2);
        const provinciaEncontrada = this.provincias.find(
          p => p.codigo === codigoProvincia
        );

        if (provinciaEncontrada) {
          this.jovenesForm.get('provincia')?.setValue(
            provinciaEncontrada.provincia,
            {emitEvent: false}
          );
        } else {
          this.jovenesForm.get('provincia')?.setValue('', {emitEvent: false});
        }
      }
    });
  }

  onFileChange(event: any): void {
    const file = event. target.files[0];
    if (file) {
      this.jovenesForm.patchValue({
        dni_foto:  file.name
      });
      this.jovenesForm.get('dni_foto')?.updateValueAndValidity();
    }
  }

  onsubmit(): void {
    this.formSubmitted = true;

    if (this.jovenesForm.invalid) {
      this.jovenesForm.markAllAsTouched();
      console.warn('Formulario inválido', this.jovenesForm.errors);

      // Mostrar errores de cada campo
      Object.keys(this.jovenesForm.controls).forEach(key => {
        const control = this.jovenesForm.get(key);
        if (control?. invalid) {
          console.warn(`Campo ${key}:`, control.errors);
        }
      });

      alert('Por favor, corrija los errores en el formulario antes de enviarlo.');
      return;
    }

    const formValue = this.jovenesForm. value;
    console.log('Formulario válido, valor:', formValue);

    // Aquí puedes enviar los datos al servidor
    alert('Formulario enviado correctamente. ¡Bienvenido al club De Jovenes!');

    // Opcional: Resetear el formulario después del envío
    this.jovenesForm.reset();
    this.formSubmitted = false;
  }

  protected readonly provincias = [
    { codigo: '01', provincia: 'Álava' },
    { codigo:  '02', provincia: 'Albacete' },
    { codigo: '03', provincia: 'Alicante' },
    { codigo: '04', provincia:  'Almería' },
    { codigo:  '05', provincia: 'Ávila' },
    { codigo:  '06', provincia: 'Badajoz' },
    { codigo: '07', provincia: 'Islas Baleares' },
    { codigo: '08', provincia: 'Barcelona' },
    { codigo: '09', provincia: 'Burgos' },
    { codigo:  '10', provincia: 'Cáceres' },
    { codigo:  '11', provincia: 'Cádiz' },
    { codigo: '12', provincia: 'Castellón' },
    { codigo:  '13', provincia: 'Ciudad Real' },
    { codigo: '14', provincia: 'Córdoba' },
    { codigo:  '15', provincia: 'A Coruña' },
    { codigo: '16', provincia:  'Cuenca' },
    { codigo: '17', provincia: 'Girona' },
    { codigo:  '18', provincia: 'Granada' },
    { codigo: '19', provincia: 'Guadalajara' },
    { codigo: '20', provincia: 'Gipuzkoa' },
    { codigo: '21', provincia: 'Huelva' },
    { codigo: '22', provincia: 'Huesca' },
    { codigo:  '23', provincia: 'Jaén' },
    { codigo:  '24', provincia: 'León' },
    { codigo: '25', provincia: 'Lleida' },
    { codigo:  '26', provincia: 'La Rioja' },
    { codigo:  '27', provincia: 'Lugo' },
    { codigo:  '28', provincia: 'Madrid' },
    { codigo: '29', provincia: 'Málaga' },
    { codigo:  '30', provincia: 'Murcia' },
    { codigo: '31', provincia: 'Navarra' },
    { codigo: '32', provincia: 'Ourense' },
    { codigo:  '33', provincia: 'Asturias' },
    { codigo: '34', provincia: 'Palencia' },
    { codigo:  '35', provincia: 'Las Palmas' },
    { codigo: '36', provincia: 'Pontevedra' },
    { codigo: '37', provincia: 'Salamanca' },
    { codigo:  '38', provincia: 'Santa Cruz de Tenerife' },
    { codigo: '39', provincia:  'Cantabria' },
    { codigo: '40', provincia: 'Segovia' },
    { codigo:  '41', provincia: 'Sevilla' },
    { codigo: '42', provincia: 'Soria' },
    { codigo: '43', provincia: 'Tarragona' },
    { codigo: '44', provincia: 'Teruel' },
    { codigo:  '45', provincia: 'Toledo' },
    { codigo: '46', provincia: 'Valencia' },
    { codigo: '47', provincia: 'Valladolid' },
    { codigo: '48', provincia: 'Bizkaia' },
    { codigo: '49', provincia: 'Zamora' },
    { codigo:  '50', provincia: 'Zaragoza' },
    { codigo: '51', provincia:  'Ceuta' },
    { codigo:  '52', provincia: 'Melilla' }
  ];
}
