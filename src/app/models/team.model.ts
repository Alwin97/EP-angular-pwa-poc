import {User} from "./user.model";

export class Team {
  teamName?: string;
  trainer?: User[];
  player?: User[];
  _id?: string;

  constructor(team: Team) {
    this.teamName = team.teamName;
    this.trainer = team.trainer;
    this.player = team.player;
    this._id = team._id;
  }
}
