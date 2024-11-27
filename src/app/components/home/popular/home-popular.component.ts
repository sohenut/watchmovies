import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';
import { MovieInfiniteScrollComponent } from '../../../views/views/movie-infinite-scroll.component';
import { URLService } from '../../../util/movie/URL';
import { MovieGridComponent } from '../../../views/views/movie-grid.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-home-popular',
  standalone: true,
  imports: [
    CommonModule,
    MovieGridComponent,
    MovieInfiniteScrollComponent,
    FontAwesomeModule
  ],
  templateUrl: './home-popular.component.html',
  styleUrls: ['./home-popular.component.css']
})
export class HomePopularComponent implements OnInit {
  faTh = faTh;
  faBars = faBars;

  apiKey = localStorage.getItem('TMDb-Key') || environment.TMDB_API_KEY; // apiKey를 클래스 변수로 유지
  currentView = 'grid';

  constructor(private urlService: URLService) {}

  ngOnInit(): void {
    this.disableScroll();
  }

  setView(view: string): void {
    this.currentView = view;
    if (view === 'grid') {
      this.disableScroll();
    } else {
      this.enableScroll();
    }
  }

  private disableScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private enableScroll(): void {
    document.body.style.overflow = 'auto';
  }

  // getURL4PopularMovies 메서드에서 apiKey를 직접 사용하도록 수정
  fetFetchURL(): string {
    // apiKey를 여기서 사용하지 않고 URLService 메서드에서 처리하도록 해야 한다.
    return this.urlService.getURL4PopularMovies(1); // page 값은 1로 고정, apiKey는 내부에서 사용
  }
}
