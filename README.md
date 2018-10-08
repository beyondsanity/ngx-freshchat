# NgxFreshchat

Angular Wrapper for Freshchat js library. It requires Angular 6.

## Installation
Run ```npm install ngx-freshchat```.

Import the library inside your desired module:

```
@NgModule({
    imports: [
        ...
        NgxFreshChatModule
        ...
```

## Usage
Import the service and launch the init command:

```
constructor(private chat: NgxFreshChatService) {}

ngOnInit() {
    this.chat.init({
        token: YOUR_FC_TOKEN,
        host: YOUR_FC_URL
    })
    .subscribe(
        () => console.log('FreshChat is ready!')
    );
}

```

The library tries to mimic all the original properties and method names, but I made the methods respond with observables in order to allow checking the status of your requests.
For more info please refer to the [official documentation](https://developers.freshchat.com/).

NB: The methods from the "user" object are mapped directly in the service. (i.e. ```window.fcWidget.user.setProperties()``` from the js is mapped as ```this.chat.setUserProperties()``` )


Contributions are welcome.

