import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { passwordStrengthValidator } from '../_helpers/password-strength.validator';
import { phoneNumberValidator } from '../_helpers/phone-number.validator';
import { ToastService } from '../toast/toast.service';

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
        private authApiService: AuthService,
        public toastService: ToastService
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
               Validators.email,
            ],
         ],
          password: ['', [Validators.required,passwordStrengthValidator(3)]],
          dateOfBirth: ['', [Validators.required]],
          sexe: ['', [Validators.required]],
          address: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required, phoneNumberValidator]],
        });
      }

       // Choose designation with select dropdown
  updateSexe(e) {
    this.registerForm.get('sexe').setValue(e, {
      onlySelf: true,
    });
  }
  showSuccess(text) {
		this.toastService.show(text, { classname: 'bg-success text-light m-3 p-3 ', delay: 10000 });
	}

	showDanger(dangerTpl) {
		this.toastService.show(dangerTpl, { classname: 'alert-danger text-light  m-3 p-3', delay: 15000 });
	}
  // Getter to access form control
  get myForm() {
    return this.registerForm.controls;
  }
  /*onSubmit() {
    this.submitted = true;
    //if (!this.registerForm.valid) {
    //  console.log('Form is not valid. Control status:', this.registerForm.valid);
    // return false;
    if (!this.registerForm.valid) {
      console.log('Le formulaire n\'est pas valide. État des contrôles :', this.registerForm);
      return false;
    } else {
      console.log(this.registerForm.value);
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
  }*/

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      console.log('Le formulaire n\'est pas valide. État des contrôles :', this.registerForm);
      return false;
    } else {
      const formData = { ...this.registerForm.value };
  
      // Convertir la chaîne de caractères en objet Date
      formData.dateOfBirth = new Date(formData.dateOfBirth);
  
      return this.authApiService.registerClient(formData).subscribe({
        complete: () => {
          console.log('Next level created!'),
          // Redirect to home ("/") route
            this.ngZone.run(() => {
                this.router.navigateByUrl('/');
    
                // Display an alert after redirection
                // alert('Verify your email.'); // You might want to use a more user-friendly notification method
                this.showSuccess("Votre compte a ete cree , veuillez verifier votre mail");
            });
        },
        error: (e) => {
          console.log(e);
          this.showDanger(e.error.message);
        },
      });
    }
  }
  
  
}
