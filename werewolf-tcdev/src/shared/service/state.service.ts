import { Injectable } from '@angular/core';
import { ICharacter } from '../models/character.model';
import { IParticipant } from '../models/participant.model';
import { IRole } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  listSelectRole: IRole[] = [];
  listParticipant: IParticipant[] = [
    { name: 'Người chơi thứ 1', id: 1 },
    { name: 'Người chơi thứ 2', id: 2 },
    { name: 'Người chơi thứ 3', id: 3 },
  ];
  listCharacter: ICharacter[] = [];
  navigateType:
    | 'default'
    | 'homeToRandom'
    | 'randomToHome'
    | 'randomToCharacter'
    | 'characterToRandom' = 'default';
  constructor() {}
}
