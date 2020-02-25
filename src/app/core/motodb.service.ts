import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class MotodbService {

  motos: any;
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Moto(record) {
    return this.firestore.collection('motos').add(record);
  }
  read_Motos() {
    return this.firestore.collection('motos').snapshotChanges();
  }
  update_Moto(recordID, record) {
    this.firestore.doc('motos/' + recordID).update(record);
  }
  delete_Moto(record_id) {
    this.firestore.doc('motos/' + record_id).delete();
  }
}