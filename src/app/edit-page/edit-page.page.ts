import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.page.html',
  styleUrls: ['./edit-page.page.scss'],
})
export class EditPagePage implements OnInit {


post = {}  as  Post;
id:any;


  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
    
  ) { 
    this.id = this.actRoute.paramMap.get("id");  
  }

  ngOnInit() {
    this.getPostById(this.id);
   }

  async getPostById(id:string){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present(); 

    this.firestore.doc("posts/"+ id )
    .valueChanges()
    .subscribe(data=> {
      this.post.title = data["title"];
      this.post.detail = data["detail"];
      
    });
    (await loader).dismiss();
  }


  async updatePost(post:Post){

    if (this.formValidation()){

      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present(); 
      try{
        await this.firestore
            .doc('posts/'+ this.id).update(post);
            
  
  
                
              
  
      }catch(e){
          this.showToast;
      }
      (await loader).dismiss()
      this.navCtrl.navigateRoot("home");

    }
  }

    formValidation(){
      if(!this.post.title){
        this.showToast("Enter title");
        return false;
  
      }
      if(!this.post.detail){
        this.showToast("Enter detail");
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
