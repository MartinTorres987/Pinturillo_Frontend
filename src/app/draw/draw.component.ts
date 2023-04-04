import {AfterViewInit, HostListener} from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})

export class DrawComponent implements OnInit, AfterViewInit{
  
  @ViewChild('canvasRef', {static: false}) canvasRef: any;
  @ViewChild('borrador', {static: false}) borrador: any;

  public width = 600;
  public height = 400;

  private cx: CanvasRenderingContext2D | any;
  

  private points: Array<any> = [];

  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (e: any) => {
    if (e.target.id === "canvasId"){
      this.write(e);
      console.log(e);
    }
  }

  constructor(){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.render();
  }

  private render(): any{
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext("2d");

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
  }

  private write(res: any): any{
    const canvasEl: any = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    };
    this.writeSingle(prevPos);
  }


  private writeSingle = (prevPos: any, emit: boolean = true) => {
    this.points.push(prevPos);
    if(this.points.length > 3){
      const prevPost = this.points[this.points.length - 1]
      const currentPos = this.points[this.points.length - 2]
      this.drawOnCanvas(prevPost, currentPos);
    }
  }

  private drawOnCanvas(prevPos: any, currentPos: any){
    if (!this.cx){
      return;
    }
    this.cx.beginPath();
    if(prevPos){
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }


  // Limpiar el lienzo o canvas 

  limpiar(){
    this.cx.clearRect(0, 0, this.width, this.height);
    console.log(this.cx);
  }

  // Borrar lineas

  public flag_1 = false;

  borrar(){
    
    const borra = this.borrador.nativeElement;
    
    if(this.flag_1 == false){
      this.cx.strokeStyle = '#fff';
      this.cx.lineWidth = 7;
      borra.innerHTML = "Borrar";
      this.flag_1 = true;
    }else{
      this.cx.strokeStyle = '#000';
      this.cx.lineWidth = 3;
      borra.borrador.innerHTML = "Lapiz";
      this.flag_1 = false;
    }
    
    
  }

}
