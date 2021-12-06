import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})export class NewsletterService {

  constructor(private http: HttpClient) {
  }

  addPushSubscriber(sub:any) {
    this.http.post('https://ep-angular-pwa-poc.herokuapp.com/notifications', {sub}).subscribe();
  }
}
