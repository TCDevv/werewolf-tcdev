import { Injectable } from '@angular/core';
import { ICharacter } from '../models/character.model';
import { IParticipant } from '../models/participant.model';
import { IRole } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  backgroundSound = new Audio('../assets/audio/background_audio.mp3');
  listSelectRole: IRole[] = [];
  listParticipant: IParticipant[] = [
    { name: 'Người chơi thứ 1', id: 1 },
    { name: 'Người chơi thứ 2', id: 2 },
    { name: 'Người chơi thứ 3', id: 3 },
    { name: 'Người chơi thứ 4', id: 4 },
    { name: 'Người chơi thứ 5', id: 5 },
  ];
  listCharacter: ICharacter[] = [];
  navigateType:
    | 'default'
    | 'homeToRandom'
    | 'randomToHome'
    | 'randomToCharacter'
    | 'characterToRandom'
    | 'welcome' = 'default';
  constructor() {}
}
