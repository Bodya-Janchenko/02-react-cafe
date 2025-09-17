import css from "./App.module.css";

import CareInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import Notification from "../Notification/Notification";

import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";
import VoteStats from "../VoteStats/VoteStats";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType): void => {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  };

  const resetVotes = (): void => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  const totalVotes: number = votes.good + votes.bad + votes.neutral;
  const positiveRate: number =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  const canReset: boolean = totalVotes > 0 ? true : false;

  return (
    <div className={css.app}>
      <CareInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset}
      />
      {totalVotes > 0 ? (
        <VoteStats
          stats={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
