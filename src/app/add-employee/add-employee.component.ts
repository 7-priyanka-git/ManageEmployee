import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

import { EmployeeStoreService } from '../employee-store.service';
import { SpaceNotAllowedValidator } from '../CustomValidators/Space-Not-Allowed-Validator';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  submitted: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private employeeStoreService: EmployeeStoreService) { }
  ngOnInit(): void {
    console.log("We entered the Add Employee Component");

    

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(3), SpaceNotAllowedValidator.cannotContainSpace]),
      username: new FormControl('', [Validators.required, SpaceNotAllowedValidator.cannotContainSpace]),
      email: new FormControl('', [Validators.required, SpaceNotAllowedValidator.cannotContainSpace]),
      address: new FormGroup({
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl(''),
      }),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      website: new FormControl(''),
      company: new FormControl(''),

    })
  }
  onSubmit(employeeData) {
    console.log('New Employee`s Data', employeeData);
    this.employeeStoreService.addEmployee(employeeData)
  }

  get f() {
    return this.form.controls;
  }
  
}
  

