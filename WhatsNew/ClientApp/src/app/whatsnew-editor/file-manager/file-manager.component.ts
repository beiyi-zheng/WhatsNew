import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  @ViewChild("fileInput", { static: false })
  InputVar: ElementRef | undefined;

  public allowedFileExtensions: string = ".doc,.docx,.pdf";
  
  public filesToUpload: IFileUploadModel[] = [];
  public uploadedBy: string = "";
  

  constructor(
    public dialogRef: MatDialogRef<FileManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.uploadedBy = data.userId;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  getFileInput(eventTarget: any | undefined) {
    if (eventTarget && eventTarget.files) {
      var files: FileList = eventTarget.files;

      this.data.fileName = files[0].name;
      for (let i = 0; i < files.length; i++) {
        var fileToUpload: IFileUploadModel = { file: files[i], uploadedBy: this.uploadedBy, url:"" };
        this.filesToUpload.push(fileToUpload);
      }
    }
  }
  uploadFiles() {
    setTimeout(() => {
      this.filesToUpload[0].url = "https://dv01.acm.health/professional/NAS/Common/CurrentNewsItems/NewsItems/Care%20Management%2022.2.1%20Release%20Notes.pdf";
      this.filesToUpload[1].url = "https://dv01.acm.health/professional/NAS/Common/CurrentNewsItems/NewsItems/Referral%20Management%2022.2.1%20Release%20Notes.pdf";

    });
  }
  openUrl(url: string) {
    window.open(url, "_blank");
  }
}

interface IFileUploadModel {
  file: File,
  uploadedBy: string,
  url:string
}

export interface DialogData {
  userId: string,
  fileName: string
}
