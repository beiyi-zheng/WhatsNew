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
    var savedFiles = localStorage.getItem("savedFiles");

    if (savedFiles != null) {
      
      this.filesToUpload = JSON.parse(savedFiles);
    }
    
  }

  getFileInput(eventTarget: any | undefined) {
    if (eventTarget && eventTarget.files) {
      var files: FileList = eventTarget.files;

      setTimeout(() => {
        for (let i = 0; i < files.length; i++) {
          if (!this.filesToUpload.some(x => x.file.name === files[i].name)) {
            var fileToUpload: IFileUploadModel = { file: files[i], name: files[i].name, uploadedBy: this.uploadedBy, url: this.fileBaseUrl + files[i].name };
            this.filesToUpload.push(fileToUpload);

          }
        }
        localStorage.setItem("savedFiles", JSON.stringify(this.filesToUpload));
      });

      
      
    }
  }

  removeFile(file: IFileUploadModel) {
    const index = this.filesToUpload.indexOf(file);
    setTimeout(() => {
      this.filesToUpload.splice(index, 1);

    });
  }

  openUrl(url: string) {
    window.open(url, "_blank");
  }
}

interface IFileUploadModel {
  file: File,
  name: string,
  uploadedBy: string,
  url:string
}

export interface DialogData {
  userId: string,
  fileName: string
}
