import {Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientModel} from "./modal-add-patient.model";
import {ApiService} from "../../shared/api.service";

@Component({
  selector: 'app-modal-add-patient',
  templateUrl: './modal-add-patient.component.html',
  styleUrls: ['./modal-add-patient.component.scss']
})


export class ModalAddPatientComponent implements OnInit {
  @Input() selectedUser: any;
  @Input() showAdd: boolean | undefined;
  @Input() showUpdate: boolean | undefined;
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitReload: EventEmitter<any> = new EventEmitter<any>();
  formValue !: FormGroup;
  patientModelObl: PatientModel = new PatientModel();

  constructor(private formbuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      address: [''],
      phoneNumber: [''],
      date: [''],
      gender: new FormControl('', Validators.required),
      age: ['']
    });
    this.formValue.reset();
    if (this.showUpdate)
      this.onEdit(this.selectedUser);
  }

  public postPatientDatails() {
    this.patientModelObl.name = this.formValue.value.firstName;
    this.patientModelObl.surname = this.formValue.value.lastName;
    this.patientModelObl.middle_name = this.formValue.value.middleName;
    this.patientModelObl.gender = this.formValue.value.gender;
    this.patientModelObl.age = this.formValue.value.age;
    this.patientModelObl.birth = this.formValue.value.date;
    this.patientModelObl.address = this.formValue.value.address;
    this.patientModelObl.phoneNumber = this.formValue.value.phoneNumber;
    this.api.postPatients(this.patientModelObl).subscribe(res => {
        alert("Пациент успешно добавлен");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.setSelected();
        this.formValue.reset();
      },
      err => {
        alert("Что-то пошло нетак");
        this.formValue.reset();
      });
  }

  public close() {
    this.formValue.reset();
    this.isConfirmed.emit(false);
  }

  public setSelected() {
    this.emitReload.emit(true);
  }

  public changeGender($event: Event) {
    //console.log($event.target);
  }

  public onEdit(selectedUser: any) {
    this.formValue.controls['lastName'].setValue(this.selectedUser?.surname);
    this.formValue.controls['firstName'].setValue(this.selectedUser?.name);
    this.formValue.controls['middleName'].setValue(this.selectedUser?.middle_name);
    this.formValue.controls['address'].setValue(this.selectedUser?.address);
    this.formValue.controls['phoneNumber'].setValue(this.selectedUser?.phoneNumber);
    this.formValue.controls['age'].setValue(this.selectedUser?.age);
    this.formValue.controls['date'].setValue(this.selectedUser?.date);
    this.formValue.controls['gender'].setValue(this.selectedUser?.gender);
  }

  public updatePatientDatails() {
    this.patientModelObl.name = this.formValue.value.firstName;
    this.patientModelObl.surname = this.formValue.value.lastName;
    this.patientModelObl.middle_name = this.formValue.value.middleName;
    this.patientModelObl.gender = this.formValue.value.gender;
    this.patientModelObl.age = this.formValue.value.age;
    this.patientModelObl.birth = this.formValue.value.date;
    this.patientModelObl.address = this.formValue.value.address;
    this.patientModelObl.phoneNumber = this.formValue.value.phoneNumber;
    this.api.updatePatient(this.patientModelObl, this.selectedUser.id).subscribe(res => {
      alert("Пациент успешно добавлен");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.setSelected();
      this.formValue.reset()
    })
  }
}
