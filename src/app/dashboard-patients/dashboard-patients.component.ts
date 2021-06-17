import {
  Component, OnInit
} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PatientModel} from "./modal-add-patient/modal-add-patient.model";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent implements OnInit {
  public isModalDialogVisible: boolean = false;

  public selectedUser: any;
  formValue !: FormGroup;
  patientModelObl: PatientModel = new PatientModel();
  patientData !: any;
  constructor(private formbuilder: FormBuilder, private api : ApiService) {
  }

  getAllPatients(){
    this.api.getPatients().subscribe(res=>{
      this.patientData = res;
    })
  }


  public showDialog() {

    setTimeout(() => this.isModalDialogVisible = true, 1000);
    //this.isModalDialogVisible = true;
  }

  public closeModal(isConfirmed: boolean) {
    this.isModalDialogVisible = false;
  }

  ngOnInit(): void {
    this.getAllPatients();
  }


  reload(emitReload : boolean) {
    console.log(emitReload);
    this.getAllPatients();
  }

  deletePatient(row:any){
    this.api.delPatient(row.id).subscribe(res=>{
      alert("Пациент удален");
      this.getAllPatients();
    })
  }

  setPatient(row: any) {
    this.selectedUser = row;
    console.log("patient:  ",this.selectedUser);
  }
}
