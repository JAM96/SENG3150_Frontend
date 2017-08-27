import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'; 

@Injectable()
export class EmailService {

  constructor(private http: Http) {}
  
  sendEmail(usercreds) {
     var headers = new Headers();
        var emailid = usercreds.email;
        
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        

        this.http.post('http://localhost:4200/sendmail', emailid, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                console.log('mail sent');
            }
        })
    }
  }
