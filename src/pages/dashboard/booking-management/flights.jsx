import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Plus,
  Search,
  Settings,
  Download,
  Eye,
  Edit,
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

const bookingsData = [
  {
    booking: "BK001",
    customerName: "John Doe",
    flightNo: "AA123",
    airline: "American Airlines",
    route: "JFK - LAX",
    departure: "10:00 AM",
    arrival: "1:00 PM",
    date: "2024-09-20",
    totalPassengers: 2,
    status: "Confirmed",
  },
  {
    booking: "BK002",
    customerName: "Jane Smith",
    flightNo: "UA456",
    airline: "United Airlines",
    route: "ORD - SFO",
    departure: "11:30 AM",
    arrival: "2:45 PM",
    date: "2024-09-21",
    totalPassengers: 1,
    status: "Pending",
  },
];

export default function Flights() {
  const [searchTerm, setSearchTerm] = useState("");
  const [flightSearch, setFlightSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredBookings, setFilteredBookings] = useState(bookingsData);
  const [editingBooking, setEditingBooking] = useState(null);

  const navigate = useNavigate();

  const handleFilter = (e) => {
    const { name, value } = e.target;

    if (name === 'searchTerm') {
      setSearchTerm(value);
      filterBookings(value, flightSearch, statusFilter);
    } else if (name === 'flightSearch') {
      setFlightSearch(value);
      filterBookings(searchTerm, value, statusFilter);
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterBookings(searchTerm, flightSearch, status);
  };

  const filterBookings = (nameTerm, flightTerm, status) => {
    let filtered = bookingsData.filter(
      (booking) =>
        booking.customerName.toLowerCase().includes(nameTerm.toLowerCase()) &&
        booking.flightNo.toLowerCase().includes(flightTerm.toLowerCase())
    );

    if (status !== "All") {
      filtered = filtered.filter((booking) => booking.status === status);
    }

    setFilteredBookings(filtered);
  };

  const handleEditBooking = (booking) => {
    setEditingBooking({ ...booking });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking((prev) => ({ ...prev, [name]: value }));
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

  const handleProfileClick = () => {
    navigate("/userprofile");
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Flights</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search size={15} />
            <input
              type="search"
              name="searchTerm"
              placeholder="Search by Customer Name"
              value={searchTerm}
              onChange={handleFilter}
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

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`flex items-center gap-1 ${statusFilter === status ? "font-bold" : "text-neutral-400"}`}
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
          <Button
            className="flex items-center gap-3"
            onClick={() => navigate("/dashboard/booking-management/addflights")}
          >
            <Plus size={15} />
            Add booking
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Book ID",
                "Customer Name",
                "Flight No",
                "Airline",
                "Route",
                "Departure",
                "Arrival",
                "Date",
                "Total Passengers",
                "Status",
                "Actions",
              ].map((head) => (
                <TableHead key={head}>{head}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.booking}>
                {Object.values(booking).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
                <TableCell>
                  <Button><Eye size={15} /> View</Button>
                  <Button><Download size={15} /> Download</Button>
                  <Button onClick={() => handleEditBooking(booking)}><Edit size={15} /> Edit</Button>
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
              <label className="block text-sm mb-1">Flight No</label>
              <input
                type="text"
                name="flightNo"
                value={editingBooking.flightNo}
                onChange={handleEditChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Airline</label>
              <input
                type="text"
                name="airline"
                value={editingBooking.airline}
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