import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem, IonLabel, IonNote, IonText,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonInput, IonButton, RouterLink, ReactiveFormsModule, IonText, IonLabel, IonNote]
})
export class LoginPage {
  form: FormGroup;
  error: string = '';

  constructor(
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    await this.auth.login(email, password)
        .then(async (res) => {
          const user = res.user;
          if (user) {
            const token = await user.getIdToken();
            console.log('Login successful:', user.email);
            localStorage.setItem('accessToken', token);
            await this.router.navigate(['/tasks']);
          }
        });
  }

  ionViewWillEnter() {
    this.form.reset();
  }
}
