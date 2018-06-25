import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage.model';
import * as firebase from 'firebase';

@Injectable()
export class ImageService {
  private uid: string;
  fileUploads: FirebaseListObservable<any>;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  getImages(): any {
    // return firebase.storage().ref().child('/uploads/Jellyfish.jpg').getDownloadURL();
    // return this.db.list('/uploads').valueChanges();
  
  }

  getImage(key: string) {
    return firebase.database().ref('uploads/' + key).once('value')
    .then((snap) => snap.val());
  }
}