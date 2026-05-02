import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
} from '@angular/fire/firestore';

import { Juego } from 'src/app/interfaces/juego.inerface';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css'],
})
export class GotyComponent {
  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);

  formJuego: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]],
    url: ['', [Validators.required]],
  });

  guardando = false;

  guardarJuego(): void {
    if (this.formJuego.invalid) {
      this.formJuego.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const nuevoJuego: Omit<Juego, 'id'> = {
      nombre: this.formJuego.value.nombre,
      descripcion: this.formJuego.value.descripcion,
      url: this.formJuego.value.url,
      votos: 0,
    };

    const juegosRef = collection(this.firestore, 'juegos');

    addDoc(juegosRef, nuevoJuego)
      .then(() => {
        this.formJuego.reset();
      })
      .catch((error) => {
        console.error('Error al guardar juego:', error);
      })
      .finally(() => {
        this.guardando = false;
      });
  }

  campoInvalido(campo: string): boolean {
    const control = this.formJuego.get(campo);

    return !!control && control.invalid && control.touched;
  }
}