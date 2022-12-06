import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';

@Component({
  selector: 'app-ad-post',
  templateUrl: './ad-post.page.html',
  styleUrls: ['./ad-post.page.scss'],
})
export class AdPostPage implements OnInit {

  post={} as Post;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore

  ) { }

  ngOnInit() {}
 async createPost(post: Post){
  if (this.formValidation()){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present(); 
    
    try{
      await this.firestore
          .collection('posts')
          .add(post);


              
            

    }catch(e){
        this.showToast;
    }
    (await loader).dismiss()
    this.navCtrl.navigateRoot("home");
    
 }
}


 formValidation(){
  if(!this.post.title ){
    this.showToast("Enter email");
    return false;

  }
  if(!this.post.detail){
    this.showToast("Enter password");
    return false;
  }
  return true;
}


showToast(message: string) {
  this.toastCtrl.create({
    message: message,
    duration: 3000
  })
  .then(toastData => toastData.present())
}
}
