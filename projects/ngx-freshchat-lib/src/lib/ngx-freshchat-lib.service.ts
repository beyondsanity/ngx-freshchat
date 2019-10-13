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

  /**
   * Initializes the Freshchat Widget.
   * @param data The Freshchat init object.
   * @returns An Observable which emits when the widget has loaded.
   * @author beyondsanity
   */
  init(data: FCInitObject): Observable<any> {
    return this.loadScript('https://wchat.freshchat.com/js/widget.js')
      .pipe(
        first(),
        flatMap( res => this.initWidget(data))
      );
  }

  private initWidget(data): Observable<any> {
    return Observable.create( observer => {
      this.getWidget().on('widget:loaded', res => observer.next(res) );
      this.getWidget().init(data);
    });
  }

  /**
   * Gets the current Freshchat user.
   * @returns An Observable which emits with the current user.
   * @author beyondsanity
   */
  getUser(): Observable<any> {
    return Observable.create( observer => {
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

  /**
   * Sets the current Freshchat users properties
   * @param user The new properties for the user.
   * @returns An Observable which emits after the user has been updated.
   * @author beyondsanity
   */
  setUserProperties(user: FCUser): Observable<any> {
    return Observable.create( observer => {
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

  /**
   * Updates the current Freshchat user.
   * @param user The new properties to update the user with.
   * @returns An Observable which emits when the user has been updated.
   * @author beyondsanity
   */
  updateUser(user: FCUser) {
    this.getWidget().user.update(user);
  }


  /**
   * Clears the current Freshchat user.
   * @returns An Observable which emits when the user has been cleared.
   * @author beyondsanity
   */
  clearUser(): Observable<any> {
    return Observable.create( observer => {
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

  /**
   * Tracks an event against the current user.
   * @param eventName The event name to track.
   * @param payload Optional - The payload to pass to the event.
   * @author beyondsanity
   */
  track(eventName: string, payload?: any) {
    this.getWidget().track(eventName, payload);
  }

  /**
   * Sets the tags against the current user
   * @param tags An array of tags to set.
   * @author beyondsanity
   */
  setTags(tags: [string]) {
    this.getWidget().setTags(tags);
  }

  /**
   * Sets the locale for the current user
   * @param locale The locale.
   * @author beyondsanity
   */
  setLocale(locale: string) {
    this.getWidget().setLocale(locale);
  }

  /**
   * Destroys the current Freshchat widget.
   * @author beyondsanity
   */
  destroy() {
    this.getWidget().destroy();
  }

  /**
   * Checks if the widget has been initialized
   * @returns A boolean of if the widget has been initialized
   * @author beyondsanity
   */
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

