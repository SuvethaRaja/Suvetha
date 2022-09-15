import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/model/employees';
import { EmployeeService } from 'src/app/employee.service';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  EmployeesList: Employees[] = [];
  employeeObj: Employees = {
    id: '',
    email: '',
    name: '',

    };
  id: string = '';
  email: string = '';
  name: string = '';
  Sno: any=0;
 sno= this.Sno++;
constructor( private data:EmployeeService, private router:Router,private afs: AngularFirestore) { }
ngOnInit(){
    this.getAllEmployees(
      
    );
    
  }
   getAllEmployees() {
          
    this.data.getAllEmployees().subscribe((res) => {
       
      this.EmployeesList = res.map((e: any) => {
         const data = e.payload.doc.data();

        data.id = e.payload.doc.id;
      return data;
        })
          
          }, err => {
      alert('Error while fetching student data');
    })

  }

  resetForm() {
    this.email = '';
    this.name = '';
  }

  addEmployees() {
    if (this.name == ''  || this.email == '') {
      alert('Fill all input fields');
      return;
    }
    
    this.employeeObj.id = '';
    this.employeeObj.email = this.email;
    
    this.employeeObj.name = this.name;

    this.data.addEmployees(this.employeeObj);
    this.resetForm();

  }

  updateEmployees(employee:Employees) {

    if (window.confirm('Are you sure you want to Update '  + employee.name)) 
    {
      
      this.data.updateEmployees(employee);
   
  }

  }
      


  deleteEmployees(employee:Employees) {
    if (window.confirm('Are you sure you want to delete ' + employee.name  + ' ?')) 
    {
      this.data.deleteEmployees(employee);
    }
  }

        
} 


