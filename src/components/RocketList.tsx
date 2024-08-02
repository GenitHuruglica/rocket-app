import React from "react";
import RocketItem, { Rocket } from "./RocketItem";

interface RocketListProps {
  rockets: Rocket[];
}

const RocketList: React.FC<RocketListProps> = ({ rockets }) => {
  return (
    <div className="rocket-list">
      {rockets.map((rocket) => (
        <RocketItem key={rocket.id} rocket={rocket} />
      ))}
    </div>
  );
};

export default RocketList;
