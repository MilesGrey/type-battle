import React from 'react';
import { Link } from 'react-router-dom';

const GameList = (props) => (
    <div>
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