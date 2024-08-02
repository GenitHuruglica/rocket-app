import React, { useEffect, useState } from "react";
import AddRocketForm from "../components/AddRocketForm";
import RocketList from "@/components/RocketList";
import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import { fetchRockets } from "../utils/api";
import { Rocket } from "@/components/RocketItem";
import SkeletonLoader from "@/components/SkeletonLoader";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["rockets"],
    queryFn: fetchRockets,
  });

  const [rockets, setRockets] = useState<Rocket[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setRockets(data);
    }
  }, [data]);

  const handleModal = () => setIsOpen(!isOpen);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div className="mb-5">Error fetching rocket details</div>;

  const filteredRockets = rockets?.filter((rocket: Rocket) =>
    rocket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addRocket = (newRocket: Rocket) => {
    setRockets([...rockets, newRocket]);
  };

  return (
    <div className="container">
      <NavBar setSearchTerm={setSearchTerm} handleModal={handleModal} />
      {filteredRockets.length > 0 ? (
        <RocketList rockets={filteredRockets} />
      ) : (
        <h1>Nuk u gjeten te dhena!</h1>
      )}
      <AddRocketForm
        isOpen={isOpen}
        handleModal={handleModal}
        addRocket={addRocket}
      />
    </div>
  );
};

export default Home;
