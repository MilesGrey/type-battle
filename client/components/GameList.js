import React from 'react';
import { withRouter } from 'react-router-dom';

class GameList extends React.Component {
    handleJoinGame = (e) => {
        const room = e.target.innerHTML;

        this.props.socket.emit('playerJoinGame', room);
        this.props.history.push(`/game/${room}`);
    }

    render = () => (
        <div>
            <h3>Open Games</h3>
            <ul>
                {
                    !!this.props.gameList && this.props.gameList.map((game) => (
                        <li key={game}>
                            <a onClick={this.handleJoinGame}>{game}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default withRouter(GameList);