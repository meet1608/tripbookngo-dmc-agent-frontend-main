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
import { useNavigate } from "react-router-dom";

const DashboardSummary = [
  {
    label: "Completed Flights",
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
    percentage: "3.68%",
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
  {
    label: "New Bookings",
    number: 45,
    icon: <ArrowLightUp />,
    mainIcon: <FlyingFlight />,
    percentage: "2.10%",
  },
];

const QuickLinks = [
  { label: "Search Flights", href: "/dashboard/booking-management/flights" },
  { label: "Manage Bookings", href: "/dashboard/booking-management/hotels" },
  { label: "Visa Applications", href: "/dashboard/booking-management/visa-services" },
  { label: "Expense Reports", href: "/dashboard/report-and-analytics/revenue-report" },
];

const RecentActivities = [
  { user: "Alice Johnson", activity: "Booked a flight to Paris", time: "2h ago" },
  { user: "Bob Smith", activity: "Cancelled hotel booking", time: "4h ago" },
  { user: "Eve Adams", activity: "Applied for a visa", time: "1d ago" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/userprofile");
  };

  const handleSettingsClick = () => {
    navigate("/dashboard/settings");
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search size={15} />
            <input
              type="search"
              placeholder="Search anything"
              className="outline-none bg-transparent"
            />
          </div>
          <Button size="icon" className="bg-white text-neutral-700">
            <BellDot size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700" onClick={handleSettingsClick}>
            <Settings size={20} />
          </Button>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className="w-10 h-10 bg-orange-400/50 rounded-xl" />
            <div>
              <p className="text-sm">Martin Septimus</p>
              <p className="text-xs text-neutral-400">Admin</p>
            </div>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        {DashboardSummary.map((el) => (
          <div
            key={el.label}
            className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs text-neutral-400">{el.label}</p>
              <p className="text-xl font-bold">{el.number}</p>
              <div className="flex items-center px-2 rounded bg-orange-400/20 w-fit text-xs gap-2">
                {el.icon}
                <span>{el.percentage}</span>
              </div>
            </div>
            <div className="rounded-full bg-orange-400 w-fit p-2">{el.mainIcon}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h2 className="text-md font-semibold mb-2">Quick Links</h2>
        <div className="flex gap-4">
          {QuickLinks.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              onClick={() => navigate(link.href)}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h2 className="text-md font-semibold mb-2">Recent Activities</h2>
        <ul className="text-sm">
          {RecentActivities.map((activity, index) => (
            <li key={index} className="py-1">
              <strong>{activity.user}</strong> - {activity.activity} <span className="text-gray-400">({activity.time})</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
