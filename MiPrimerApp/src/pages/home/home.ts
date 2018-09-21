import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CANCIONES } from "../../audios/data/data.canciones";
import { Cancion } from "../../audios/interfaces/cancion.interface";
import { Refresher, reorderArray }  from "ionic-angular";

"../../../../../Audios/audios/data.canciones";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  canciones:Cancion[] = [];
  Audio = new Audio();
  audioTiempo: any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController) {

    this.canciones = CANCIONES.slice(0);
        
  }
  reproducir( cancion:Cancion ){
    this.pausar_audio( cancion );
    if( cancion.reproduciendo ){
      cancion.reproduciendo = false;
      return;
    }
    this.Audio.src = cancion.audio;
    this.Audio.load();
    this.Audio.play();
    cancion.reproduciendo = true;
    this.audioTiempo = setTimeout( ()=> cancion.reproduciendo = false, 6 * 1000  );
  }
  
  private pausar_audio( cancionSel:Cancion ){
    clearTimeout( this.audioTiempo );
    this.Audio.pause();
    this.Audio.currentTime = 0;
    for(  let cancion of this.canciones ){
      if( cancion.nombre != cancionSel.nombre ){
        cancion.reproduciendo = false;
      }
    }
  }

    borrar_cancion( idx:number ){
    this.canciones.splice( idx, 1 );
  
  }
  recargar_canciones( refresher:Refresher ){
    setTimeout( ()=>{
          this.canciones = CANCIONES.slice(0);
          refresher.complete();
    },1500)  
  }
  reordenar_canciones( indices:any ){
    this.canciones = reorderArray( this.canciones, indices );

  }

}
