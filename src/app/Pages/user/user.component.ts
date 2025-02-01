import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/modules/Classes/Use';
import { IUser } from 'src/app/core/modules/Interfaces/IUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Creating a form object
  userForm:FormGroup=new FormGroup({});
// creating user class object
UserObj:User=new User();
// Creating list of user interface
UserList:IUser[]=[];
// UserList: { userid: number; name: string; email: string; role:string }[] = [];
  constructor() { }

  ngOnInit(): void {

    // this.UserList=[
    //   { userid: 1, name: 'John Doe', email: 'john@example.com', role:'User' },
    //     { userid: 2, name: 'Alice Johnson', email: 'alice@example.com', role:'Admin' },
    //     { userid: 3, name: 'Mark Brown', email: 'mark@example.com', role:'User' }
    // ];

    // calling createForm()
    this.createForm();

    const oldData=localStorage.getItem("UserData");
    if(oldData!=null){
      const parseData=JSON.parse(oldData);
    }

  }

  // creatig form
  createForm(){
    this.userForm=new FormGroup({
      userid:new FormControl(this.UserObj.userid),
      name:new FormControl(this.UserObj.name),
      email:new FormControl(this.UserObj.email,(Validators.required,Validators.email)),
      role:new FormControl(this.UserObj.role),
    })

  }

  // Saving form data on clicking save button
  onSave(){
    const oldData=localStorage.getItem("UserData");
    if(oldData!=null){
      const parseData=JSON.parse(oldData);
      this.UserList.unshift(this.userForm.value);
    }
    else{
      this.UserList.unshift(this.userForm.value);
    }
    localStorage.setItem("UserData",JSON.stringify(this.UserList));
    alert("User Added Successfully");
  }

  // Updating information of user on clicking update button
  onUpdate(){
    const record=this.UserList.find(m=>m.userid==this.userForm.controls['userid'].value);
    if(record!=undefined){
      record.name=this.userForm.controls['name'].value;
      record.email=this.userForm.controls['email'].value;
      record.role=this.userForm.controls['role'].value;
    }
    localStorage.setItem("UserData",JSON.stringify(this.UserList));
    alert("User Updated Successfully");
  }

  // open data in editable form
  onEdit(item:User){
    this.UserObj=item;
    this.createForm();
  }

  // delete data from list
  onDelete(id:number){
    const isDelete=confirm("Are you sure want to delete");
    if(isDelete){
      const index=this.UserList.findIndex(m=>m.userid==id);
      this.UserList.splice(index,1);
      localStorage.setItem("UserData",JSON.stringify(this.UserList));
      alert("User Deleted Successfully");
    }
  }

  // reset form field
  onReset(){
    this.UserObj=new User();
    this.createForm();
  }

}
