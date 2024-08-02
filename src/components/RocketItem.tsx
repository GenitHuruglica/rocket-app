import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RocketItemProps {
  rocket: Rocket;
}

export interface Rocket {
  id?: string;
  name: string;
  first_flight: Date;
  height?: number;
}

const RocketItem: React.FC<RocketItemProps> = ({ rocket }) => {
  const navigate = useNavigate();

  return (
    <Card className="rocket-item">
      <CardHeader>
        <FontAwesomeIcon icon={faRocket} size={"2x"} />
        <CardTitle>{rocket.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          First Flight: {new Date(rocket.first_flight).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate(`/rockets/${rocket.id}`)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RocketItem;
