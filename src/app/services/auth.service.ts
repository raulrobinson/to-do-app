import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "@angular/fire/auth";
import { map } from "rxjs";
import { UserCredential } from "../models/user-credential.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afAuth = inject(Auth);

  login(email: string, password: string) : Promise<UserCredential> {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  async register(email: string, password: string, name: string, lastName: string) : Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await updateProfile(userCredential.user, {
      displayName: name + ' ' + lastName
    });
  }

  logout() {
    return signOut(this.afAuth);
  }

  async getUserId(): Promise<string> {
    const user = this.afAuth.currentUser;
    if (user) {
      return user.uid;
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  getUserIdObservable() {
    return authState(this.afAuth).pipe(
      map(user => {
        if (user) {
          return user.uid;
        } else {
          throw new Error('Usuario no autenticado');
        }
      })
    );
  }

  isAuthenticated() {
    return authState(this.afAuth).pipe(
      map(user => !!user)
    );
  }
}
