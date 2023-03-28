import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Howl } from 'howler';
import { StateService } from 'src/shared/service/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  sound = new Howl({
    src: ['../assets/audio/background_audio.mp3'],
    loop: true,
  });
  title = 'werewolf-one-night-tcdev';
  constructor(private router: Router, private state: StateService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'imperative') {
          switch (event.url) {
            case '/':
              this.state.navigateType = 'default';
              break;
            case '/select-random':
              this.state.navigateType = 'homeToRandom';
              break;
            case '/character':
              this.state.navigateType = 'randomToCharacter';
              break;
            default:
              break;
          }
        } else if (event.navigationTrigger === 'popstate') {
          switch (event.url) {
            case '/select-random':
              this.state.navigateType = 'characterToRandom';
              break;
            case '/character':
              this.state.navigateType = 'randomToCharacter';
              break;
            case '/':
              this.state.navigateType = 'randomToHome';
              break;
            default:
              break;
          }
        }
      }
    });
  }
  ngOnInit() {
    // this.sound.play();
  }
}
