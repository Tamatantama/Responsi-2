import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore 
  ) {}

  ionViewWillEnter(){
    this.getPosts();
  }

  async getPosts(){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();


    try{
this.firestore.collection("posts")
.snapshotchanges()
.subscribe(data => {
  this.posts = data.map(e =>{
    return{
      id:e.payload.doc.id,
      title: e.payload.doc.data("title"),
      details: e.payload.doc.data("details"),
    };
  });
});
(await loader).dismiss()

    }catch(e){
      this.showToast;

    }
  }

  async deletePost(id: string){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc("psts/" + id).delete();

    (await loader).dismiss(); 


  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present())
  }
}

