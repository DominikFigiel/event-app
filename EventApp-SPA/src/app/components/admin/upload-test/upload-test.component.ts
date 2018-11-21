import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from 'src/app/services/fileUploader.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.css']
})

export class UploadTestComponent {

  constructor(private fileUploader: FileUploaderService, private alertify: AlertifyService) { }

  upload(files: any) {
    if (files.length > 0) {
      this.fileUploader.upload(files).subscribe(() => {
        this.alertify.success('Plik został wysłany.');
      }, error => {
        this.alertify.error('Nie udało się wysłać pliku.');
      });
    } else {
      this.alertify.error('Nie wybrałeś pliku.');
    }
  }

}
