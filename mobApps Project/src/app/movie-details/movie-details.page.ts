import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel,IonList,IonButton}from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports:[IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel,IonList,IonButton],
})
export class MovieDetailsPage implements OnInit {
 id: any;
 credits: any = { cast:[], crew:[]};
 movie: any;
 isFav: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router) {}

    openPerson(id: number) {
      console.log('CLICKED ID:',id)
      this.router.navigate(['/person-details',id]);
    }
    toggleFavourite(){
     this.movieService.toggleFavourite(this.movie);
    }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id'); 
      if (id){
        this.movieService.getMovieDetails(id).subscribe (res =>
      {
        this.movie=res;
        this.isFav= this.movieService.isFavourite(this.movie.id); 
      });
    
    this.movieService.getMovieCredits(id).subscribe((res:any) =>{
    this.credits=res;
});
}
  }
}
