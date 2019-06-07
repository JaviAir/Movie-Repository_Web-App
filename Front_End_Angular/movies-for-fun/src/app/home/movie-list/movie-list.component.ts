import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy, AfterViewInit {
  movieArray: any;
  movies;

  private movieArraySubscription: Subscription;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieArraySubscription = this.movieService.movieArrayUpdated.subscribe(
      (movies: Movie[]) => {
        this.movieArray = movies;
      }
    );
    this.movieService.readmovieArray();
  }

  ngAfterViewInit() {
    // once the list from the db has been projected onto the view (because its asyncronous)
    window.scrollTo(0, this.movieService.pageYOffset); // scroll to previous pageYOffset using stored in-memory pageYOffset
  }

  ngOnDestroy() {
    if (this.movieArray) {
      this.movieArraySubscription.unsubscribe();
    }
  }



  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll(event) {
  //    // console.log('Scrolling: ' + window.pageYOffset);
  //   if (this.movieService.pageNumber === 1 && window.pageYOffset >= 450 && window.pageYOffset <= 770) {
  //       this.nextArray();
  //   }

  //     if (this.movieService.pageNumber === 2 && window.pageYOffset window. >= 450 && window.pageYOffset <= 770) {
  //       this.nextArray();
  //   }

  //   if (this.movieService.pageNumber === 3 && window.pageYOffset >= 450 && window.pageYOffset <= 770) {
  //     this.nextArray();
  // }

  // if (this.movieService.pageNumber === 4 && window.pageYOffset >= 450 && window.pageYOffset <= 770) {
  //   this.nextArray();
  // }
  // }
}
