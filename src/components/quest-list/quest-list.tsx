import React from 'react';
import { Quest } from '../../types/quest';
import QuestCard from '../quest-card/quest-card';

type QuestListProps = {
  quests: Quest[];
}

function QuestList({ quests }: QuestListProps): JSX.Element {
  return (
    <React.Fragment>
      <h2 className="title visually-hidden">Выберите квест</h2>
      <div className="cards-grid">
        {quests.map((quest: Quest) => <QuestCard quest={quest} key={quest.id} />)}
      </div>
    </React.Fragment>
  );
}

export default QuestList;
