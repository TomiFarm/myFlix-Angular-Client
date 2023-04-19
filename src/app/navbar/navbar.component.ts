import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  constructor(public router: Router){}
  
  ngOnInit(): void {}

  /**
   * Function to navigate to /movies
   * @function toMovies
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Function to navigate to /profile
   * @function toProfile
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Function to navigate to /welcome and clears local storage to log out the user
   * @function logout
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
