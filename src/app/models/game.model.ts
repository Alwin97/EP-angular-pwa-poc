import {MyEvent} from "./event.model";
import {Team} from "./team.model";
import {User} from "./user.model";

export class Game extends MyEvent {
  homeTeam?: Team;
  awayTeam?: Team;
  referee?: User;

  constructor(game: Game) {
    super(game);
    this.homeTeam = game.homeTeam;
    this.awayTeam = game.awayTeam;
    this.referee = game.referee;
  }
}
