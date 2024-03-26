import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../base.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})
export class ContratosComponent implements OnInit {
  baseService = inject(BaseService);
  private formBuilder = inject(FormBuilder);
  morada: string = "";
  codigoPostal = "";
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Nome: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Telemovel: ['', Validators.required],
      CodigoPostal: ['', Validators.required],
      Morada: ['', Validators.required],
      CasaNumero: ['', Validators.required],
      OperadoraAgua: ['', Validators.required],
      PrecoFixoAgua: ['', Validators.required],
      PrecoAgua: ['', Validators.required],
      OperadoraEnergia: ['', Validators.required],
      TarifaEnergia: ['', Validators.required],
      PotenciaEnergia: ['', Validators.required],
      PrecoFixoEnergia: ['', Validators.required],
      PrecoP1Energia: ['', Validators.required],
      PrecoP2Energia: ['', Validators.required],
      PrecoP3Energia: ['', Validators.required],
      HorarioDeP1Energia: ['', Validators.required],
      HorarioAteP1Energia: ['', Validators.required],
      HorarioDeP2Energia: ['', Validators.required],
      HorarioAteP2Energia: ['', Validators.required],
      HorarioDeP3Energia: ['', Validators.required],
      HorarioAteP3Energia: ['', Validators.required]
    });
  }


  getCodigoPosta() {
    if (this.codigoPostal !== "") {
      this.baseService.getCodigoPostal(this.codigoPostal).pipe(
        catchError((error: HttpErrorResponse) => {
          this.morada = "Código postal inválido ou morada não encontrada."
          return throwError('Algo deu errado na requisição. Por favor, tente novamente mais tarde.');

        })
      ).subscribe(res => {

        if (res.partes[0].Artéria !== undefined) {
          this.form.patchValue({
            Morada: res.Distrito + ", " + res.Concelho + ", " + res.partes[0].Artéria
          });
        }
      });
    }
  }

  atualizar() {

    // this.baseService.log(this.form.value);
  }
}
