import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/modules/Classes/Use';
import { IUser } from 'src/app/core/modules/Interfaces/IUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
// creating user class object
UserObj:User=new User();
// Creating list of user interface
UserList:IUser[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
