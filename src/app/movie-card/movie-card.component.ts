import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MovieDetailsCardComponent } from '../movie-details-card/movie-details-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Function to fetch movies via API call and sets movie state
   * @returns an array with movie objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Function to fetch favorite movie ids via API call
   * @returns an object with favorited movie ids
   * @function getFavorites
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.Favorites;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   * Function to check whether the movie is favorited
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
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie was added as your favorite', 'OK', {
        duration: 2000
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
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie was removed from your favorites', 'OK', {
        duration: 2000
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
