import {Component} from '@angular/core';
import {SwPush} from "@angular/service-worker";
import {NewsletterService} from "./services/newsletter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa-poc';

  readonly VAPID_PUBLIC_KEY = 'BK50oaFrXUMC5p9jknpbzY7tCWuwGkAu6eQYe-UNDuTgmdEHQYiJCVHBuQY21_KpO80ctgvW3Fq_qgB_gl_EDR0';

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({serverPublicKey: this.VAPID_PUBLIC_KEY})
      .then(sub => {
        this.newsletterService.addPushSubscriber(sub);
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
