// import "./lunar-booking.css";

"use client";

import { Suspense } from "react";
import BookingForm from "./BookingForm";
import "../lunar-booking.css";

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingForm />
    </Suspense>
  );
}
