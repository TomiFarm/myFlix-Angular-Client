import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MovieDetailsCardComponent } from '../movie-details-card/movie-details-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent {
  favorites: any[] = [];
  favoriteMovies: any[] = [];
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  /**
   * Function to fetch favorite movie ids
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.favorites = [];
    this.favoriteMovies = [];

    this.fetchApiData.getFavoriteMovies().subscribe((resp:any) => {
      this.favorites = resp;
      let allMovies: any[] = [];
      this.fetchApiData.getAllMovies().subscribe((res:any) => {
        allMovies = res;
        
        this.favoriteMovies = this.favorites.map((favorite:string) => {
          let newArray:any[] = allMovies.filter((movie:any) => movie._id.includes(favorite));
          return newArray[0];
        });
      });
    });
  }

  /**
   * Function to check whether movie is favorited
   * @param id 
   * @returns boolean
   * @function isFavorite
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Function to add a movie as favorite
   * @param id 
   * @function addToFavorites
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((res) => {
      this.snackBar.open('Movie has been added as favorite', 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Function to remove movie from favorites
   * @param id 
   * @function removeFromFavorites
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((res) => {
      this.snackBar.open('Movie has been removed from favorites', 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Function to open genre details
   * @param name 
   * @param description 
   * @function openGenreCard
   */
  openGenreCard(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '400px'
    });
  }

  /**
   * Function to open director details
   * @param name 
   * @param bio 
   * @param birthday 
   * @function openDirectorCard
   */
  openDirectorCard(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday
      },
      width: '400px'
    });
  }

  /**
   * Function to open movie details
   * @param title 
   * @param description 
   * @function openMovieDetailsCard
   */
  openMovieDetailsCard(title: string, description: string): void {
    this.dialog.open(MovieDetailsCardComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '400px'
    });
  }
}
