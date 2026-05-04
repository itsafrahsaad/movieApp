import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '3d14a213990d747b35b509ffb327462b';
  private favKey= 'favourites';
  
  constructor(private http: HttpClient) {}

  getTrending() {
    return this.http.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`);
  }
  getMovieDetails(id: string) {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }
  getMovieCredits(id: string) {
    return this.http.get(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }
  searchMovies(query: string) {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`,{
      headers:{
        Authorization: 'BearereyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDE0YTIxMzk5MGQ3NDdiMzViNTA5ZmZiMzI3NDYyYiIsIm5iZiI6MTc3NzcyNTcwMi45NTgwMDAyLCJzdWIiOiI2OWY1ZjEwNjgzYmYzY2RiYzhhMWM5YWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yjAHsB0pTfz66Oqi0QmTFqn-KSwfBLp7B4Lgn59jIYY'
      }
    }
  );
  }
  getPersonDetails(id: number){
    return this.http.get(`${this.baseUrl}/person/${id}?api_key=${this.apiKey}`);
  }
  getPersonMovies(id: number){
    return this.http.get(`${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}`);
  }
 
  getFavourites(): any[] {
    const data =localStorage.getItem(this.favKey) 
    return data ? JSON.parse(data): 
    [];
  }
  toggleFavourite(movie: any) {
    let favs = this.getFavourites();

    const index = favs.findIndex((m: any)=> m.id === movie.id);

    if (index > -1){
      favs.splice(index,1); // remove movie if its already there
    }else{
      favs.push(movie); // add new movies
    }
    localStorage.setItem(this.favKey, JSON.stringify(favs));
  }
  isFavourite(id: number): boolean {
    const favs = this.getFavourites();
    return favs.some(m => m.id === id);
  }
  addFavourite(movie: any) {
    let favs =this.getFavourites();
    if(!favs.find((m: any) => m.id === movie.id)){
      favs.push(movie);
      localStorage.setItem(this.favKey,JSON.stringify(favs));
    }
  }
}
