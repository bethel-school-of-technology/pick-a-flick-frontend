import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // environment.apiBaseUrlMovies: 'http://localhost:8080/api/movies'
  apiServerUrl: string = environment.apiBaseUrlMovies;

  constructor(private http: HttpClient) { }

  // get all movies READ
  getMovies(): Observable<Movie[]> {
    let myHeaders = {
      Authorization: localStorage.getItem("token")
    }
    return this.http.get<Movie[]>(`${this.apiServerUrl}/all`, {headers: myHeaders});
  }

  // get movie by id READ
  // need to provide movieId
  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiServerUrl}/find/${movieId}`);
  }

  // get movies by tagId READ
  // need to provide tagId
  getMoviesByTag(tagId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}/find/tag/${tagId}`);
  }

  // edit movie UPDATE
  // need to provide editId and updatedMovie info
  editMovie(editId: number, updatedMovie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiServerUrl}/update/${editId}`, updatedMovie);
  }

  // add movie CREATE
  // need to provide newMovie info
  addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiServerUrl}/add`, newMovie);
  }

  // delete movie DELETE
  // need to provide deleteId
  deleteMovie(deleteId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/delete/${deleteId}`);
  }
}
