import { Component } from '@angular/core';
import { StateService } from 'src/shared/service/state.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(public readonly state: StateService) {}

  startGame() {
    this.state.backgroundSound.loop = true;
    this.state.backgroundSound.play();
  }
}
