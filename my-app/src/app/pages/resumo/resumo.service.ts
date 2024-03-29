import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumoService {

  constructor() { }
  http = inject(HttpClient);

  getConsumo(data: string) {
    return this.http.get<Consumo[]>(environment.apiUrl + "/bsmart/consumo?data=" + data)
  }

}
export interface Consumo {
  id: number;
  unidade: string;
  quantidade: number;
  localizacao: string;
  tipo: string;
  data: string;
  hora: number;
}
