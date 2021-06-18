import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VisitModel} from "../modal-show-visit.model";
import {ApiService} from "../../../shared/api.service";

@Component({
  selector: 'app-modal-add-visit',
  templateUrl: './modal-add-visit.component.html',
  styleUrls: ['./modal-add-visit.component.scss']
})
export class ModalAddVisitComponent implements OnInit {
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitReload: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedVisit: any;
  @Input() selectedUser: any;
  @Input() showAdd: boolean | undefined;
  @Input() showUpdate: boolean | undefined;
  formValue !: FormGroup;
  visitModelObl: VisitModel = new VisitModel();


  constructor(private formbuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      diagnosis: [''],
      date: [''],
      type: new FormControl('', Validators.required)
    });
    this.formValue.reset();
    if (this.showUpdate)
      this.onEdit(this.selectedVisit);
  }

  onEdit(selectedVisit: any) {
    this.formValue.controls['diagnosis'].setValue(this.selectedVisit?.diagnosis);
    this.formValue.controls['date'].setValue(this.selectedVisit?.date);
    this.formValue.controls['type'].setValue(this.selectedVisit?.type);
  }

  updateVisitDatails() {
    this.visitModelObl.date = this.formValue.value.date;
    this.visitModelObl.type = this.formValue.value.type;
    this.visitModelObl.diagnosis = this.formValue.value.diagnosis;
    this.visitModelObl.patientsInfoKey = this.selectedVisit.patientsInfoKey;
    this.api.updateVisit(this.visitModelObl, this.selectedVisit.id).subscribe(res => {
      alert("Визит успешно добавлен");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.setSelected();
      this.formValue.reset()
    })
  }

  postVisitDatails() {
    this.visitModelObl.date = this.formValue.value.date;
    this.visitModelObl.type = this.formValue.value.type;
    this.visitModelObl.diagnosis = this.formValue.value.diagnosis;
    this.visitModelObl.patientsInfoKey = this.selectedUser.id;
    this.api.postVisit(this.visitModelObl, this.selectedUser.id).subscribe(res => {
        alert("Визит успешно добавлен");
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

  close() {
    this.isConfirmed.emit(false);
  }

  changeType($event: Event) {
    //console.log($event.target);
  }

  public setSelected() {
    this.emitReload.emit(true);
  }
}
