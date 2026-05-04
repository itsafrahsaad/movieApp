import { Component, numberAttribute, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList} from '@ionic/angular/standalone';
import { MovieService } from '../service/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonList]
})
export class PersonDetailsPage implements OnInit {
id: any;
person:any;
movies: any;

  constructor( 
private route: ActivatedRoute,
private movieService: MovieService
) {}

  ngOnInit() {
    const idParam =
    this.route.snapshot.paramMap.get('id');
    const id =idParam? Number(idParam): 0;

    this.movieService.getPersonDetails(id).subscribe((res: any)=>{
      this.person= res;
    });
  
 this.movieService.getPersonMovies(id).subscribe((res: any) => {
  this.movies= res.cast;
 })
  };
}