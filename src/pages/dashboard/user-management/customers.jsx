import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { CalendarIcon, Filter } from "../../../components/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Search,
  Plus,
  Settings,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Link } from "react-router-dom";

const usersWithBookings = [
  {
    userId: "U001",
    userName: "John Doe",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "john.doe@example.com",
    phone: "+1 123 456 7890",
    location: "New York, USA",
    status: "Active",
  },
  {
    userId: "U002",
    userName: "Jane Smith",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=2",
    email: "jane.smith@example.com",
    phone: "+1 987 654 3210",
    location: "Los Angeles, USA",
    status: "Inactive",
  },
  {
    userId: "U003",
    userName: "Robert Johnson",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=3",
    email: "robert.johnson@example.com",
    phone: "+1 555 555 5555",
    location: "Chicago, USA",
    status: "Active",
  },
  {
    userId: "U004",
    userName: "Emily Davis",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "emily.davis@example.com",
    phone: "+44 20 7946 0958",
    location: "London, UK",
    status: "Active",
  },
  {
    userId: "U005",
    userName: "Michael Brown",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "michael.brown@example.com",
    phone: "+49 30 1234 5678",
    location: "Berlin, Germany",
    status: "Pending",
  },
  {
    userId: "U006",
    userName: "Sarah Connor",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=6",
    email: "sarah.connor@example.com",
    phone: "+33 1 23 45 67 89",
    location: "Paris, France",
    status: "Inactive",
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredBookings, setFilteredBookings] = useState(usersWithBookings);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBookings(term, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterBookings(searchTerm, status);
  };

  const filterBookings = (nameTerm, status) => {
    let filtered = usersWithBookings.filter((user) =>
      user.userName.toLowerCase().includes(nameTerm.toLowerCase())
    );

    if (status !== "All") {
      filtered = filtered.filter((user) => user.status === status);
    }

    setFilteredBookings(filtered);
  };

  const handleProfileClick = () => {
    navigate("/userprofile"); // Navigate to the profile page
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Customers</h1>
        <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
          <Search size={15} />
          <input
            type="search"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearch}
            className="outline-none bg-transparent"
          />
        </div>
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

      {/* Filter Section */}
      

      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          {["All", "Active", "Pending", "Inactive"].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`flex items-center gap-1 ${
                statusFilter === status ? "font-bold" : "text-neutral-400"
              }`}
            >
              <Filter />
              <span className="text-sm">{status}</span>
            </button>
          ))}
          
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((user) => (
              <TableRow key={user.userId} className="text-sm">
                <TableCell className="flex items-center gap-3">
                  <Link to={`${user.userId}`} className="flex items-center gap-4">
                    <img
                      src={user.avatar}
                      alt={`${user.userName}'s Avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                    {user.userName}
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}