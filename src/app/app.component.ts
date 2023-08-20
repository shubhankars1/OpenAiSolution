import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from './shared/common.service';
import { Editor, Toolbar } from 'ngx-editor';

interface Message {
  role: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'OpenAI Bot App';
  fileContent: string = '';
  newMessage: string = '';
  isOpen: boolean = false;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  messages: Message[] = [
    { role: 'system', content: 'Hello! How can I assist you today?' },
  ];
  userMessage: Message[] = [];


  constructor(
    private _commonService: CommonService
  ) {
    this.editor = new Editor();
  }

  ngOnInit(): void {}

  chooseFile() {
    const fileInput = document.getElementById('fileInput')!;
    fileInput.click();
  }

  public onChange(event : any): void {
    let fileList: FileList = event?.target?.files;
    let file = fileList[0];
    let fileReader: FileReader | any = new FileReader();
    fileReader.onloadend = () => {
      this.fileContent = fileReader.result;
      this.sendFileContentToChatbot(this.fileContent);
    }
    fileReader.readAsText(file);
  }

  sendFileContentToChatbot(content: any) {
    let params = {
      chats: content
    }
    this._commonService.SendContentToChatbot(params).subscribe((res)=> {
      alert('file content sent to chatbot');
    })
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ role: 'user', content: this.newMessage });
      this.userMessage.push({ role: 'user', content: this.newMessage });
      this.newMessage = '';

      let params = {
        chats: this.userMessage
      }

      this._commonService.GetChatbotResponse(params).subscribe((res)=> {
        this.messages.push(res.data[0]);
      })
    }

    // console.log(this.userMessage);
  }

  toggleChatbotPanel() {
    this.isOpen = !this.isOpen;
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
