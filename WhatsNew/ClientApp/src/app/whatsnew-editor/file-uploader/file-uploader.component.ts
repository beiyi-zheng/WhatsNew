import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @ViewChild("fileInput", { static: false })
  InputVar: ElementRef | undefined;

  public allowedFileExtensions: string = ".doc,.docx,.pdf";
  
  public filesToUpload: IFileUploadModel[] = [];
  public uploadedBy: string = "";

  fileBaseUrl: string = "https://dv01.acm.health/professional/NAS/Common/CurrentNewsItems/NewsItems/";

  constructor(
    public dialogRef: MatDialogRef<FileUploaderComponent>,
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

  removeFile(file: IFileUploadModel) {
    const index = this.filesToUpload.indexOf(file);
    setTimeout(() => {
      this.filesToUpload.splice(index, 1);

    });
  }
  uploadFiles() {
    setTimeout(() => {
      for (let i = 0; i < this.filesToUpload.length; i++) {
        this.filesToUpload[i].url = this.fileBaseUrl + this.filesToUpload[i].file.name;
      }
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
