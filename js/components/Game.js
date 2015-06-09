import React from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import WinnerMessage from './WinnerMessage';
import ButtonGroup from './ButtonGroup';
import Player from '../lib/Player';
import { getScore } from '../lib/Board';

import { Stack, Map, List } from 'immutable';

import { createDispatcher, Provider } from 'redux';
import GameStore from '../stores/GameStore';

const dispatcher = createDispatcher(GameStore);

@provider(dispatcher)
export default React.createClass({
   propTypes: {
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired,
      board: React.PropTypes.instanceOf(List).isRequired,
      currentPlayer: React.PropTypes.number.isRequired
   },
   render() {
      const score = getScore(this.props.board);

      return (
         <div>
            <PlayerInfo currentPlayer={this.props.currentPlayer} score={score} />
            <WinnerMessage score={score} />
            <Board board={this.props.board} playerHint={this.props.playerHint} />
            <ButtonGroup score={score} boardHistory={this.props.boardHistory} />
         </div>
      );
   }
});
