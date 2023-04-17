import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any={}

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  }

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.fetchApiDataService.getUser().subscribe((res: any) => {
      this.user = {
        ...res,
        Birthday: new Date(res.Birthday).toLocaleDateString()
      };
      return this.user;
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')){
      this.router.navigate(['welcome']).then(()=>{
        this.fetchApiDataService.deleteUser().subscribe((res)=>{
          console.log('Account delete response', res);
        });
        this.snackBar.open('Your account has been successfully deleted!', 'OK', {
          duration: 3000
        });
        localStorage.clear();
      });
    }
  }

  updateAccount(): void {
    this.fetchApiDataService.editUser(this.userData).subscribe((res) => {
      localStorage.setItem('username', res.Username);
      this.snackBar.open('Your profile has been updated!', 'OK', {
        duration: 3000
      });
      window.location.reload();
    }, (err) => {
      this.snackBar.open(err.errors[0].msg, 'OK', {
        duration: 8000
      });
    });
  }
}
