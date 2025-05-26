import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { ErrorService } from "../../services/error.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButton, RouterLink]
})
export class RegisterPage {
  // [VARIABLES] Variables
  form: FormGroup;
  error = '';

  // [Init] Services
  private auth = inject(AuthService);
  private alertMsg = inject(ErrorService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // [INITIALIZATION] Form
  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', Validators.required],
    });
  }

  // [REGISTER] Register User in Firebase
  async register() {
    // [Check] Form
    if (this.form.invalid) this.error = 'Por favor, completa todos los campos requeridos';

    // [Variables]
    const { email, password, name, lastName } = this.form.value;

    // [Check] Passwords
    if (password !== this.form.value.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    // [Register] Authentication Function From Firebase Service
    return await this.auth.register(email, password, name, lastName)
      .then(() => {
        this.router.navigate(['/auth/login']);
      })
      .catch((error) => {
        console.error('Register error:', error);
        this.alertMsg.showAlert('Registro fallido');
      })
  }

}
