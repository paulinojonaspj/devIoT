import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [HighchartsChartModule, HighchartsChartModule],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.css'
})
export class ResumoComponent implements OnInit {
  barras: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {};

  @ViewChild('chartAnual', { static: true }) chartAnual!: ElementRef;
  @ViewChild('chartDiarioMensal', { static: true }) chartDiarioMensal!: ElementRef;
  @ViewChild('chartGaugeAgua', { static: true }) chartGaugeAgua!: ElementRef;
  @ViewChild('chartGaugeEnergia', { static: true }) chartGaugeEnergia!: ElementRef;
  @ViewChild('chartGaugePrevistoAgua', { static: true }) chartGaugePrevistoAgua!: ElementRef;
  @ViewChild('chartGaugePrevistoEnergia', { static: true }) chartGaugePrevistoEnergia!: ElementRef;

  authservice = inject(LoginServiceService);

  constructor() {
    this.authservice.getUses().subscribe(res => {
      console.log(res);
    })
  }
  ngOnInit(): void {
    HighchartsMore(Highcharts);
    this.initChart();

  }

  initChart(): void {
    Highcharts.chart(this.chartDiarioMensal.nativeElement, this.opcoesDiario("Consumo diário"));



    this.chartOptions = this.opcoesGauge("ÁGUA");
    Highcharts.chart(this.chartGaugeAgua.nativeElement, this.chartOptions);

    this.chartOptions = this.opcoesGauge("ENERGIA");
    Highcharts.chart(this.chartGaugeEnergia.nativeElement, this.chartOptions);


    this.chartOptions = this.opcoesGauge("ÁGUA");
    Highcharts.chart(this.chartGaugePrevistoAgua.nativeElement, this.chartOptions);


    this.chartOptions = this.opcoesGauge("ENERGIA");
    Highcharts.chart(this.chartGaugePrevistoEnergia.nativeElement, this.chartOptions);

    this.chartOptions = this.opcoes();
    Highcharts.chart(this.chartAnual.nativeElement, this.chartOptions);

  }

  opcoesGauge(titulo: string): any {
    return {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '80%'
      },

      title: {
        text: titulo
      },

      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ['50%', '75%'],
        size: '110%'
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 200,
        tickPixelInterval: 72,
        tickPosition: 'inside',
        tickColor: Highcharts.defaultOptions.chart?.backgroundColor || '#FFFFFF',
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
          distance: 20,
          style: {
            fontSize: '14px'
          }
        },
        lineWidth: 0,
        plotBands: [{
          from: 0,
          to: 120,
          color: '#55BF3B', // green
          thickness: 20
        }, {
          from: 120,
          to: 160,
          color: '#DDDF0D', // yellow
          thickness: 20
        }, {
          from: 160,
          to: 200,
          color: '#DF5353', // red
          thickness: 20
        }]
      },
      series: [{
        name: titulo,
        data: [80],
        tooltip: {
          valueSuffix: ' %'
        },
        dataLabels: {
          format: '{y} %',
          borderWidth: 0,
          color: (
            Highcharts.defaultOptions.title &&
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || '#333333',
          style: {
            fontSize: '16px'
          }
        },
        dial: {
          radius: '80%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%'
        },
        pivot: {
          backgroundColor: 'gray',
          radius: 6
        }

      }]

    };
  }
  opcoes(): Highcharts.Options {
    return {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: 'Consumo Anual'
      },

      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        accessibility: {
          description: 'Months of the year'
        }
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [
        {
          type: "column",
          name: 'ÁGUA',
          data: [10, 23, 44,0,0,0,0,0,0,0,0,0]

        },
        {
          type: "column",
          name: 'ENERGIA',
          data: [4, 34, 22,9,8,9,9,8,9,0,9,8]

        }
      ],

    }

  };


  opcoesDiario(titulo: string): any {
    return {
      chart: {
        type: 'spline'
      },
      title: {
        text: '<h3>Consumo Mensal Diário</h3>'
      },

      xAxis: {
        categories: ['1', '2', '3', '4', '5', '6',
          '7', '8', '9', '10', '11', '12'],
        accessibility: {
          description: 'Months of the year'
        }
      },
      yAxis: {
        title: {
          text: 'Total'
        },
        labels: {
          format: '{value} &euro;'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Água',
        marker: {
          symbol: 'square'
        },
        data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
          y: 26.4,
          marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
          },
          accessibility: {
            description: 'Sunny symbol, this is the warmest point in the chart.'
          }
        }, 22.8, 17.5, 12.1, 7.6]

      }, {
        name: 'Energia',
        marker: {
          symbol: 'diamond'
        },
        data: [{
          y: 1.5,
          marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
          },
          accessibility: {
            description: 'Snowy symbol, this is the coldest point in the chart.'
          }
        }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
      }]
    }
  }

}
