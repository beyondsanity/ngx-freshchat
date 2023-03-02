# NgxFreshchat

Angular Wrapper for [Freshchat](https://www.freshworks.com/live-chat-software/) js library. It requires Angular 6 or above.

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.officinedigitaliitaliane.it/"><img src="https://avatars3.githubusercontent.com/u/7868362?v=4" width="100px;" alt="Claudio Suardi"/><br /><sub><b>Claudio Suardi</b></sub></a><br /><a href="https://github.com/beyondsanity/ngx-freshchat/commits?author=beyondsanity" title="Code">💻</a> <a href="https://github.com/beyondsanity/ngx-freshchat/commits?author=beyondsanity" title="Documentation">📖</a> <a href="#review-beyondsanity" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.willpoulson.co.uk"><img src="https://avatars0.githubusercontent.com/u/12980659?v=4" width="100px;" alt="Will Poulson"/><br /><sub><b>Will Poulson</b></sub></a><br /><a href="https://github.com/beyondsanity/ngx-freshchat/commits?author=WillPoulson" title="Code">💻</a> <a href="https://github.com/beyondsanity/ngx-freshchat/commits?author=WillPoulson" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!