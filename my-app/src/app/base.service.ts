import { inject, Injectable } from '@angular/core';
import { ObjetivoService } from './pages/objetivos/objetivo.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  objetivoService = inject(ObjetivoService);
  http = inject(HttpClient);
  constructor() { }

  log(texto: any) {
    console.log(texto);
  }

  getCodigoPostal(codigo: string) {
    return this.http.get<any>("https://json.geoapi.pt/cp/" + codigo)
  }
}


interface Address {
  CP: string;
  CP4: string;
  CP3: string;
  Distrito: string;
  Concelho: string;
  Localidade: string;
  DesignacaoPostal: string;
  partes: Parte[];
  pontos: Ponto[];
}

interface Parte {
  Artéria: string;
  Local: string;
  Troço: string;
  Porta: string;
  Cliente: string;
}

interface Ponto {
  id: string;
  rua: string;
  casa: string;
  coordenadas: [number, number];
}
