import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators, Editor, Toolbar } from 'ngx-editor';

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

  constructor(private sanitizer: DomSanitizer, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ContentViewModel[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.data = result;

      this.item = this.getEditItem();

      
    }, error => console.error(error));
  }

  getEditItem() {
    if (this.data.some(x => x.status === "Draft")) {
      return this.data.filter(x => x.status === "Draft")[0];
    } else {
      return this.copyItem(this.data[0]);
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
  save() { }
  publish(item:ContentViewModel) {      
    
    item!.status = "Published";
    if (item.id === 0) {
      item.id = this.data.length;
      this.data.push(item);
    }

    this.data.filter(x => x.id === item.id)[0].status = "Published";
    
    this.copyItem(item);
  }
  reset(item: ContentViewModel) {
   
    const index = this.data.indexOf(item);

    // use splice to remove 1 item starting at the given index
    this.data.splice(index, 1);

    

    var published = this.data.filter(x => x.status === "Published")[0];
    
    
    this.item = this.copyItem(published);
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
