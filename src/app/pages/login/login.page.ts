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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButton, RouterLink]
})
export class LoginPage {
  // [VARIABLES] Variables
  form: FormGroup;
  error = '';

  // [INIT] Services
  private auth = inject(AuthService);
  private alertMsg = inject(ErrorService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // [INITIALIZATION] Form
  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // [LOGIN] Log in to the app
  async login() {
    // [Check] Form
    if (this.form.invalid) return Promise.reject('Por favor, completa todos los campos requeridos');

    // [Variables] Form
    const {email, password} = this.form.value;

    // [Login] Authentication Function From Firebase Service
    return await this.auth.login(email, password)
      .then((r) => {
        console.log(`Login successful: ${r.user.displayName}`, r.user);
        this.router.navigate(['/tasks']);
      })
      .catch((error) => {
        console.error('Login error:', error);
        this.alertMsg.showAlert('Error al iniciar sesión');
      })
  }
}
