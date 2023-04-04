import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{
  room: any
  constructor(private router: ActivatedRoute, private CookieService:CookieService) { }
  
  ngOnInit(): void{
    this.room = this.router.snapshot.paramMap.get('room')
    this.CookieService.set("room", this.room)
  }
}
