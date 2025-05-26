import { Component, OnInit } from '@angular/core';
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
    IonItem,
    IonText,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from "@capacitor/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
    imports: [IonContent, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonInput, IonItem, IonText, ReactiveFormsModule, RouterLink]
})
export class RegisterPage implements OnInit {
    form: FormGroup;
    error: string = '';

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private platform: Platform
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            name: ['', [Validators.required, Validators.minLength(2)]],
            confirmedPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.platform.ready().then(() => {
            if (Capacitor.getPlatform() !== 'web') {
                StatusBar.setOverlaysWebView({ overlay: false });
                StatusBar.setStyle({ style: Style.Light });
            }
        });
    }

    ngOnInit() {

    }

    register() {

    }
}
