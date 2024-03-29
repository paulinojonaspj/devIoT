import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { FormsModule } from '@angular/forms';
import { Objetivo } from '../objetivos/objetivo';
import { BaseService } from '../../base.service';
import { Consumo } from './resumo.service';
import { replaceDecimalSeparator } from '../../pipe';
import { CommonModule } from '@angular/common';
import { IUtilizador } from '../contratos/IUtilizador';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [HighchartsChartModule, HighchartsChartModule, FormsModule, replaceDecimalSeparator, CommonModule],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.css'
})
export class ResumoComponent implements OnInit {
  barras: typeof Highcharts = Highcharts;

  ano = 2024;
  mes = this.obterMesAtual();
  // Obtém a data atual
  dataAtual = new Date();
  // Obtém o dia do mês
  diaAtual = this.dataAtual?.getDate();

  ultimaDataDoMes = new Date(this.ano, this.mesParaNumeroInteiro(this.mes), 0);
  // Obtém o dia do mês da última data
  diasMes = this.ultimaDataDoMes.getDate();


  objetivos: Objetivo[] = [];
  filtroObjetivosAgua?: Objetivo;
  filtroObjetivosEnergia?: Objetivo;
  consumoAguaTable: Consumo[] = [];
  consumoEnergiaTable: Consumo[] = [];
  realizacaoAgua = 0;
  realizacaoEnergia = 0;
  previstoAgua = 0;
  previstoEnergia = 0;
  objetivoAgua = 0;
  objetivoEnergia = 0;

  faturacaoAgua = 0;
  faturacaoEnergia = 0;

  precoConsumoAgua = 0;
  precoConsumoEnergia = 0;

  precoFixoAgua = 0;
  precoFixoEnergia = 0;

  chartOptions: Highcharts.Options = {};

  @ViewChild('chartAnual', { static: true }) chartAnual!: ElementRef;
  @ViewChild('chartDiarioMensal', { static: true }) chartDiarioMensal!: ElementRef;
  @ViewChild('chartGaugeAgua', { static: true }) chartGaugeAgua!: ElementRef;
  @ViewChild('chartGaugeEnergia', { static: true }) chartGaugeEnergia!: ElementRef;
  @ViewChild('chartGaugePrevistoAgua', { static: true }) chartGaugePrevistoAgua!: ElementRef;
  @ViewChild('chartGaugePrevistoEnergia', { static: true }) chartGaugePrevistoEnergia!: ElementRef;

  authservice = inject(LoginServiceService);
  private serviceBase = inject(BaseService);

  constructor() {

  }
  ngOnInit(): void {
    HighchartsMore(Highcharts);

    setInterval(()=>{
      this.filtrar();
    },3000)

  }

