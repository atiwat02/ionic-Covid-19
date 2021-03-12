import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  allData:any;
  updateData:string;

  constructor(public http:HttpClient ,public loadingController:LoadingController) {
    this.getData();
  }

  async getData(){

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: ' loading...',
      duration: 2000
    });
    await loading.present();
    this.http.get<any>('https://api.covid19api.com/summary').
    subscribe(result=>{
      console.log(result);
      this.allData = result.Countries;
      this.updateData = result.Date;
    });
  }

  filterData(ev: any){
    const val = ev.target.value;
    console.log(val);
    if(val && val.trim() !=''){
      this.allData = this.allData.filter((item)=>{
        return(item.Country.toLowerCase().indexOf(val.toLowerCase())
        > -1);
      });
    }else{
      this.getData();
    }
  }

}
