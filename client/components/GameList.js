import React from 'react';
import { Link } from 'react-router-dom';

const GameList = (props) => (
    <div>
        <h3>Open Games</h3>
        <ul>
            {
                !!props.gameList && props.gameList.map((game) => (
                    <li key={game}>
                        <Link to={`/game/${game}`}>{game}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
);

export default GameList;