// BookingPage.js
import { useState } from "react";
import DoctorSelection from "./DoctorSelection";
import AvailableDates from "./AvailableDates";
import AvailableSlots from "./AvailableSlots";
import BookingForm from "./BookingForm";

const BookingPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
    setSelectedDate(null); // Reset date and slot when doctor changes
    setSelectedSlot(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot when date changes
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div>
      <h1>Book an Appointment</h1>

      <DoctorSelection onDoctorSelect={handleDoctorSelect} />

      {selectedDoctor && (
        <AvailableDates
          doctorId={selectedDoctor}
          onDateSelect={handleDateSelect}
        />
      )}

      {selectedDate && selectedDoctor && (
        <AvailableSlots
          doctorId={selectedDoctor}
          selectedDate={selectedDate}
          onSlotSelect={handleSlotSelect}
        />
      )}

      {selectedSlot && selectedDate && selectedDoctor && (
        <BookingForm
          doctorId={selectedDoctor}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
        />
      )}
    </div>
  );
};

export default BookingPage;
