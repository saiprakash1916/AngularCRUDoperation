import { ApiService } from './../shared/api.service';
import { EmployeeModel } from './employee-dash-board.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {

  formValue !: FormGroup;
  EmployeeModelObject : EmployeeModel = new EmployeeModel()
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobileNo : [''],
      salary : [''],
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
   postEmployeeDetails(){
     this.EmployeeModelObject.firstName = this.formValue.value.firstName;
     this.EmployeeModelObject.lastName = this.formValue.value.lastName;
     this.EmployeeModelObject.email = this.formValue.value.email;
     this.EmployeeModelObject.mobileNo = this.formValue.value.mobileNo;
     this.EmployeeModelObject.salary = this.formValue.value.salary;

     this.api.postEmployee(this.EmployeeModelObject)
     .subscribe(res =>{
       console.log(res);
       alert("Employee added Successfully...");
       let ref = document.getElementById('cancel');
       ref?.click();
       this.formValue.reset();
       this.getAllEmployee();
     },
     err => {
       alert("Something went wrong...");
     })
   }

   getAllEmployee(){
     this.api.getEmployee()
     .subscribe(res => {
      this.employeeData = res;
     })
   }
   deleteEmployee(row:any){
     this.api.deleteEmployee(row.id)
     .subscribe(res=>{
       alert("Employee Deleted...");
       this.getAllEmployee();
     })
   }
   onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
     this.EmployeeModelObject.id = row.id;
     this.formValue.controls['firstName'].setValue(row.firstName);
     this.formValue.controls['lastName'].setValue(row.lastName);
     this.formValue.controls['email'].setValue(row.email);
     this.formValue.controls['mobileNo'].setValue(row.mobileNo);
     this.formValue.controls['salary'].setValue(row.salary);
   }
   updateEmployeeDetails(){
    this.EmployeeModelObject.firstName = this.formValue.value.firstName;
    this.EmployeeModelObject.lastName = this.formValue.value.lastName;
    this.EmployeeModelObject.email = this.formValue.value.email;
    this.EmployeeModelObject.mobileNo = this.formValue.value.mobileNo;
    this.EmployeeModelObject.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.EmployeeModelObject, this.EmployeeModelObject.id)
    .subscribe(res =>{
      alert("Updated Successfully...")
      let ref = document.getElementById('cancel');
       ref?.click();
       this.formValue.reset();
       this.getAllEmployee();
    })
   }
}
