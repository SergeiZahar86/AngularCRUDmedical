import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-modal-show-visit',
  templateUrl: './modal-show-visit.component.html',
  styleUrls: ['./modal-show-visit.component.scss']
})
export class ModalShowVisitComponent implements OnInit {
  public isModalAddVisitVisible: boolean = false;
  showAdd!: boolean;
  showUpdate!: boolean;
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() selectedUser: any;
  public selectedVisit: any;
  visitsData: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.getAllVisits();
  }

  public getAllVisits() {
    this.api.getVisits(this.selectedUser.id).subscribe(res => {
      this.visitsData = res;
    })
  }

  public confirm() {
    this.isConfirmed.emit(false);
  }

  public showModalAddVisit() {
    setTimeout(() => this.isModalAddVisitVisible = true, 200);
  }

  public sendVisits(row: any) {
    this.selectedVisit = row;
    this.showAdd = false;
    this.showUpdate = true;
  }

  public deleteVisit(row: any) {
    this.api.delVisit(row.id).subscribe(res => {
      alert("Визит удален");
      this.getAllVisits();
    })
  }

  public clickAddVisit() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  public closeModalAddVisit(isConfirmed: boolean) {
    this.isModalAddVisitVisible = isConfirmed;
  }

  public reload() {
    this.getAllVisits();
  }
}
