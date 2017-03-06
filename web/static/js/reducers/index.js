import { combineReducers } from 'redux'
import game from './game'
import player from './player'

const asteroid = combineReducers({
  game,
  player
});

export default asteroid;
