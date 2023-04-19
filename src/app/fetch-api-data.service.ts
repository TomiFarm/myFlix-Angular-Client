import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://myflix-12345.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * @service POST request to register a new user
   * @param userDetails 
   * @returns a JSON object of the user
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @service POST request to login a user
   * @param userDetails 
   * @returns a JSON object of the user
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @service GET request to get list of all movies
   * @returns an array of all movies
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service GET request to get a movie
   * @param title 
   * @returns a movie object
   * @function getMovie
   */
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service GET request to get a director
   * @param directorName 
   * @returns a director object
   * @function getDirector
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service GET request to get a genre
   * @param genreName 
   * @returns a genre object
   * @function getDirector
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service GET request to get a user
   * @returns user object
   * @function getUser
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service GET request to get a list of favorite movies
   * @returns list of favorite movie ids
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}
    ).pipe(
      map(this.extractResponseData),
      map((data) => data.Favorites),
      catchError(this.handleError)
    );
  }

  /**
   * @service POST request to add a favorite movie
   * @param movieId 
   * @function addFavoriteMovie
   */
  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId,
      { Favorites: movieId},
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service PUT request to edit user
   * @param editedUser 
   * @returns user object
   * @function editUser
   */
  editUser(editedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username,
      editedUser,
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service DELETE request to delete a user
   * @returns success message
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username,
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * @service DELETE request to remove a movie from favorites
   * @param movieId 
   * @returns success message
   * @function removeFavoriteMovie
   */
  removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId,
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Non-typed response extraction
   * @param res 
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Error handling
   * @param error 
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}