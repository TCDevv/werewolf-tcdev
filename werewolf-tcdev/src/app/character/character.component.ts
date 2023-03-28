import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICharacter } from 'src/shared/models/character.model';
import { StateService } from 'src/shared/service/state.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  currentCharacter: ICharacter;
  constructor(
    public state: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const zoomElement = document.querySelectorAll('.needZoom');
    if (zoomElement) {
      setTimeout(() => {
        zoomElement.forEach((i) => i.classList.add('scaled'));
      }, 6000);
    }
    if (this.state.listCharacter.length === 0) {
      this.router.navigate(['/']);
    } else {
      const id = +this.route.snapshot.paramMap.get('slug');
      this.currentCharacter = this.state.listCharacter.find((i) => i.id === id);
      this.currentCharacter.selected = true;
    }
  }
}
