import { Injectable } from '@angular/core';
import { IRole } from '../models/role.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly listRole: IRole[] = [
    {
      id: 1,
      name: 'Sói đầu đàn',
      selected: false,
      img: '../../assets/img/header_wolf.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 2,
      name: 'Sói',
      selected: false,
      img: '../../assets/img/wolf.png',
      max: 3,
      quantity: 0,
    },
    {
      id: 3,
      name: 'Bảo vệ',
      selected: false,
      img: '../../assets/img/gaurd.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 4,
      name: 'Tiên tri',
      selected: false,
      img: '../../assets/img/seer.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 5,
      name: 'Phù thủy',
      selected: false,
      img: '../../assets/img/witch.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 6,
      name: 'Thợ săn',
      selected: false,
      img: '../../assets/img/hunter.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 7,
      name: 'Dân lỏ',
      selected: false,
      img: '../../assets/img/farmer.png',
      max: 3,
      quantity: 0,
    },
    {
      id: 8,
      name: 'Chán đời',
      selected: false,
      img: '../../assets/img/joker.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 9,
      name: 'Bán sói',
      selected: false,
      img: '../../assets/img/saleman.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 10,
      name: 'Pháp sư câm',
      selected: false,
      img: '../../assets/img/spellcaster.png',
      max: 1,
      quantity: 0,
    },
    {
      id: 11,
      name: 'Cave',
      selected: false,
      img: '../../assets/img/prostitute.png',
      max: 1,
      quantity: 0,
    },
  ];
  constructor() {}

  getListRole(): Observable<IRole[]> {
    return of(this.listRole).pipe(delay(1000));
  }

  disSelect() {
    this.listRole.forEach((i) => {
      i.quantity = 0;
      i.selected = false;
    });
  }
}
