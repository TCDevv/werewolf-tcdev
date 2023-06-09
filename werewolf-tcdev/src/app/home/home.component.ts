import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICharacter } from 'src/shared/models/character.model';
import { IRole } from 'src/shared/models/role.model';
import { RoleService } from 'src/shared/service/role.service';
import { StateService } from 'src/shared/service/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  wolfHowlAudio = new Audio('../../assets/audio/wolf-howling.mp3');
  step: 1 | 2 = 1;
  numberOfParticipant: number = 5;
  listRole$: Observable<IRole[]>;
  errorMessage: string = '';

  constructor(
    private roleService: RoleService,
    private router: Router,
    public state: StateService,
    private elemetRef: ElementRef
  ) {
    this.listRole$ = roleService.getListRole();
  }

  onNumberOfParticipantChanged(e: any) {
    this.handleChangeNumberOfParticipant(e.target.value);
  }

  handleChangeNumberOfParticipant(value) {
    if (value > this.state.listParticipant.length && value <= 15) {
      let newListParticipant = [];
      for (var i = this.state.listParticipant.length; i < value; i++) {
        let participant = {
          name: `Người chơi thứ ${i + 1}`,
          id: i + 1,
        };
        newListParticipant.push(participant);
      }
      this.state.listParticipant =
        this.state.listParticipant.concat(newListParticipant);
    } else if (value < this.state.listParticipant.length && value >= 5) {
      let temp = this.state.listParticipant.length - value;
      this.state.listParticipant.splice(value, temp + 1);
    }
  }

  increaseNumber() {
    if (this.numberOfParticipant < 15) this.numberOfParticipant += 1;
    this.handleChangeNumberOfParticipant(this.numberOfParticipant);
  }

  decreaseNumber() {
    if (this.numberOfParticipant > 5) this.numberOfParticipant -= 1;
    this.handleChangeNumberOfParticipant(this.numberOfParticipant);
  }

  onInputRoleChanged(e: any, role: any) {
    this.handleInputRoleChanged(e.target.value, role);
  }

  handleInputRoleChanged(value: any, role: any) {
    this.handleDistinctRole(role);
    if (value > 0) {
      this.handleAddRole(value, role);
    } else {
      role.selected = false;
    }
  }

  increaseRole(role: any) {
    if (role.quantity < 3) {
      role.quantity += 1;
      this.handleInputRoleChanged(role.quantity, role);
    }
  }

  decreaseRole(role: any) {
    if (role.quantity > 0) {
      role.quantity -= 1;
      this.handleInputRoleChanged(role.quantity, role);
    }
  }

  onSelectRole(role: any) {
    this.errorMessage = '';
    this.handleDistinctRole(role);
    if (role.selected) {
      role.selected = false;
      role.quantity = 0;
      this.handleRemoveRole(role);
    } else {
      if (role.id === 2 || role.id === 7)
        this.elemetRef.nativeElement.querySelector(
          `#role-${role.id}`
        ).value = 1;
      role.selected = true;
      role.quantity = 1;
      this.handleAddRole(1, role);
    }
  }

  handleDistinctRole(role: any) {
    let hasThisRole = this.state.listSelectRole.findIndex((i) => i === role);
    if (hasThisRole !== -1)
      this.state.listSelectRole = this.state.listSelectRole.filter(
        (i) => i !== role
      );
  }

  handleRemoveRole(role: any) {
    this.state.listSelectRole = this.state.listSelectRole.filter(
      (i) => i !== role
    );
  }

  handleAddRole(value: any, role: any) {
    switch (role.id) {
      case 1:
      case 3:
      case 4:
      case 5:
      case 6:
      case 8:
      case 9:
      case 10:
      case 11: {
        this.state.listSelectRole.push(role);
        break;
      }
      case 2:
      case 7: {
        if (value > 0 && value < 4) {
          let listWolf = [];
          for (let i = 0; i < value; i++) {
            listWolf.push(role);
          }
          this.state.listSelectRole =
            this.state.listSelectRole.concat(listWolf);
        } else return;
        break;
      }
      default:
        break;
    }
  }

  startGame() {
    let hasWolf = this.state.listSelectRole.findIndex(
      (i) => i.id === 1 || i.id === 2
    );
    if (hasWolf !== -1) {
      this.wolfHowlAudio.play();
      setTimeout(() => {
        this.wolfHowlAudio.pause();
      }, 5000);
      this.randomCharacter();
      this.router.navigate(['/select-random']);
    } else {
      this.errorMessage = 'Cần ít nhất 1 sói';
    }
  }

  randomCharacter() {
    this.state.listCharacter = [];
    const Arraylength = this.state.listSelectRole.length;
    const randomIndexList = [];

    do {
      const randomIndex = Math.floor(Math.random() * Arraylength);
      const index = randomIndexList.findIndex((i) => i === randomIndex);
      if (index === -1) randomIndexList.push(randomIndex);
    } while (randomIndexList.length !== Arraylength && Arraylength !== 0);

    for (let i = 0; i < Arraylength; i++) {
      let character: ICharacter = {
        id: i + 1,
        name: this.state.listParticipant[i].name,
        role: this.state.listSelectRole[randomIndexList[i]].name,
        image: this.state.listSelectRole[randomIndexList[i]].img,
        selected: false,
      };
      this.state.listCharacter.push(character);
    }
  }
}
