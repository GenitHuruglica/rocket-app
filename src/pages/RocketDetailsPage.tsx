import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRocketDetails } from "../utils/api";
import { useFavoriteStore } from "../store/favoriteRockets";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faHeart as faHeartSolid,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import SkeletonLoader from "@/components/SkeletonLoader";

const RocketDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["rocket", id],
    queryFn: () => fetchRocketDetails(id!),
  });

  const { favorites, addFavorite, removeFavorite } = useFavoriteStore(
    (state) => ({
      favorites: state.favorites,
      addFavorite: state.addFavorite,
      removeFavorite: state.removeFavorite,
    })
  );

  const isFavorite = id && favorites.includes(id);

  const handleFavorite = () => {
    if (isFavorite) {
      id && removeFavorite(id);
    } else {
      toast.success("Added to Favorites");
      id && addFavorite(id);
    }
  };

  if (isLoading) return <SkeletonLoader />;
  if (error)
    return (
      <div className="m-5">
        <div className="mb-5">Error fetching rocket details</div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <Card className="border-t-4 ">
          <CardHeader className="bg-gray-800 text-white">
            <div className="flex items-center justify-between py-4 px-6">
              <CardTitle className="text-3xl font-extrabold">
                <FontAwesomeIcon icon={faRocket} size={"1x"} /> {data.name}
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                {data.country}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <Label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </Label>
              <p className="text-gray-800 leading-relaxed">
                {data.description}
              </p>
            </div>
            <div className="mb-6">
              <Label className="block text-sm font-semibold text-gray-700 mb-2">
                First Flight
              </Label>
              <p className="text-gray-800">{data.first_flight}</p>
            </div>
          </CardContent>
          <div className="mt-6 ml-4 mr-4 mb-4 flex items-center justify-between">
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ color: "#1F2937" }}
              className="text-2xl  cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="flex items-center space-x-2">
              <span className="text-gray-800">Favorite</span>
              <FontAwesomeIcon
                icon={isFavorite ? faHeartSolid : faHeartRegular}
                onClick={handleFavorite}
                className={`cursor-pointer text-2xl ${
                  isFavorite ? "text-red-500" : "text-gray-500"
                } mr-2`}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RocketDetailsPage;
