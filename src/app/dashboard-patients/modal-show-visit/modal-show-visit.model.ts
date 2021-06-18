import {DatePipe} from "@angular/common";

export class VisitModel{
  date: DatePipe = new DatePipe('');
  type: string = "";
  diagnosis: string = "";
  patientsInfoKey: number = 0;
}
