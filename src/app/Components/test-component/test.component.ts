import {Component, OnInit, Pipe} from '@angular/core';
import {TestService} from './test.service';
import {Test} from './test';

@Component({
    moduleId: module.id,
    selector: 'test',
    templateUrl: 'test.component.html',
    providers: [
        TestService
    ]
})

export class TestComponent implements OnInit{
    constructor(private testService : TestService) {}

    public test : Test[];
    //public test : Test[];

    ngOnInit() {
        this.loadTest();
        //this.loadTest();
        //this.loadMock();
    }

    public data : Array<any>;

    loadTest() : void{
        this.testService.getTest()
            .subscribe(
                test => this.test = test
                , err => {console.log(err);})
    }

    loadMock() {
        this.testService.getMockTest()
            .then((test: Test[]) => this.test = test);
    }
}