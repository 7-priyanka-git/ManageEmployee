import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public dialModalRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  changePosition() {
        this.dialModalRef.updatePosition({ top: '50px', left: '50px' });
    }
}
