import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton: React.FC = () => (
  <div className="p-4 box-border">
    <Skeleton height={200} />
  </div>
);

const SkeletonLoader: React.FC = () => {
  return (
    <div>
      <div>
        <Skeleton height={40} width={"100%"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
