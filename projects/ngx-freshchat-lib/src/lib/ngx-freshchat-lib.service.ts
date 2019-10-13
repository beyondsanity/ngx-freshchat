import { Injectable } from '@angular/core';
import { FCInitObject, FCUser } from './models';
import { Observable, Observer } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';

interface FCWidget {
  init;
  user;
  track;
  setTags;
  setLocale;
  destroy;
  isInitialized;
  on;
}

@Injectable({
  providedIn: 'root'
})
export class NgxFreshChatService {

  constructor() {}

  init(data: FCInitObject): Observable<any> {
    return this.loadScript('https://wchat.freshchat.com/js/widget.js')
      .pipe(
        first(),
        flatMap( res => this.initWidget(data))
      );
  }

  private initWidget(data): Observable<any> {
    return new Observable( observer => {
      this.getWidget().on('widget:loaded', res => observer.next(res) );
      this.getWidget().init(data);
    });
  }

  getUser(): Observable<any> {
    return new Observable( observer => {
      this.getWidget().user.get(
        res => {
          if (res.status !== 200) {
            observer.error(res.status);
          } else {
            observer.next(res.data);
          }
        }
      );
    });
  }

  setUserProperties(user: FCUser): Observable<any> {
    return new Observable( observer => {
      this.getWidget().user.setProperties(user,
        res => {
          if (res.status !== 200) {
            observer.error(res.status);
          } else {
            observer.next(res.data || null);
          }
        }
      );
    });
  }

  updateUser(user: FCUser) {
    this.getWidget().user.update(user);
  }

  clearUser(): Observable<any> {
    return new Observable( observer => {
      this.getWidget().user.clear(
        res => {
          if (res.status !== 200) {
            observer.error(res.status);
          } else {
            observer.next(res.data || null);
          }
        }
      );
    });
  }

  track(eventName: string, payload?: any) {
    this.getWidget().track(eventName, payload);
  }

  setTags(tags: [string]) {
    this.getWidget().setTags(tags);
  }

  setLocale(locale: string) {
    this.getWidget().setLocale(locale);
  }

  destroy() {
    this.getWidget().destroy();
  }

  isInitialized(): boolean {
    return this.getWidget().isInitialized();
  }

  private getWidget(): FCWidget {
    return (window as any).fcWidget;
  }

  private loadScript(src: string): Observable <any> {
    return new Observable<any>((observer: Observer<any>) => {
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.src = src;
      scriptElement.onload = () => {
          observer.next(src);
          observer.complete();
      };
      scriptElement.onerror = () => observer.error('Couldn\'t load ' + src);
      document.getElementsByTagName('body')[0].appendChild(scriptElement);
    });
  }

}

// TODO: events
// TODO: messenger API

