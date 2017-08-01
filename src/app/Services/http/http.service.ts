import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpService{
    //URL which handles JSON encoded data (I'm not sure how to use this. Maybe the localhost URL of the backend server.):
    private _url: string = "http://example.com";

    //Injecting the Http service:
    constructor(private _http: Http){}

    sendData(data: any): Observable<Object>{
        //Convert the passed in data into a JSON string:
        let encoded_data = JSON.stringify({data});
        let headers = new Headers({'Content-type':'application/json;charset=utf-8'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(encoded_data, this._url, options).map(
            (res: Response) => res.json() || {}
        );
    }
}