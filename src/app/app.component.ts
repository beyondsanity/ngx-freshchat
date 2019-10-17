import { Component, OnInit } from '@angular/core';
import { NgxFreshChatService } from 'projects/ngx-freshchat-lib/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ngx-freshchat Sample';

  constructor(private chat: NgxFreshChatService) {}

  ngOnInit(): void {
    /* this.chat.init({
      token: 'YOUR_FC_TOKEN',
      host: 'YOUR_FC_URL'
    })
    .subscribe(
        () => console.log('FreshChat is ready!')
    ); */
  }

}
