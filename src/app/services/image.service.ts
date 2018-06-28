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
    return this.db.list('/uploads').snapshotChanges().map((action: any) => {
        return action.map((item) => {
          return {
            $key: item.payload.key,
            url: item.payload.val()
          };
        });
      });
  
  }

  getImage(key: string) {
    return firebase.database().ref('uploads/' + key).once('value')
    .then((snap) => snap.val());
  }
}