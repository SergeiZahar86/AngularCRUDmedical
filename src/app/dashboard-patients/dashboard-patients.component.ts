import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PatientModel} from "./modal-add-patient/modal-add-patient.model";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})

export class DashboardPatientsComponent implements OnInit {
  public isModalPatientVisible: boolean = false;
  public isModalVisitsVisible: boolean = false;
  showAdd!: boolean;
  showUpdate!: boolean;
  public selectedUser: any;
  formValue !: FormGroup;
  patientModelObl: PatientModel = new PatientModel();
  patientData !: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.api.getPatients().subscribe(res => {
      this.patientData = res;
    })
  }

  public showModalAddPatients() {
    setTimeout(() => this.isModalPatientVisible = true, 200);
  }

  public closeModalPatients(isConfirmed: boolean) {
    this.isModalPatientVisible = false;
  }

  public closeModalVisits(isConfirmed: boolean) {
    this.isModalVisitsVisible = isConfirmed;
  }

  reload(emitReload: boolean) {
    //console.log(emitReload);
    this.getAllPatients();
  }

  deletePatient(row: any) {
    this.api.delPatient(row.id).subscribe(res => {
      alert("Пациент удален");
      this.getAllPatients();
    })
  }

  sendPatient(row: any) {
    this.selectedUser = row;
    console.log("patient:  ", this.selectedUser);
    this.showAdd = false;
    this.showUpdate = true;
  }

  clickAddPatient() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  showModalVisits() {
    setTimeout(() => this.isModalVisitsVisible = true, 200);
  }

  sendVisits(row: any) {
    this.selectedUser = row;
  }
}
