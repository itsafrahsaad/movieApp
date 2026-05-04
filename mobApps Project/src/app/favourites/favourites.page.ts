import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,IonButton } from '@ionic/angular/standalone';
import { MovieService } from '../service/movie.service';
import { IonicModule} from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel,IonButton]
})
export class FavouritesPage {
 movies: any[] =[];

  constructor(private movieService: MovieService, private router: Router) {}

  ionViewWillEnter (){
    this.movies= 
    this.movieService.getFavourites();
  }
  remove(movie: any) {
    this.movieService.toggleFavourite(movie);
    this.movies = this.movieService.getFavourites();
  }
openDetails(id: number){
this.router.navigate(['/movie-details',id]);
}
}