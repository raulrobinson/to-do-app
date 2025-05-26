import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons, IonCheckbox,
  IonContent,
  IonHeader, IonIcon, IonInput,
  IonItem, IonItemSliding,
  IonLabel, IonList, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Category } from "../../models/category.model";
import { TaskService } from "../../services/task.service";
import { CategoryService } from "../../services/category.service";
import { Task } from "../../models/task.model";
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from "@capacitor/core";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonList, IonItemSliding, IonCheckbox, IonIcon, RouterLink]
})
export class TasksPage implements OnInit {

  // [VARIABLES]
  tasks: Task[] = [];
  categories: Category[] = [];
  taskTitle: string = '';
  selectedCategoryId: string = '';
  filterCategoryId: string = '';

  // [INIT]
  private auth = inject(AuthService);
  private taskService = inject(TaskService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private alertCtrl: AlertController = inject(AlertController);
  tasks$: Observable<Task[]> = this.taskService.getTasks();

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      if (Capacitor.getPlatform() !== 'web') {
        StatusBar.setOverlaysWebView({ overlay: false });
        StatusBar.setStyle({ style: Style.Light });
      }
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => this.categories = cats);
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.taskService.getTasks(this.filterCategoryId);
  }

  // [CREATE] Create a new task
  createTask() {
    if (!this.taskTitle.trim() || !this.selectedCategoryId) return;
    this.taskService.createTask(this.taskTitle, this.selectedCategoryId).subscribe(() => {
      this.taskTitle = '';
      this.selectedCategoryId = '';
    });
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      });
  }

  toggleDone(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed })
  }

  async editTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: task.title,
          placeholder: 'Titulo de la tarea',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.title.trim()) {
              this.taskService.updateTask(task.id!, {title: data.title.trim()});
            }
          }
        }
      ]
    });
    await alert.present();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  applyCategoryFilter() {
    this.loadTasks();
  }
}
