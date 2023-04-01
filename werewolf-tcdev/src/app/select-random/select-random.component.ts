import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/shared/service/role.service';
import { StateService } from 'src/shared/service/state.service';

@Component({
  selector: 'app-select-random',
  templateUrl: './select-random.component.html',
  styleUrls: ['./select-random.component.scss'],
})
export class SelectRandomComponent implements OnInit {
  constructor(
    public state: StateService,
    private router: Router,
    private role: RoleService
  ) {}
  ngOnInit(): void {
    if (
      this.state.listSelectRole.length === 0 ||
      this.state.listParticipant.length === 0
    ) {
      this.router.navigate(['/']);
    }
  }

  endGame() {
    this.router.navigate(['/']).then((res) => {
      this.state.listCharacter = [];
      this.state.listSelectRole = [];
      this.state.listParticipant = [
        { name: 'Người chơi thứ 1', id: 1 },
        { name: 'Người chơi thứ 2', id: 2 },
        { name: 'Người chơi thứ 3', id: 3 },
        { name: 'Người chơi thứ 4', id: 4 },
        { name: 'Người chơi thứ 5', id: 5 },
      ];
      this.role.disSelect();
    });
  }
}
