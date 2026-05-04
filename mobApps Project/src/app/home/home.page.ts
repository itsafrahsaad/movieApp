import { Component, OnInit } from '@angular/core';
import { IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonTitle,IonButtons, IonToolbar, IonHeader, IonRouterLink } from '@ionic/angular/standalone';
import { MovieService } from '../service/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IonicModule } from '@ionic/angular'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonTitle, IonToolbar,IonButton,
    IonHeader, FormsModule, CommonModule],
})
export class HomePage implements OnInit{
  movies: any[] = [];
  query: string ='';

  constructor(private movieService: MovieService,
     private router: Router) {}

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  ngOnInit(): void {
    console.log("INIT RUNNING");
  
    this.movieService.getTrending().subscribe({
    next: (res: any) => {
     console.log("SUCCESS:",res);
    this.movies = res.results;
    },
    error: (err) => {
      console.log("ERROR:", err);
    }
    });
  }
  loadTrending() { 
    this.movieService.getTrending().subscribe((res: any)=>{
      this.movies=res.results;
    });
  }
  search() { 
    if(!this.query) {this.loadTrending();
      return;
    }
    this.movieService.searchMovies(this.query).subscribe((res: any) => {
      this.movies= res.results;
    });
  }
  openDetails(id: number) {
    this.router.navigate(['/movie-details',id]);
  }
  toggleFavourite(movie: any) {
    this.movieService.toggleFavourite(movie);
  }
}
