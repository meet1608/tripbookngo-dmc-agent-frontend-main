import {
  ArrowLightDown,
  ArrowLightUp,
  CrossBokmark,
  Dollor,
  FlyingFlight,
  Verified,
} from "../../components/icons";
import { Button } from "../../components/ui/button";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Search,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const DashboardSummmary = [
  {
    label: "Completed FLights",
    number: 125,
    icon: <ArrowLightUp />,
    mainIcon: <Verified />,
    percentage: "1.35%",
  },
  {
    label: "Active Flights",
    number: 80,
    icon: <ArrowLightUp />,
    mainIcon: <FlyingFlight />,
    percentage: "3.68",
  },
  {
    label: "Cancelled Flights",
    number: 25,
    icon: <ArrowLightDown />,
    mainIcon: <CrossBokmark />,
    percentage: "1.45%",
  },
  {
    label: "Total Revenue",
    number: 15000,
    icon: <ArrowLightUp />,
    mainIcon: <Dollor />,
    percentage: "5.94%",
  },
];

export default function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle profile click
  const handleProfileClick = () => {
    navigate("/userprofile"); // Navigate to the profile page
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search className="font-thin" size={15} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search anything"
              className="outline-none bg-transparent"
            />
          </div>
          <Button size="icon" className="bg-white text-neutral-700">
            <BellDot size={20} />
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
      <div className="grid grid-cols-4 gap-4">
        {DashboardSummmary.map((el) => (
          <div
            key={el.label}
            className="flex justify-between items-center bg-white rounded-xl p-4"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs text-neutral-400">{el.label}</p>
              <p className="text-xl font-bold">{el.number}</p>
              <div className="flex items-center px-2 rounded bg-orange-400/20 w-fit text-xs gap-2">
                {el.icon}
                <span>{el.percentage}</span>
              </div>
            </div>
            <div className="rounded-full bg-orange-400 w-fit p-2">
              {el.mainIcon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}