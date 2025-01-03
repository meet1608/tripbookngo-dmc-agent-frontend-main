import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Plus,
  Eye,
  Download,
  Edit,
  Search,
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

import { CalendarIcon, Filter } from "../../../components/icons";

const bookings = [
  {
    booking: "BK001",
    customerName: "John Doe",
    busNo: "BUS123",
    company: "Greyhound",
    route: "NYC - DC",
    departure: "10:00 AM",
    arrival: "2:00 PM",
    date: "2024-09-20",
    totalPassengers: 2,
    status: "Confirmed",
  },
  {
    booking: "BK002",
    customerName: "Jane Smith",
    busNo: "BUS456",
    company: "Megabus",
    route: "LA - SF",
    departure: "11:30 AM",
    arrival: "3:00 PM",
    date: "2024-09-21",
    totalPassengers: 1,
    status: "Pending",
  },
  {
    booking: "BK003",
    customerName: "Robert Johnson",
    busNo: "BUS789",
    company: "FlixBus",
    route: "ATL - MIA",
    departure: "9:00 AM",
    arrival: "1:30 PM",
    date: "2024-09-22",
    totalPassengers: 3,
    status: "Cancelled",
  },
  {
    booking: "BK004",
    customerName: "Emily Davis",
    busNo: "BUS101",
    company: "National Geographic",
    route: "CHI - IND",
    departure: "8:15 AM",
    arrival: "10:45 AM",
    date: "2024-09-23",
    totalPassengers: 4,
    status: "Confirmed",
  },
  {
    booking: "BK005",
    customerName: "Michael Brown",
    busNo: "BUS102",
    company: "Peter Pan",
    route: "BOS - NYC",
    departure: "7:00 AM",
    arrival: "9:30 AM",
    date: "2024-09-24",
    totalPassengers: 2,
    status: "Confirmed",
  },
];

export default function Buses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingBooking, setEditingBooking] = useState(null);

  // Handle search specifically by Bus No and Customer Name
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBookings(term, statusFilter);
  };

  const handleSaveBooking = () => {
    setFilteredBookings((prev) =>
      prev.map((booking) =>
        booking.booking === editingBooking.booking ? editingBooking : booking
      )
    );
    setEditingBooking(null);
    alert("Booking updated successfully!");
  };

  const handleCloseModal = () => {
    setEditingBooking(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditBooking = (booking) => {
    setEditingBooking({ ...booking });
  };

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/userprofile");
  };


  // Filter bookings by Bus No, Customer Name, and Status
  const filterBookings = (term, status) => {
    const filtered = bookings.filter(
      (booking) =>
        (booking.customerName.toLowerCase().includes(term.toLowerCase()) ||
          booking.busNo.toLowerCase().includes(term.toLowerCase())) &&
        (status === "All" || booking.status === status)
    );
    setFilteredBookings(filtered);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterBookings(searchTerm, status); // Apply both filters
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Buses</h1>
        <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
          <Search className="font-thin" size={15} />
          <input
            type="search"
            placeholder="Search by bus no or customer name"
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
          <div className="flex items-center gap-3 cursor-pointer"             onClick={handleProfileClick}
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

      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
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
          <button className="flex items-center gap-1 text-neutral-400">
            <CalendarIcon />
            <span className="text-sm">1-8 July 2024</span>
            <ChevronDown size={14} />
          </button>
          <Button className="flex items-center gap-3" onClick={() => navigate("/dashboard/booking-management/addbuses")}>
            <Plus size={15} />
            Add booking
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Bus No</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Passengers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.booking} className="text-sm">
                <TableCell className="font-normal">{booking.booking}</TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.busNo}</TableCell>
                <TableCell>{booking.company}</TableCell>
                <TableCell>{booking.route}</TableCell>
                <TableCell>{booking.departure}</TableCell>
                <TableCell>{booking.arrival}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.totalPassengers}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      booking.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : booking.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </p>
                </TableCell>
                <TableCell >
                  <Button >
                    <Eye size={15}  /> View
                  </Button>
                  <Button>
                    <Download size={15} /> Download
                  </Button>
                  <Button onClick={() => handleEditBooking(booking)}>
                    <Edit size={15} /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {editingBooking && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-1/3">
      <h2 className="text-lg font-semibold mb-4">Edit Booking</h2>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={editingBooking.customerName}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Bus No</label>
        <input
          type="text"
          name="busNo"
          value={editingBooking.busNo}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Company</label>
        <input
          type="text"
          name="company"
          value={editingBooking.company}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Route</label>
        <input
          type="text"
          name="route"
          value={editingBooking.route}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Departure</label>
        <input
          type="text"
          name="departure"
          value={editingBooking.departure}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Arrival</label>
        <input
          type="text"
          name="arrival"
          value={editingBooking.arrival}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={editingBooking.date}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Total Passengers</label>
        <input
          type="number"
          name="totalPassengers"
          value={editingBooking.totalPassengers}
          onChange={handleEditChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
     
      <div className="flex gap-4">
        <Button onClick={handleSaveBooking}>Save</Button>
        <Button onClick={handleCloseModal}>Cancel</Button>
      </div>
    </div>
  </div>
)}


    </section>
  );
}