import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";


import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Search,
  Plus,
  Settings,
} from "lucide-react";
const commissions = [
  {
    id: "C001",
    agentName: "John Doe",
    commissionRate: "5%",
    totalSales: "$2,000",
    commissionEarned: "$100",
    date: "2024-09-20",
  },
  {
    id: "C002",
    agentName: "Jane Smith",
    commissionRate: "7%",
    totalSales: "$3,500",
    commissionEarned: "$245",
    date: "2024-09-21",
  },
  {
    id: "C003",
    agentName: "Robert Johnson",
    commissionRate: "4%",
    totalSales: "$1,500",
    commissionEarned: "$60",
    date: "2024-09-22",
  },
  {
    id: "C004",
    agentName: "Emily Davis",
    commissionRate: "6%",
    totalSales: "$4,000",
    commissionEarned: "$240",
    date: "2024-09-23",
  },
  {
    id: "C005",
    agentName: "Michael Brown",
    commissionRate: "5%",
    totalSales: "$2,500",
    commissionEarned: "$125",
    date: "2024-09-24",
  },
];

export default function CommissionManagement() {

   const navigate = useNavigate(); // Initialize useNavigate hook
    const handleProfileClick = () => {
      navigate("/userprofile"); // Navigate to the profile page
    };
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Commission Management</h1>
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
      <Button className="mb-4">Refresh Commissions</Button>
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commission ID</TableHead>
              <TableHead>Agent Name</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Commission Earned</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow key={commission.id} className="text-sm">
                <TableCell className="font-normal">{commission.id}</TableCell>
                <TableCell>{commission.agentName}</TableCell>
                <TableCell>{commission.commissionRate}</TableCell>
                <TableCell>{commission.totalSales}</TableCell>
                <TableCell>{commission.commissionEarned}</TableCell>
                <TableCell>{commission.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
