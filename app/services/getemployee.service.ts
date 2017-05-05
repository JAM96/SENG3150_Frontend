import {Injectable} from "angular2/core";
import { Http, Response, Headers, RequestOptions } from "angular2/http";
import {Observable} from 'rxjs/Rx';
import {Employee} from '../models/employee';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class EmployeeService {
    // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
    private url = 'http://localhost:8080/getEmployee'; 
     
     // Fetch all existing comments
     getEmployee() : Observable<Employee[]>{
         // ...using get request
         return this.http.get(this.url)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

    //  // Add a new comment
    // addComment (body: Object): Observable<Comment[]> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.post(this.url, body, options) // ...using post request
    //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }   

    // // Update a comment
    // updateComment (body: Object): Observable<Comment[]> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.put(`${this.commentsUrl}/${body['id']}/`, body, options) // ...using put request
    //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }   
    // // Delete a comment
    // removeComment (id:string): Observable<Comment[]> {
    //     return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
    //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }   
}