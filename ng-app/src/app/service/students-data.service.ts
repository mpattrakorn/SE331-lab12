import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Student} from '../students/student';
import 'rxjs/add/operator/map';
@Injectable()
export class StudentsDataService {
  constructor(private http: Http){}
  getStudentsData(){
    let studentArray:Student[];
    return this.http.get('app/data/people.json')
      .map(res => res.json().students);
  }

  addStudentWihtAuthen(student:Student,imageFile:any,user:any){
     return null;
  }

  getStudent(id:number){
   return null;
  }

  addStudent(student:Student,imageFile:any){
    return null;
  }

  findStudent(search:string){
    return null;
  }
}
