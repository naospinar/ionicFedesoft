
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserService } from '../../providers//user-service/user-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  users: any[] = [];
  constructor(
    public navCtrl: NavController,
    public userService: UserService
  ) {}
  ionViewDidLoad(){
    this.userService.getUsers()
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }
}


