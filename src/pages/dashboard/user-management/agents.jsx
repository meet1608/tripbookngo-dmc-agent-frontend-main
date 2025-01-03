import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Search,
  Settings,
  Filter,
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

const agents = [
  {
    agentId: "A001",
    name: "Sarah Blake",
    email: "sarah.blake@realtynetwork.com",
    phone: "+1 555 234 5678",
    region: "California, USA",
    status: "Active",
  },
  {
    agentId: "A002",
    name: "John McArthur",
    email: "john.mcarthur@premieragents.com",
    phone: "+1 555 345 6789",
    region: "New York, USA",
    status: "Inactive",
  },
  {
    agentId: "A003",
    name: "Lily Thompson",
    email: "lily.thompson@globalrealty.com",
    phone: "+44 20 1234 5678",
    region: "London, UK",
    status: "Pending",
  },
  {
    agentId: "A004",
    name: "Pedro Gomez",
    email: "pedro.gomez@latamagents.com",
    phone: "+52 55 1234 5678",
    region: "Mexico City, Mexico",
    status: "Active",
  },
];

export default function Agents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredAgents, setFilteredAgents] = useState(agents);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterAgents(term, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterAgents(searchTerm, status);
  };

  const filterAgents = (nameTerm, status) => {
    let filtered = agents.filter((agent) =>
      agent.name.toLowerCase().includes(nameTerm.toLowerCase())
    );

    if (status !== "All") {
      filtered = filtered.filter((agent) => agent.status === status);
    }

    setFilteredAgents(filtered);
  };

  const handleProfileClick = () => {
    navigate("/userprofile");
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Agents</h1>
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
              <TableHead>Agent Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.agentId} className="text-sm">
                <TableCell>
                  <Link to={`${agent.agentId}`} className="font-medium">
                    {agent.name}
                  </Link>
                </TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.phone}</TableCell>
                <TableCell>{agent.region}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      agent.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : agent.status === "Inactive"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {agent.status}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}