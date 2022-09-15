import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Employees } from './model/employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  router: any;

  constructor(private afs : AngularFirestore) { }



  addEmployees(employee : Employees) {
    employee.id = this.afs.createId();
    return this.afs.collection('/Employees').add(employee);
  }

  // get all students
  getAllEmployees() {
    return this.afs.collection('/Employees').snapshotChanges();
    
  }

  // delete student
  deleteEmployees(employee : Employees) {
     return  this.afs.doc('/Employees/'+ employee.id).delete();
     
  }

  // update student
  updateEmployees(employee:Employees) {
    this.deleteEmployees(employee);
    this.addEmployees(employee);
    return this.afs.doc('/Employee/'+employee.id).update(employee);
  }
}