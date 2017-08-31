import { Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';

import {ImageService} from '../Services/image.service';
import {Image} from '../Objects/Image';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private loadingMessage : string = "";
  private error : boolean = false;

  constructor(
    private auth : AuthService,
    private imageService : ImageService,
  ) {
    auth.handleAuthentication();
    this.fetchImages();
  }

  private fetchImages() : void {
    console.log("fetching the images from the app.component");
    this.loadingMessage = "Loading images...";

    // this.imageService.fetchImages().subscribe((image : Image[]) => {

    // this.imageService.setData(image);
    // this.fetchAccommodation();

    // console.log("Images have loaded");
    // console.log(this.imageService.getData());
    // // this.imageService.setLoaded(true);
    // });
    this.imageService.testImages()
      .subscribe(
        res => {
          this.imageService.setData(res);
          this.fetchAccommodation();
          console.log("Images have loaded");
          console.log(this.imageService.getData());
          this.imageService.setLoaded(true);
        },
        err => {
          console.log("Connection Failed");
          this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
          this.error = true;
        }
      );
}

  fetchAccommodation(){
    this.loadingMessage = "Loading Accommodation";

    setTimeout(() => {
      this.imageService.setLoaded(true);
    }, 2000);
  }
}
