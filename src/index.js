import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TicTacToe extends React.Component {
  constructor(){
    super();
    this.state = {
      playerIsO: true,
      board: [null, null, null, null, null, null, null, null, null],
      xWonGames: 0,
      oWonGames: 0
    }
  }

  restart() {
    this.setState({
      playerIsO: true,
      board: [null, null, null, null, null, null, null, null, null],
    })
  }

  markSquare (idx){
    var boardUpdated = this.state.board;
    var currentPlayer;
    if(this.state.playerIsO){
      currentPlayer = "o";
    }else{
      currentPlayer = "x";
    }
    if(boardUpdated[idx] === null){
      boardUpdated[idx] = currentPlayer;
    }
    this.setState({
      playerIsO: !this.state.playerIsO,
      board:boardUpdated
    })
  }

  addWonGame (player){
    if(player==="o"){
      this.setState({
        oWonGames: this.state.oWonGames +1
      })
    }else{
      this.setState({
        xWonGames: this.state.xWonGames +1
      })
    }
  }

  render(){
    var winner;
    var gameOver = false;
    function equal(a, b, c){
      if(a===b&&b===c&&a!==null){
        return true;
      }
    }
    if(equal(this.state.board[0],this.state.board[1],this.state.board[2])
    ||equal(this.state.board[3],this.state.board[4],this.state.board[5])
    ||equal(this.state.board[6],this.state.board[7],this.state.board[8])
    ||equal(this.state.board[0],this.state.board[3],this.state.board[6])
    ||equal(this.state.board[1],this.state.board[4],this.state.board[7])
    ||equal(this.state.board[2],this.state.board[5],this.state.board[8])
    ||equal(this.state.board[0],this.state.board[4],this.state.board[8])
    ||equal(this.state.board[2],this.state.board[4],this.state.board[6])){
      if(this.state.playerIsO){
        winner = "x";
        gameOver = true;
        setTimeout(() => {this.restart()}, 1000);
        setTimeout(() => {this.setState({
          xWonGames: this.state.xWonGames+1
        })}, 1001);
      }else{
        winner = "o";
        gameOver = true;
        setTimeout(() => {this.restart()}, 1000);
        setTimeout(() => {this.setState({
          oWonGames: this.state.oWonGames+1
        })}, 1001);
      }
    }
    if(this.state.board.join("").length===9&&winner===undefined){
      winner = "draw";
      gameOver = true;
      setTimeout(() => {this.restart()}, 1000)
    }

    return (
      <div className="grid_wrapper">
        <div className="grid">
          {this.state.board.map((elem, idx) =>
            <div className={elem===null ? "grid_unit" : (elem ==="o" ? "grid_unit renderO" : "grid_unit renderX")} key={idx} onClick={(event)=> gameOver ? event.preventDefault(): this.markSquare(idx)}></div>
          )}
        </div>
        <div className="msgboard">
          <span>winner: </span><div className={winner===undefined ? "msgboardImg" : (winner ==="o" ? "msgboardImg renderO" : (winner === "x" ? "msgboardImg renderX" : "msgboardImg renderTie"))}></div>
          <br/>
          <div className="msgboardImg renderX"></div><span> has won {this.state.xWonGames} games</span>
          <br/>
          <div className="msgboardImg renderO"></div><span> has won {this.state.oWonGames} games</span>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<TicTacToe/>,
  document.getElementById('root')
);
