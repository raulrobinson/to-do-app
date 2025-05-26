import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category.model";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonList, IonItem, RouterLink, IonInput]
})
export class CategoriesPage implements OnInit {

  // [VARIABLES]
  categories: Category[] = [];

  // [INIT]
  private auth = inject(AuthService);
  private categoryService = inject(CategoryService);
  private alertCtrl = inject(AlertController);
  private router = inject(Router);
  categoryTitle: string = '';

  // [INITIALIZATION]
  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => this.categories = cats);
  }

  // [EDIT] Edit Category
  async openEditCategory(cat: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoría',
      inputs: [{ name: 'name', type: 'text', value: cat.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.name.trim()) {
              this.categoryService.updateCategory(cat.id!, data.name).then();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // [DELETE] Delete Category
  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).then();
  }

  // [CREATE] Create Category
  createCategory() {
    if (this.categoryTitle.trim()) {
      this.categoryService.createCategory(this.categoryTitle).subscribe(() => {
        this.categoryTitle = '';
      });
    }
  }

  // [LOGOUT] Logout
  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      });
  }

  // DISABLED: [ADD CATEGORY] Add Category
  async openAddCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Categoría',
      inputs: [{ name: 'name', type: 'text', placeholder: 'Nombre' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (data.name.trim()) {
              this.categoryService.createCategory(data.name).subscribe();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
