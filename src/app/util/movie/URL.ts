import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment'; // 환경 설정 가져오기

@Injectable({
  providedIn: 'root'
})
export class URLService {
  private apiKey: string = environment.TMDB_API_KEY; // 환경 변수에서 API 키 가져오기

  // 인기 영화 요청
  fetchFeaturedMovie = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR`);
      console.log(response.data.results[0]);
      return response.data.results[0];
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    }
  }

  // 인기 영화 URL 생성
  getURL4PopularMovies = (page: number = 1) => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR&page=${page}`;
  }

  // 최신 영화 URL 생성
  getURL4ReleaseMovies = (page: number = 2) => {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=ko-KR&page=${page}`;
  }

  // 특정 장르 영화 URL 생성
  getURL4GenreMovies = (genre: string, page: number = 1) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
  }
}
