import React from 'react';

const GameList = (props) => (
    <div>
        {
            !!props.gameList && gameList.map((game) => (
                <p>{game}</p>
            ))
        }
    </div>
);

export default GameList;