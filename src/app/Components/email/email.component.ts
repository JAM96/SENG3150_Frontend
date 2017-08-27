import {Component} from '@angular/core';
import {HttpService} from '../../Services/http/http.service';
import {HttpModule} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'emailComponent',
  templateUrl: 'email.component.html',
  providers: [HttpService]
})
export class EmailComponent {
  newEmail = {
    email: '',
  }
  
    constructor(
        private _httpService: HttpService
    ){}

    sendDataToServer(dataFromForm: any){
        this._httpService.sendData(dataFromForm).subscribe(
            response => console.log(response), //success
            error => console.log(error), //error
            () => console.log('completed')) //complete
    }
 }




export class ViewVouchersComponent {
    

}