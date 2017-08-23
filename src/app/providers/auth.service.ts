import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    loggedIn: boolean;

    constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
        this.user = firebaseAuth.authState;
    }
// Sign up logic
    signup(email: string, password: string) {
        this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
            console.log('Success!', value);
            })
            .catch(err => {
            console.log('Something went wrong:', err.message);
        });
    }
// Login logic
    login(email: string, password: string) {
        this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
            console.log('Awesome, logged in!');
//            console.log(value);
            console.log(value.emailVerified);
            this.loggedIn = true;
            this.router.navigate(['/app-home']);
            return true;
        })
        .catch(err => {
            console.log('Something went wrong:', err.message);
            $('.error-container').html('<h4>' + err.message + ' Please try again.</h4>');
            this.loggedIn = false;
        });
    }
// Logout logic
    logout() {
        this.firebaseAuth
            .auth
            .signOut()
            .then(value => {
            this.router.navigate(['/login']);
            this.loggedIn = false;
        });
    }
}
