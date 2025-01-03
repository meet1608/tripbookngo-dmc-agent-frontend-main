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

const corporateAccounts = [
  {
    companyId: "C001",
    companyName: "Tech Innovators Inc.",
    contactPerson: "Alice Johnson",
    email: "alice.johnson@techinnovators.com",
    phone: "+1 987 654 3210",
    location: "San Francisco, USA",
    status: "Active",
  },
  {
    companyId: "C002",
    companyName: "Global Solutions Ltd.",
    contactPerson: "Bob Williams",
    email: "bob.williams@globalsolutions.com",
    phone: "+44 20 7946 0958",
    location: "London, UK",
    status: "Inactive",
  },
  {
    companyId: "C003",
    companyName: "Future Enterprises",
    contactPerson: "Charlie Brown",
    email: "charlie.brown@futureenterprises.com",
    phone: "+49 30 1234 5678",
    location: "Berlin, Germany",
    status: "Pending",
  },
  {
    companyId: "C004",
    companyName: "Prime Innovations",
    contactPerson: "Diana Evans",
    email: "diana.evans@primeinnovations.com",
    phone: "+33 1 23 45 67 89",
    location: "Paris, France",
    status: "Active",
  },
];

export default function Corporate() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredAccounts, setFilteredAccounts] = useState(corporateAccounts);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterAccounts(term, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterAccounts(searchTerm, status);
  };

  const filterAccounts = (nameTerm, status) => {
    let filtered = corporateAccounts.filter((company) =>
      company.companyName.toLowerCase().includes(nameTerm.toLowerCase())
    );

    if (status !== "All") {
      filtered = filtered.filter((company) => company.status === status);
    }

    setFilteredAccounts(filtered);
  };

  const handleProfileClick = () => {
    navigate("/userprofile"); // Navigate to the profile page
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Corporate Accounts</h1>
        <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
          <Search size={15} />
          <input
            type="search"
            placeholder="Search by Company Name"
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
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((company) => (
              <TableRow key={company.companyId} className="text-sm">
                <TableCell>
                  <Link to={`${company.companyId}`} className="font-medium">
                    {company.companyName}
                  </Link>
                </TableCell>
                <TableCell>{company.contactPerson}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      company.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : company.status === "Inactive"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {company.status}
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