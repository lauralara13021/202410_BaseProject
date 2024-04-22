import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';
import { dataSeries } from '../dataSeries';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent implements OnInit {
  series: Array<Serie> = [];
  seasonsAverage: number = 0;

  constructor(private serieService: SerieService) { }
  
  getSerieList(): void {
    this.serieService.getSeries().subscribe((series) => {
      this.series = series;
    });
  }
  ngOnInit(): void {
    this.fetchSeries();
    this.calcularPromedio();
  }

  private fetchSeries(): void {
    this.serieService.getSeries().subscribe((series: Serie[]) => {
      this.series = series;
    });
  }
  calcularPromedio(): number {
  if (this.series.length === 0) {
    return 0; 
  }

  let totalTemporadas = 0;
    this.series.forEach((serie) => {
      totalTemporadas += serie.seasons;
    });

  return totalTemporadas / this.series.length;
}

}

