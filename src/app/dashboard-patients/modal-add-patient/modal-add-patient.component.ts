import {Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PatientModel} from "./modal-add-patient.model";

@Component({
  selector: 'app-modal-add-patient',
  templateUrl: './modal-add-patient.component.html',
  styleUrls: ['./modal-add-patient.component.scss']
})


export class ModalAddPatientComponent implements OnInit{
  //@Input() header: string;
  //@Input() description: string;
  formValue !: FormGroup;
  patientModelObl: PatientModel = new PatientModel();
  constructor(private formbuilder: FormBuilder) {
  }

  ngOnInit(): void{
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      middleName:[''],
      address:[''],
      phonenumber:[''],
      date:[''],
      gender:['']
    })
  }

  postPatientDatails(){{

  }}

  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirm() {
    this.isConfirmed.emit(true);
  }

  public close() {
    this.isConfirmed.emit(false);
  }


}
