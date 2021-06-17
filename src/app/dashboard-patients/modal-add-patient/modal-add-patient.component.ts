
import {Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientModel} from "./modal-add-patient.model";
import {ApiService} from "../../shared/api.service";
import {DashboardPatientsComponent} from "../dashboard-patients.component";

@Component({
  selector: 'app-modal-add-patient',
  templateUrl: './modal-add-patient.component.html',
  styleUrls: ['./modal-add-patient.component.scss']
})


export class ModalAddPatientComponent implements OnInit{
  //@Input() header: string;
  //@Input() description: string;
  //tablePatient : DashboardPatientsComponent = new DashboardPatientsComponent();
  //@Output() userSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedUser: any;


  formValue !: FormGroup;
  patientModelObl: PatientModel = new PatientModel();
  constructor(private formbuilder: FormBuilder, private api : ApiService) {
  }

  ngOnInit(): void{
    console.log("selectedUser:   ", this.selectedUser)
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      middleName:[''],
      address:[''],
      phonenumber:[''],
      date:[''],
      gender:new FormControl('', Validators.required),
      age: ['']
    });
    this.onEdit(this.selectedUser);
    //DashboardPatientsComponent.getAllPatients();
  }
  private log(data: number): void {
    console.log(data);
  }
  postPatientDatails(){{
    this.patientModelObl.name = this.formValue.value.firstName;
    this.patientModelObl.surname = this.formValue.value.lastName;
    this.patientModelObl.middle_name = this.formValue.value.middleName;
    this.patientModelObl.gender = this.formValue.value.gender;
    this.patientModelObl.age = this.formValue.value.age;
    this.patientModelObl.birth = this.formValue.value.date;
    this.patientModelObl.address = this.formValue.value.address;
    this.patientModelObl.phoneNumber = this.formValue.value.phonenumber;

    this.api.postPatients(this.patientModelObl).subscribe(res=>{
      console.log("patient:  ",res);
      alert("Пациент успешно добавлен");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.setSelected();
      this.formValue.reset();
    },
      err=>{
        console.log("age :  ",this.patientModelObl.age);
        console.log("name :  ",this.patientModelObl.name);
        console.log("surname :  ",this.patientModelObl.surname);
        console.log("middle_name :  ",this.patientModelObl.middle_name);
        console.log("gender :  ",this.patientModelObl.gender);
        console.log("address :  ",this.patientModelObl.address);
        console.log("birth :  ",this.patientModelObl.birth);
        console.log("phoneNumber :  ",this.patientModelObl.phoneNumber);
      alert("Что-то пошло нетак");
        this.formValue.reset();
      });
  }}


  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirm() {
    this.isConfirmed.emit(true);
  }

  public close() {
    this.isConfirmed.emit(false);
    //this.setSelected();
  }

  @Output() emitReload: EventEmitter<any> = new EventEmitter<any>();
  public setSelected(){
    this.emitReload.emit(true);
  }

  changeGender($event: Event) {
    console.log($event.target);
  }

  onEdit(selectedUser2222: any ){
    console.log("selectedUser22222:  ", selectedUser2222);
    this.formValue.controls['lastName'].setValue(this.selectedUser?.surname);
    this.formValue.controls['firstName'].setValue(this.selectedUser?.name);
    this.formValue.controls['middleName'].setValue(this.selectedUser?.middle_name);
    this.formValue.controls['address'].setValue(this.selectedUser?.address);
    this.formValue.controls['phonenumber'].setValue(this.selectedUser?.phoneNumber);
    this.formValue.controls['age'].setValue(this.selectedUser?.age);
    this.formValue.controls['date'].setValue(this.selectedUser?.date);
    this.formValue.controls['gender'].setValue(this.selectedUser?.gender);
  }

  updatePatientDatails() {

    this.patientModelObl.name = this.formValue.value.firstName;
    this.patientModelObl.surname = this.formValue.value.lastName;
    this.patientModelObl.middle_name = this.formValue.value.middleName;
    this.patientModelObl.gender = this.formValue.value.gender;
    this.patientModelObl.age = this.formValue.value.age;
    this.patientModelObl.birth = this.formValue.value.date;
    this.patientModelObl.address = this.formValue.value.address;
    this.patientModelObl.phoneNumber = this.formValue.value.phonenumber;
    this.api.updatePatient(this.patientModelObl, this.selectedUser.id).subscribe(res=>{
    console.log("patient333:  ",res);
      console.log("selectedUser.id:  ",this.selectedUser.id);
      console.log("this.patientModelObl:  ",this.patientModelObl);
    alert("Пациент успешно добавлен");
    let ref = document.getElementById('cancel');
    ref?.click();
    this.setSelected();
    this.formValue.reset()
    })
  }
}
