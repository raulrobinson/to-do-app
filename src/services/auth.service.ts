import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from, of, switchMap } from "rxjs";
import { signOut } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async getUserId() {
    const user = await this.afAuth.currentUser
      .then((res) => {
        console.log(res);
        if (res) {
          return res.uid;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error getting user ID:', error);
        return null;
      });
  }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(switchMap(user => of(!!user)));
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
