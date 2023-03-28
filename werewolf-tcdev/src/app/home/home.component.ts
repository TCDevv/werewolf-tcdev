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
  @ViewChild('myinput') myInput: ElementRef;
  step: 1 | 2 = 1;
  numberOfParticipant: number = 3;
  listRole$: Observable<IRole[]>;
  errorMessage: string = '';

  constructor(
    private roleService: RoleService,
    private router: Router,
    public state: StateService
  ) {
    this.listRole$ = roleService.getListRole();
  }

  onNumberOfParticipantChanged(e: any) {
    if (
      e.target.value > this.state.listParticipant.length &&
      e.target.value <= 15
    ) {
      let newListParticipant = [];
      for (var i = this.state.listParticipant.length; i < e.target.value; i++) {
        let participant = {
          name: `Người chơi thứ ${i + 1}`,
          id: i + 1,
        };
        newListParticipant.push(participant);
      }
      this.state.listParticipant =
        this.state.listParticipant.concat(newListParticipant);
    } else if (
      e.target.value < this.state.listParticipant.length &&
      e.target.value >= 3
    ) {
      let temp = this.state.listParticipant.length - e.target.value;
      this.state.listParticipant.splice(e.target.value, temp + 1);
    }
  }

  onInputRoleChanged(e: any, role: any) {
    this.handleDistinctRole(role);
    if (e.target.value > 0) {
      this.handleAddRole(e.target.value, role);
    } else {
      role.selected = false;
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
      role.selected = true;
      role.quantity = 1;
      this.myInput.nativeElement.value = 1;
      this.handleAddRole(1, role);
    }
  }

  handleDistinctRole(role: any) {
    let hasThisRole = this.state.listSelectRole.findIndex((i) => i === role);
    if (hasThisRole)
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
        if (value === 1) this.state.listSelectRole.push(role);
        else return;
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
