import React from "react";

const GradientBar = () => {
  // Define the gradient color logic
  const getColor = (ppm) => {
    if (ppm === 1) return "rgba(255, 210, 127, 1)"; // Black for ppm = 1
    if (ppm === 0) return "rgba(255, 243, 230, 1)"; // Red for ppm = 2
    if (ppm <= 10) return `rgba(255, 223, 186, ${ppm / 10})`; // Very light orange gradient
    if (ppm <= 20) return `rgba(255, 194, 129, ${(ppm - 10) / 10})`; // Light orange gradient
    if (ppm <= 30) return `rgba(255, 165, 0, ${(ppm - 20) / 10})`; // Medium orange gradient
    return `rgba(255, 140, 0, 1)`; // Solid orange for ppm above 30
  };

  // Generate color stops for the gradient
  const gradientStops = [
    { ppm: 0, color: getColor(0) },
    { ppm: 1, color: getColor(1) },
    { ppm: 10, color: getColor(10) },
    { ppm: 20, color: getColor(20) },
    { ppm: 30, color: getColor(30) },
  ];

  const gradient = `linear-gradient(to right, ${gradientStops
    .map((stop) => `${stop.color} ${stop.ppm * 3}%`) // Multiplying ppm by 3 to stretch across the bar
    .join(", ")})`;

  return (
    <div
      className="w-5/6 mx-auto h-4 mb-2 bg-gray-200 rounded-lg mt-4"
      style={{ background: gradient }}
    >
      <div className="flex justify-between text-xs font-semibold text-black px-2">
        <span>0 ppm</span>
        <span>10 ppm</span>
        <span>20 ppm</span>
        <span>30 ppm</span>
        <span>40+ ppm</span>
      </div>
    </div>
  );
};

export default GradientBar;
