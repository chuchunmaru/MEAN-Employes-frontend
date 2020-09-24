import {Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'
import {NgForm} from '@angular/forms'
import { Employee } from 'src/app/models/employees';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  
  constructor(public employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeService.employees = res;
      console.log(res)
    });
  }
  addEmployee(form:NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe(
        res=>console.log(res),
        err=>console.log(err)
      )
    }else{
      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          console.log(res)
          this.getEmployees();
          form.reset();
        },
        err => console.log(err)
      );
    }
  }
  deleteEmployee(id:string){
    if(confirm('Are you sure yo want to delete it?')){
      this.employeeService.deleteEmployee(id).subscribe(
        res=>this.getEmployees(),
        err=>console.log(err)
      )
    }
  }
  editEmployee(employee:Employee){
    this.employeeService.selectedEmployee=employee;
  }
  resetForm(form:NgForm){
    form.reset();
  }
}
