import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Rocket } from "./RocketItem";
import { rocketSchema } from "@/utils/validation";

interface ModalInterface {
  isOpen: boolean;
  handleModal: () => void;
  addRocket: (newRocket: Rocket) => void;
}

const AddRocketForm: React.FC<ModalInterface> = ({
  isOpen,
  handleModal,
  addRocket,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Rocket>({
    resolver: zodResolver(rocketSchema),
  });

  const onSubmit = (data: Rocket) => {
    addRocket(data);
    handleModal();
    reset();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          reset();
          handleModal();
        }}
      >
        <DialogContent className="bg-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Rocket Information
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please fill out the information below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Rocket Name
              </Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    placeholder="Enter rocket name"
                    className="mt-1 block w-full"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label
                htmlFor="first_flight"
                className="block text-sm font-medium text-gray-700"
              >
                First Flight Date
              </Label>
              <Controller
                name="first_flight"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <DatePicker
                    id="first_flight"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholderText="Select first flight date"
                  />
                )}
              />
              {errors.first_flight && (
                <p className="text-red-500 text-sm">
                  {errors.first_flight.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700"
              >
                Height (meters)
              </Label>
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="height"
                    type="number"
                    placeholder="Enter height in meters"
                    className="mt-1 block w-full"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              {errors.height && (
                <p className="text-red-500 text-sm">{errors.height.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-500 text-white">
                Confirm
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="ml-2"
                onClick={() => {
                  handleModal();
                  reset();
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRocketForm;
