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
const transactions = [
  {
    id: "TX001",
    date: "2024-09-20",
    amount: "$150.00",
    status: "Completed",
    customer: "John Doe",
  },
  {
    id: "TX002",
    date: "2024-09-21",
    amount: "$75.50",
    status: "Pending",
    customer: "Jane Smith",
  },
  {
    id: "TX003",
    date: "2024-09-22",
    amount: "$200.00",
    status: "Failed",
    customer: "Robert Johnson",
  },
  {
    id: "TX004",
    date: "2024-09-23",
    amount: "$90.00",
    status: "Completed",
    customer: "Emily Davis",
  },
  {
    id: "TX005",
    date: "2024-09-24",
    amount: "$120.00",
    status: "Completed",
    customer: "Michael Brown",
  },
];

export default function TransactionsMonitoring() {

   const navigate = useNavigate(); // Initialize useNavigate hook
    const handleProfileClick = () => {
      navigate("/userprofile"); // Navigate to the profile page
    };
  

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Transactions Monitoring</h1>
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
      <Button className="mb-4">Refresh Transactions</Button>
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="text-sm">
                <TableCell className="font-normal">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      transaction.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : transaction.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </TableCell>
                <TableCell>{transaction.customer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
