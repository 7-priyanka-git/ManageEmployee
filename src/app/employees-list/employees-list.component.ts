import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { EmployeeStoreService } from '../employee-store.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  constructor(private employeeStoreService: EmployeeStoreService,
              private router: Router,
              public dialog: MatDialog
    ) { }

  employees : any;
  title = 'angular-confirmation-dialog';

  ngOnInit(): void {
    console.log("ngOnInit: Employee List Component");
    this._reloadAll();
  }

  _reloadAll() {
    this.employeeStoreService.employee$
    .subscribe(response => {
      this.employees = response;
    })
  }

  openDialog(employee): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: `Do you want to delete the user ${employee.name}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.employeeStoreService.deleteEmployee(employee.id)
        this.employeeStoreService.employee$
        .subscribe(data => this.employees= data);
      }
    });
  }

  addEmployee() {
    this.router.navigate(['/addEmployee']);
    this.employeeStoreService.employee$.subscribe(response => {
      this.employees = response;
    })
  }
}
