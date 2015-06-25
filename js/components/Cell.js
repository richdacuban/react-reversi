import React from 'react';
import Player from '../lib/Player';
import cellStyle from '../styles/cell';
import extend from 'object-assign';
import { List, Map } from 'immutable';

export default class Cell {
   static propTypes = {
      row: React.PropTypes.number.isRequired,
      col: React.PropTypes.number.isRequired,
      owner: React.PropTypes.number.isRequired,
      playerHint: React.PropTypes.instanceOf(Map).isRequired,
      actions: React.PropTypes.shape({
         makeMove: React.PropTypes.func.isRequired,
         checkOverlayHint: React.PropTypes.func.isRequired,
         removeHint: React.PropTypes.func.isRequired
      })
   }
   handleClick() {
      this.props.actions.makeMove(this.props.row, this.props.col);
   }
   handleMouseOver() {
      this.props.actions.checkOverlayHint(this.props.row, this.props.col);
   }
   handleMouseOut() {
      this.props.actions.removeHint();
   }
   render() {
      const styles = buildStyles(this.props.owner, this.props.playerHint, this.props.row, this.props.col);

      return <td style={styles} onClick={this.handleClick.bind(this)} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}></td>;
   }
}

function buildStyles(owner, playerHint, row, col) {
   const isHint = playerHint.get('row') === row && playerHint.get('col') === col;

   let cellAppearance;
   let opacity;

   if (owner !== Player.None) {
      cellAppearance = owner;
      opacity = 1;
   } else if (isHint) {
      cellAppearance = playerHint.get('player');
      opacity = 0.6;
   } else {
      cellAppearance = Player.None;
      opacity = 1;
   }

   return extend({
      border: '1px solid black',
      opacity
   }, cellStyle(cellAppearance));
}
