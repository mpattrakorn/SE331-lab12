import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Student} from '../students/student';
import {Router} from "@angular/router";
import {StudentsDataService} from "../service/students-data.service";
import {Http, Headers, Response, RequestOptions,URLSearchParams} from '@angular/http';
import {Observable} from "rxjs";
import {AuthenticationService} from "../service/authentication.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  student: any = {};
  user:any = {};
  roles:Array<string> = ['Admin','User'];
  private authenticationService: AuthenticationService;

  private headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  public refreshValue(value:any):void {
      this.user.role = value.text;
  }


  constructor(private studentDataService: StudentsDataService, private router: Router, private http: Http) {
  };

  ngOnInit() {
    this.student = new Student();
  }

  addStudentWihtAuthen(student:Student,file:any,user:any) {
    let formData = new FormData();
    let fileName: string;
    formData.append('file', file);
    let header = new Headers({
      'Authorization': 'Bearer ' +
      this.authenticationService.getToken()
    });
    let options = new RequestOptions({headers: header});
    return this.http.post('http://localhost:8080/student/image',
      formData, options)
      .flatMap(filename => {
        student.image = filename.text();
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: this.headers});
        user.student = student;
        let body = JSON.stringify(user);
        return this.http.post('http://localhost:8080/studentAuthen', body,
          options)
          .map(res => {
            return res.json()
          })
          .catch((error: any) => {
            return Observable.throw(new Error(error.status))
          })
      })
  }

    upQuantity(student: Student) {
    student.penAmount++;
  }

  downQuantity(student: Student) {
    if (student.penAmount > 0)
      student.penAmount--;
  }
  @ViewChild('fileInput') inputEl: ElementRef;
  addStudent(student: Student) {
    let result: Student;
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;


    this.studentDataService.addStudentWihtAuthen(student,inputEl.files.item(0),this.user)
      .subscribe(resultStudent => {
        result = resultStudent
        if (result != null){
          this.router.navigate(['/list']);
        }else{
          alert("Error in adding the student");
        }
      });
  }

  onFileChange(event, student: any) {
    var filename = event.target.files[0].name;
    console.log(filename);
    student.image = filename;
    student.file = event.target.files[0];
  }

}
