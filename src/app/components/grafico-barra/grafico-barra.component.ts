import { Component, OnInit, inject } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  increment,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Juego } from 'src/app/interfaces/juego.inerface';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css'],
})
export class GraficoBarraComponent implements OnInit {
  private firestore = inject(Firestore);

  juegos$!: Observable<Juego[]>;

  labels: string[] = [];
  valoresFinales: number[] = [];

  barChartType: 'bar' = 'bar';

  private readonly coloresPaleta = ['#FF8C42', '#FFD700', '#48CAE4', '#BE1558'];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Puntuación Gamer',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 28,
      },
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',

    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },

    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.parsed.x} votos`;
          },
        },
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.12)',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 13,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  ngOnInit(): void {
    const colRef = collection(this.firestore, 'juegos');

    this.juegos$ = collectionData(colRef, { idField: 'id' }) as Observable<
      Juego[]
    >;

    this.juegos$.subscribe({
      next: (juegos) => {
        console.log('Juegos recibidos:', juegos);

        this.labels = juegos.map((juego) => juego.nombre);
        this.valoresFinales = juegos.map((juego) => juego.votos);

        this.cargarGraficaDesdeCero();
      },
      error: (err) => console.error('Error de Firebase:', err),
    });
  }

  cargarGraficaDesdeCero(): void {
    const valoresIniciales = this.labels.map(() => 0);

    this.barChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Votos Gamer',
          data: valoresIniciales,
          backgroundColor: this.obtenerColores(),
          borderColor: this.obtenerColores(),
          borderWidth: 1,
          borderRadius: 10,
          barThickness: 28,
        },
      ],
    };

    setTimeout(() => {
      this.barChartData = {
        labels: this.labels,
        datasets: [
          {
            label: 'Votos Gamer',
            data: this.valoresFinales,
            backgroundColor: this.obtenerColores(),
            borderColor: this.obtenerColores(),
            borderWidth: 1,
            borderRadius: 10,
            barThickness: 28,
          },
        ],
      };
    }, 250);
  }

  votarJuego(juego: Juego): void {
    if (!juego.id) {
      console.error('El juego no tiene id');
      return;
    }

    const juegoRef = doc(this.firestore, `juegos/${juego.id}`);

    updateDoc(juegoRef, {
      votos: increment(1),
    }).catch((error) => {
      console.error('Error al votar:', error);
    });
  }

  private obtenerColores(): string[] {
    return this.labels.map(
      (_, index) => this.coloresPaleta[index % this.coloresPaleta.length],
    );
  }
}
