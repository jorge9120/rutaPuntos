import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  mapRef = null;
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  origin = {lat: 6.2562147, lng: -75.5776661};

  destination = {lat: 6.2592696, lng: -75.58587729999999};

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) {

  }

  ngOnInit() {
    this.loadMap();
    //this.addMaker(6.2562147,-75.5776661);
  }

  async loadMap() {


    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
  // create map
    this.map = new google.maps.Map(mapEle, {
    center: this.origin,
    zoom: 12
  });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
    mapEle.classList.add('show-map');
    this.calculateRoute();
   // this.addMaker(6.2562147, -75.5776661);
  });

  }
  //para agregar un punto de referencia en el mapa
  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: 'Hello World!'
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
    }


}
