import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../service/authApi.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    submitted = false;
    registerForm: FormGroup;
    ClientSexe: any = ['homme','femme'];

    test : Date = new Date();
    focus;
    focus1;
    focus2;
    model: any;

    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ngZone: NgZone,
        private authApiService: AuthApiService
    ) {
        this.mainForm();
     }
    ngOnInit() {}
    mainForm() {
        this.registerForm = this.fb.group({
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          email: [
            '',
            [
              Validators.required,
              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
            ],
          ],
          password: ['', [Validators.required]],
          dateOfBirth: ['', [Validators.required]],
          sexe: ['', [Validators.required]],
          address: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required, Validators.pattern('^[0-13]+$')]],
        });
      }

       // Choose designation with select dropdown
  updateSexe(e) {
    this.registerForm.get('sexe').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
        console.log('Form is not valid. Control status:', this.registerForm.valid);
      return false;
    } else {
      return this.authApiService.registerClient(this.registerForm.value).subscribe({
        complete: () => {
          console.log('Next level created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
