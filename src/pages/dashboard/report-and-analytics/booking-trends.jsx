import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

import { BellDot, ChevronDown, CircleHelp, Settings } from "lucide-react";
const bookingTrends = [
  { month: "January", bookings: 30 },
  { month: "February", bookings: 20 },
  { month: "March", bookings: 50 },
  { month: "April", bookings: 40 },
  { month: "May", bookings: 60 },
  { month: "June", bookings: 70 },
  { month: "July", bookings: 90 },
  { month: "August", bookings: 80 },
  { month: "September", bookings: 100 },
];

export default function BookingTrends() {

  const navigate = useNavigate(); // Initialize useNavigate hook


  const handleProfileClick = () => {
    navigate("/userprofile"); // Navigate to the profile page
  };

  
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Booking Trends</h1>
        <div className="flex items-center gap-3">
        
          <Button size="icon" className="bg-white text-neutral-700">
            <BellDot size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <CircleHelp size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <Settings size={20} />
          </Button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
            <div className="w-10 h-10 bg-orange-400/50 rounded-xl" />
            <div>
              <p className="text-sm">Martin Septimus</p>
              <p className="text-xs text-neutral-400">Admin</p>
            </div>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
      <Button className="mb-4">Download Report</Button>
      <div className="bg-white rounded-xl p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Month</th>
              <th className="text-left">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {bookingTrends.map((trend) => (
              <tr key={trend.month}>
                <td className="py-2">{trend.month}</td>
                <td className="py-2">{trend.bookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
