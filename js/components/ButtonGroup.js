import React from 'react';
import Button from './Button';

import GameStore from '../stores/GameStore';
import isEndOfGame from '../lib/isEndOfGame';

import { Stack } from 'immutable';

export default React.createClass({
   propTypes: {
      score: React.PropTypes.shape({
         player1: React.PropTypes.number.isRequired,
         player2: React.PropTypes.number.isRequired
      }),
      boardHistory: React.PropTypes.instanceOf(Stack).isRequired
   },
   render() {
      const gameOver = isEndOfGame(this.props.score.player1, this.props.score.player2);
      const hasMoves = this.props.boardHistory.size > 1;
      const styles = {
         textAlign: 'center',
         marginTop: 30
      };

      return (
         <div style={styles}>
            <Button action={GameStore.switchPlayer} disabled={gameOver}>Pass</Button>
            <Button action={GameStore.undo} disabled={!hasMoves || gameOver}>Undo</Button>
            <Button action={GameStore.reset} disabled={!hasMoves}>Reset</Button>
         </div>
      );
   }
});
