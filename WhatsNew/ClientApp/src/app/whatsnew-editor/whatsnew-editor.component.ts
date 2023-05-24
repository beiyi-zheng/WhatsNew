import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators, Editor, Toolbar, toHTML } from 'ngx-editor';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@Component({
  selector: 'app-whatsnew-editor',
  styleUrls: ['whatsnew-editor.css'],
  templateUrl: './whatsnew-editor.component.html'
})
export class WhatsNewEditorComponent {
  public loginUser: string="jeff";
  public data: ContentViewModel[] = [];
  public editor: Editor = new Editor();
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public form = new FormGroup({
    editorContent: new FormControl(
      { value: '', disabled: false }
    ),
  });

  public item: ContentViewModel | undefined;
  public publishedItem: ContentViewModel | undefined;
  public showCode: boolean = false;
  public showItemCode: boolean = false;
  public itemHtml: string = "";
  public fileName: string = "";

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    var savedData = localStorage.getItem("savedData");

    if (savedData !== null) {
      this.data = JSON.parse(savedData);
      this.data.sort((a, b) => { return b.id - a.id; });

      this.item = this.getEditItem();

    } else {
      http.get<ContentViewModel[]>(baseUrl + 'whatsnew').subscribe(result => {
        this.data = result;
        this.data.sort((a, b) => { return b.id - a.id; });

        this.item = this.getEditItem();

        localStorage.setItem("savedData", JSON.stringify(result));
      }, error => console.error(error));
    }
    
  }

  getEditItem() {
    if (this.data.some(x => x.status === "Draft")) {
      return this.data.filter(x => x.status === "Draft")[0];
    } else {
      return this.copyItem(this.getLastPublished());
    }
  }
  showCopy() {
    return !(this.data.some(x => x.status === "Draft"));
  }
  
  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  editItem(itemToEdit: ContentViewModel) {
    
    if (itemToEdit.status === 'Draft') {
      this.item = itemToEdit;
    } else {
      this.publishedItem = itemToEdit;
    }
  }
  copyItem(itemToEdit: ContentViewModel) {
    let copy = Object.assign({}, itemToEdit);

    copy.status = "Draft";
    copy.author = this.loginUser;
    copy.id = 0;
    copy.name = "";

    this.item = copy;
    return copy;
  }
  save(item: ContentViewModel) {
    if (item.id === 0) {
      item.id = this.data.length + 1;
      this.data.push(item);
    }

    this.data.filter(x => x.id === item.id)[0].content = item.content;
    this.data.filter(x => x.id === item.id)[0].status = item.status;

   localStorage.setItem("savedData", JSON.stringify( this.data));
  }
  publish(item:ContentViewModel) {      
    item!.status = "Published";
    this.save(item);    
    this.copyItem(item);
  }
  reset(item: ContentViewModel) {
   
    const index = this.data.indexOf(item);

    // use splice to remove 1 item starting at the given index
    this.data.splice(index, 1);

    

    var published = this.getLastPublished();
    
    
    this.item = this.copyItem(published);
  }
  getLastPublished() {
    var sortedList = this.data.filter(x => x.status === "Published").sort((a, b) => { return b.id -a.id; });
   
    return sortedList[0];
  }

  editorChange(item:ContentViewModel) {
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(item.content, "text/html");
    this.itemHtml = oDOM.body.innerHTML;
  }

  codeChange(event: any) {
    console.log(event);
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FileUploaderComponent, {
      width: '600px',
      minHeight: '200px',
      data: { uploadedBy: this.loginUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      this.fileName = result;
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}



interface ContentViewModel {
  id: number;
  name: string;
  content: string;
  author: string;
  publishedDate: Date;
  status: string;
}
