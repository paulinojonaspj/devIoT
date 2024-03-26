import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjetivoService } from './objetivo.service';
import { BaseService } from '../../base.service';
import { Objetivo } from './objetivo';

@Component({
  selector: 'app-objetivos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './objetivos.component.html',
  styleUrl: './objetivos.component.css'
})
export class ObjetivosComponent implements OnInit {

  tipo: string = "";
  ano: number = 2024;
  objetivos: Objetivo[] = [];
  filtroObjetivosAgua?: Objetivo;
  filtroObjetivosEnergia?: Objetivo;
  @ViewChild('btnFechar') btnFechar!: ElementRef;

  private serviceBase = inject(BaseService);
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.getObjetivos();
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      ano: [0, Validators.required],
      tipo: ["", Validators.required],
      janeiro: [0, Validators.required],
      fevereiro: [0, Validators.required],
      marco: [0, Validators.required],
      abril: [0, Validators.required],
      maio: [0, Validators.required],
      junho: [0, Validators.required],
      julho: [0, Validators.required],
      agosto: [0, Validators.required],
      setembro: [0, Validators.required],
      outubro: [0, Validators.required],
      novembro: [0, Validators.required],
      dezembro: [0, Validators.required]
    });

  }
  getObjetivos() {
    this.serviceBase.objetivoService.getObjetivos().subscribe(res => {
      this.objetivos = res;
      this.filtroObjetivosAgua = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "AGUA")[0] ?? [];
      this.filtroObjetivosEnergia = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "ENERGIA")[0] ?? [];
    });
  }

  edit() {
    this.form.patchValue(
      {
        id: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.id : this.filtroObjetivosAgua?.id,
        ano: this.ano,
        tipo: this.tipo,
        janeiro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.janeiro : this.filtroObjetivosAgua?.janeiro,
        fevereiro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.fevereiro : this.filtroObjetivosAgua?.fevereiro,
        marco: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.marco : this.filtroObjetivosAgua?.marco,
        abril: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.abril : this.filtroObjetivosAgua?.abril,
        maio: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.maio : this.filtroObjetivosAgua?.maio,
        junho: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.junho : this.filtroObjetivosAgua?.junho,
        julho: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.julho : this.filtroObjetivosAgua?.julho,
        agosto: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.agosto : this.filtroObjetivosAgua?.agosto,
        setembro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.setembro : this.filtroObjetivosAgua?.setembro,
        outubro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.outubro : this.filtroObjetivosAgua?.outubro,
        novembro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.novembro : this.filtroObjetivosAgua?.novembro,
        dezembro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.dezembro : this.filtroObjetivosAgua?.dezembro,
      });

  }

  atualizar() {
    const values: Objetivo = <Objetivo>this.form.value;

    this.serviceBase.objetivoService.UpdateObjetivos(values).subscribe(res => {
      if (res) {
        this.getObjetivos();
        this.btnFechar.nativeElement.click();
      }
    });

  }

}
