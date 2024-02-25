import { OnInit, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { passwordStrengthValidator } from '../_helpers/password-strength.validator';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  submitted = false;
  loginForm: FormGroup;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    public toastService: ToastService
    ) {
      this.mainForm();
     }
     mainForm() {
      this.loginForm = this.fb.group({
        email: [
          '',
          [
             Validators.required,
             Validators.email,
          ],
       ],
        password: ['', [Validators.required]],
      });
    }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
    }
  }
  get myForm() {
    return this.loginForm.controls;
  }
	showSuccess(text) {
		this.toastService.show(text, { classname: 'alert-success  m-3 p-3 ', delay: 10000 });
	}

	showDanger(dangerTpl) {
		this.toastService.show(dangerTpl, { classname: 'alert-danger   m-3 p-3', delay: 15000 });
	}

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      console.log('Le formulaire n\'est pas valide. État des contrôles :', this.loginForm);
      return false;
    } else {
      const formData = { ...this.loginForm.value };  
      console.log(formData);
      return this.authService.loginClient(formData).subscribe({
        next: (data) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          // this.roles = this.tokenStorage.getUser().roles;
          // this.reloadPage();

          console.log('Next level created!');
          // Redirect to home ("/") route
            // this.ngZone.run(() => {
            //     this.router.navigateByUrl('/');
                
                window.location.href="/user-profile";

                
    
            //     // Display an alert after redirection
            //     // alert('vous etes connecte.'); // You might want to use a more user-friendly notification method
            //     this.showSuccess("Vous etes connecte");
            // });


            // this.ngZone.run(() => {
            //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            //     this.router.navigate(['/']);
            //     this.showSuccess("Vous êtes connecté");
            //   });
            // });
            
        },
        error: (e) => {
          this.errorMessage = e.message;
          this.isLoginFailed = true;
          console.error(e);
          // alert('erreur'+e.error.message);
          this.showDanger(e.error.message);
        },
      });
    }




  }
  reloadPage(): void {
    window.location.reload();
  }

}
