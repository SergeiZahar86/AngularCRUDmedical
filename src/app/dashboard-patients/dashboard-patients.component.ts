import {
  Component
} from "@angular/core";

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent {
  public isModalDialogVisible: boolean = false;

  constructor() {
  }


  public showDialog() {
    this.isModalDialogVisible = true;
  }

  public closeModal(isConfirmed: boolean) {
    this.isModalDialogVisible = false;
  }
}
