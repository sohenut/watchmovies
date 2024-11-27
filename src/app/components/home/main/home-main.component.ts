import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { URLService } from '../../../util/movie/URL';
import { BannerComponent } from '../../../views/home-main/banner.component';
import { MovieRowComponent } from '../../../views/home-main/movie-row.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home-main.component.html',
  standalone: true,
  styleUrls: ['./home-main.component.css'],
  imports: [
    BannerComponent,
    MovieRowComponent
  ]
})
export class HomeMainComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faUser = faUser;

  apiKey: string = localStorage.getItem('TMDb-Key') || environment.TMDB_API_KEY;
  featuredMovie: any = null;
  popularMoviesUrl: string = '';
  newReleasesUrl: string = '';
  actionMoviesUrl: string = '';

  private scrollListener: any;

  constructor(
    private urlService: URLService
  ) {
    // API 호출 시, 인자는 넘기지 않습니다. 내부적으로 apiKey를 사용하도록 변경됨
    this.popularMoviesUrl = urlService.getURL4PopularMovies(1);  // 1은 page 값
    this.newReleasesUrl = urlService.getURL4ReleaseMovies(1);  // 1은 page 값
    this.actionMoviesUrl = urlService.getURL4GenreMovies('28', 1);  // 1은 page 값
  }

  ngOnInit() {
    this.loadFeaturedMovie();
    this.initializeScrollListener();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  private async loadFeaturedMovie() {
    // apiKey를 넘길 필요 없이 내부에서 사용하도록 변경
    this.featuredMovie = await this.urlService.fetchFeaturedMovie();
  }

  private initializeScrollListener() {
    this.scrollListener = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', this.scrollListener);
  }
}
