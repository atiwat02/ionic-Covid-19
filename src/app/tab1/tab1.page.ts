import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  showDate:string='';
  Confirmed :string='';
  NewConfirmed:string='';
  Recovered:string='';
  Hospitalized:string='';
  Deaths:string='';
  NewHospitalized:string='';
  NewRecovered:string='';
  NewDeaths:string='';



  constructor(public http:HttpClient , public loadingController:LoadingController){
    this.getData();
    
  }


  async getData(){

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: ' loading...',
      duration: 1000
    });
    await loading.present();

    
    this.http.get<any>('https://covid19.th-stat.com/api/open/today').
    subscribe(result=>{
      console.log(result);
      this.showDate = result.UpdateDate;
      this.Confirmed = result.Confirmed;
      this.NewConfirmed = result.NewConfirmed;
      this.Recovered = result.Recovered;
      this.Hospitalized = result.Hospitalized;
      this.Deaths = result.Deaths;
      this.NewHospitalized = result.NewHospitalized;
      this.NewRecovered = result.NewRecovered;
      this.NewDeaths = result.NewDeaths;
    });

    const { role, data} = await loading.onDidDismiss();
    
  }


}
