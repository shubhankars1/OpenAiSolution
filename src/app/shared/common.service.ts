import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Accept": "application/json"
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  GetChatbotResponse(data: any) : Observable<any> {
    let apiURL = "http://localhost:5000/api/chat";

    return this.http.post(apiURL, data, httpOptions)
  }

  SendContentToChatbot(data: any) : Observable<any> {
    let apiURL = "http://localhost:5000/api/sendcontent";

    return this.http.post(apiURL, data, httpOptions)
  }
}