  filtrar() {
    this.serviceBase.contratoService.getUtilizador().subscribe(res => {
      this.precoConsumoEnergia = this.calcularPrecoEnergia(res);
      this.precoFixoEnergia = res.precoFixoEnergia;
      this.precoConsumoAgua = res.precoAgua;
      this.precoFixoAgua = res.precoFixoAgua;


      this.serviceBase.objetivoService.getObjetivos().subscribe(res => {
        this.objetivos = res;
        this.filtroObjetivosAgua = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "AGUA")[0] ?? [];
        this.filtroObjetivosEnergia = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "ENERGIA")[0] ?? [];

        this.serviceBase.resumoService.getConsumo(this.ano + "-" + this.mesParaNumero(this.mes)).subscribe(res => {
          this.objetivoAgua = this.getObjetivoAgua();
          this.objetivoEnergia = this.getObjetivoEnergia();

          this.consumoAguaTable = res.filter(objeto => objeto.tipo === 'AGUA');
          this.consumoEnergiaTable = res.filter(objeto => objeto.tipo === 'ENERGIA');

          this.initChart();

        });

      });
    });
  }

  getObjetivoAgua() {
    if (this.mes === "Janeiro") {
      return this.filtroObjetivosAgua?.janeiro || 0;
    }

    if (this.mes === "Fevereiro") {
      return this.filtroObjetivosAgua?.fevereiro || 0;
    }

    if (this.mes === "Março") {
      return this.filtroObjetivosAgua?.marco || 0;
    }
    if (this.mes === "Abril") {
      return this.filtroObjetivosAgua?.abril || 0;
    }
    if (this.mes === "Maio") {
      return this.filtroObjetivosAgua?.maio || 0;
    }
    if (this.mes === "Junho") {
      return this.filtroObjetivosAgua?.junho || 0;
    }
    if (this.mes === "Julho") {
      return this.filtroObjetivosAgua?.julho || 0;
    }
    if (this.mes === "Agosto") {
      return this.filtroObjetivosAgua?.agosto || 0;
    }
    if (this.mes === "Setembro") {
      return this.filtroObjetivosAgua?.setembro || 0;
    }
    if (this.mes === "Outubro") {
      return this.filtroObjetivosAgua?.outubro || 0;
    }
    if (this.mes === "Novembro") {
      return this.filtroObjetivosAgua?.novembro || 0;
    }
    if (this.mes === "Dezembro") {
      return this.filtroObjetivosAgua?.dezembro || 0;
    }

    return 0;
  }


  getObjetivoEnergia() {
    if (this.mes === "Janeiro") {
      return this.filtroObjetivosEnergia?.janeiro || 0;
    }

    if (this.mes === "Fevereiro") {
      return this.filtroObjetivosEnergia?.fevereiro || 0;
    }

    if (this.mes === "Março") {
      return this.filtroObjetivosEnergia?.marco || 0;
    }
    if (this.mes === "Abril") {
      return this.filtroObjetivosEnergia?.abril || 0;
    }
    if (this.mes === "Maio") {
      return this.filtroObjetivosEnergia?.maio || 0;
    }
    if (this.mes === "Junho") {
      return this.filtroObjetivosEnergia?.junho || 0;
    }
    if (this.mes === "Julho") {
      return this.filtroObjetivosEnergia?.julho || 0;
    }
    if (this.mes === "Agosto") {
      return this.filtroObjetivosEnergia?.agosto || 0;
    }
    if (this.mes === "Setembro") {
      return this.filtroObjetivosEnergia?.setembro || 0;
    }
    if (this.mes === "Outubro") {
      return this.filtroObjetivosEnergia?.outubro || 0;
    }
    if (this.mes === "Novembro") {
      return this.filtroObjetivosEnergia?.novembro || 0;
    }
    if (this.mes === "Dezembro") {
      return this.filtroObjetivosEnergia?.dezembro || 0;
    }

    return 0;
  }

  initChart(): void {
    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ÁGUA</span>", this.objetivoAgua, (this.calcularTotalConsumoAgua/1000 * this.precoConsumoAgua + this.precoFixoAgua));
    Highcharts.chart(this.chartGaugeAgua.nativeElement, this.chartOptions);



    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ENERGIA</span>", this.objetivoEnergia, (this.calcularTotalConsumoEnergia * this.precoConsumoEnergia + this.precoFixoEnergia));
    Highcharts.chart(this.chartGaugeEnergia.nativeElement, this.chartOptions);


    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ÁGUA</span>", this.objetivoAgua, (((this.calcularTotalConsumoAgua/1000 * this.precoConsumoAgua) / this.diaAtual) * this.diasMes)+ this.precoFixoAgua);
    Highcharts.chart(this.chartGaugePrevistoAgua.nativeElement, this.chartOptions);


    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ENERGIA</span>", this.objetivoEnergia, (((this.calcularTotalConsumoEnergia * this.precoConsumoEnergia) / this.diaAtual) * this.diasMes) + this.precoFixoEnergia);
    Highcharts.chart(this.chartGaugePrevistoEnergia.nativeElement, this.chartOptions);


    Highcharts.chart(this.chartDiarioMensal.nativeElement, this.opcoesDiario("Consumo diário"));


    this.chartOptions = this.opcoes();
    Highcharts.chart(this.chartAnual.nativeElement, this.chartOptions);

  }

  opcoesGauge(titulo: string, objetivo: number, faturacao: number): any {
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
          to: 100,
          color: '#55BF3B', // green
          thickness: 20
        }, {
          from: 100,
          to: 150,
          color: '#DDDF0D', // yellow
          thickness: 20
        }, {
          from: 150,
          to: 200,
          color: '#DF5353', // red
          thickness: 20
        }]
      },
      series: [{
        name: titulo,
        data: [parseFloat(((faturacao*100)/objetivo).toFixed(2))],
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
          data: [10, 23, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        },
        {
          type: "column",
          name: 'ENERGIA',
          data: [4, 34, 22, 9, 8, 9, 9, 8, 9, 0, 9, 8]

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

  obterMesAtual(): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth(); // Retorna o índice do mês (0-11)

    return meses[mesAtual];
  }

  mesParaNumero(mes: string): string | undefined {
    const meses: { [key: string]: string } = {
      'Janeiro': "01",
      'Fevereiro': "02",
      'Março': "03",
      'Abril': "04",
      'Maio': "05",
      'Junho': "06",
      'Julho': "07",
      'Agosto': "08",
      'Setembro': "09",
      'Outubro': "10",
      'Novembro': "11",
      'Dezembro': "12"
    };

    return meses[mes];
  }

  mesParaNumeroInteiro(mes: string): number {
    const meses: { [key: string]: number } = {
      'Janeiro': 1,
      'Fevereiro': 2,
      'Março': 3,
      'Abril': 4,
      'Maio': 5,
      'Junho': 6,
      'Julho': 7,
      'Agosto': 8,
      'Setembro': 9,
      'Outubro': 10,
      'Novembro': 11,
      'Dezembro': 12
    };

    return meses[mes];
  }

  get calcularTotalConsumoAgua(): number {
    return this.consumoAguaTable.reduce((total, consumo) => total + consumo.quantidade, 0);
  }

  get calcularTotalConsumoEnergia(): number {
    return this.consumoEnergiaTable.reduce((total, consumo) => total + consumo.quantidade, 0) / 3600;
  }

  calcularPrecoEnergia(conta: IUtilizador): number {
    const horaAtual = new Date();

    if (horaAtual >= new Date(`2000-01-01T${conta.horarioDeP1Energia}`) &&
      horaAtual <= new Date(`2000-01-01T${conta.horarioAteP1Energia}`)) {
      return conta.precoP1Energia;
    } else if (horaAtual >= new Date(`2000-01-01T${conta.horarioDeP2Energia}`) &&
      horaAtual <= new Date(`2000-01-01T${conta.horarioAteP2Energia}`)) {
      return conta.precoP2Energia;
    } else {
      return conta.precoP3Energia;
    }
  }

}
