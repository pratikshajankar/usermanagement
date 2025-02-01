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

  // Holds the search value
  searchItem:string='';
  // filtered list displayed in table
  filteredUsers:any[]=[];

  // Creating a form object
  userForm:FormGroup=new FormGroup({});
// creating user class object
UserObj:User=new User();
// Creating list of user interface
UserList:IUser[]=[];
  constructor() { }

  ngOnInit(): void {


    // Initialize with full list
    this.filteredUsers=[...this.UserList];

    // calling createForm()
    this.createForm();

    const oldData=localStorage.getItem("UserData");
    this.UserList = oldData ? JSON.parse(oldData) : [];
    if(oldData!=null){
      const parseData=JSON.parse(oldData);
      console.log('Loaded from localStorage:', this.UserList);
    }

  }

  // Function to filter user by name
  filterUsers(){
    this.filteredUsers=this.UserList.filter(user=>user.name.toLowerCase().includes(this.searchItem.toLowerCase())
  );
  }

  // Method to save the role change for a user
  onSaveRole(user:any){
    // find the user in the list and update their role
    const userIndex=this.UserList.findIndex(u=>u.userid===user.userid);
    if(userIndex!==-1){
      // update the role in the userlist
      this.UserList[userIndex].role=user.role;

      // Save the update list back to local storage
      localStorage.setItem("UserData",JSON.stringify(this.UserList));
      alert('Role for {user.name} has been updated to {user.role}');
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
      const newUser = this.userForm.value;
      const parseData=JSON.parse(oldData);
      this.UserList.unshift(this.userForm.value);

      newUser.userid = parseData.length > 0 
      ? parseData[parseData.length - 1].userid + 1 // Get last user's ID and increment
      : 1; 
    }
    else{
      this.UserList.unshift(this.userForm.value);
    }
    localStorage.setItem("UserData",JSON.stringify(this.UserList));
    alert("User Added Successfully");
    this.onReset();
  }

  // Updating information of user on clicking update button
  onUpdate(){
    const record=this.UserList.find(m=>m.userid==this.userForm.controls['userid'].value);
    if(record!=undefined){
      record.name=this.userForm.controls['name'].value;
      record.email=this.userForm.controls['email'].value;
      record.role=this.userForm.controls['role'].value;
    }
    alert("User Updated Successfully");
    this.onReset();
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
