import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { FabContainer } from 'ionic-angular';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  circolari = [];
  pagina: number = 1;

  constructor(public http: Http,public loadingController:LoadingController,private document: DocumentViewer,public transfer: FileTransfer,public file: File) { 
    this.http.get('https://itiscircolari.herokuapp.com/?page='+this.pagina).map(res => res.json()).subscribe(data => {
      this.circolari = data;      
      });
  }
  
 
  openUrl(circolare){
    let loading = this.loadingController.create({content : "Scaricando la circolare..."});
    loading.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: DocumentViewerOptions = {
      title: circolare.title+''
    }
		const url = circolare.url;

		fileTransfer.download(url, this.file.externalRootDirectory +'/Circolari/'+ circolare.title+'.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      loading.dismiss();
      this.document.viewDocument(this.file.externalRootDirectory +'/Circolari/'+ circolare.title+'.pdf', 'application/pdf', options)
		}, (error) => {
      loading.dismiss();
      console.log(error);
		});
  }

  load(number,fab: FabContainer) {
   this.pagina = number;
   console.log(fab);
   
   let loading = this.loadingController.create({content : "Sto caricando i dati..."});
   loading.present();
   this.http.get('https://itiscircolari.herokuapp.com/?page='+number).map(res => res.json()).subscribe(data => {
        this.circolari = data;
        fab.close();
        loading.dismiss();
        });
  }

}