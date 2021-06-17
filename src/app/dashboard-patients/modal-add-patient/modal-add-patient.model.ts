import {DatePipe} from "@angular/common";

export class PatientModel{
  name: string = "";
  surname: string="";
  middle_name: string = "";
  gender: string = "";
  birth: DatePipe = new DatePipe('');
  address: string = "";
  phoneNumber: string = "";
  age: number = 0;
}
