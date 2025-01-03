import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Search,
  Plus,
  Settings,
} from "lucide-react";
export default function CustomReports() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  const handleProfileClick = () => {
    navigate("/userprofile"); // Navigate to the profile page
  };
  
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Custom Reports</h1>
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
      <Button className="mb-4">Generate New Report</Button>
      <div className="bg-white rounded-xl p-4">
        <p className="text-sm">
          Select your report parameters to generate a custom report.
        </p>
        {/* Add form or filters for customizing reports here */}
      </div>
    </section>
  );
}
