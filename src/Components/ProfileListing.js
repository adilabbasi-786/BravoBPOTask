import React, { useEffect, useState } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { MDBRadio, MDBInput } from "mdb-react-ui-kit"; // Import MDBInput for the search input
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function ProfileListing({ item }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const itemsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      let req = await fetch(
        `https://randomuser.me/api/?results=${itemsPerPage * 2}`
      );
      let res = await req.json();
      setData(res.results);
    };

    getData();
  }, []);

  // Filter data based on selected gender and search query
  const filteredData = data.filter((item) => {
    const genderMatch = selectedGender === "" || item.gender === selectedGender;
    const nameMatch = item.name.first
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return genderMatch && nameMatch;
  });

  // Calculate index of the first and last items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenderChange = (event) => {
    const gender = event.target.id;
    setSelectedGender(gender === "all" ? "" : gender);
  };

  // Function to handle changes in the search input field
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <div
        style={{
          marginTop: "10px",
          marginLeft: "450px",
          display: "flex",
          maxWidth: "500px",
        }}
      >
        {/* Search input */}
        <MDBInput
          type="search"
          label="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <MDBBtn color="primary">Search</MDBBtn>
      </div>
      <div style={{ marginLeft: "450px", marginTop: "50px", display: "flex" }}>
        {/* Gender radio buttons */}
        <MDBRadio
          name="gender"
          id="male"
          label="Male"
          checked={selectedGender === "male"}
          onChange={handleGenderChange}
        />
        <MDBRadio
          name="gender"
          id="female"
          label="Female"
          checked={selectedGender === "female"}
          onChange={handleGenderChange}
          style={{ marginLeft: "50px" }}
        />
        <MDBRadio
          name="gender"
          id="all"
          label="All"
          checked={selectedGender === ""}
          onChange={handleGenderChange}
          style={{ marginLeft: "50px" }}
        />
      </div>

      <MDBListGroup style={{ minWidth: "8rem" }} light>
        {currentItems.map((item, index) => (
          <MDBListGroupItem
            key={index}
            className="d-flex justify-content-between align-items-center"
            style={{ maxWidth: "80rem" }}
          >
            {console.log("name", item.name.first)}
            {console.log("item value", item.id.value)}
            <div style={{ marginLeft: "1%" }}>
              <div className="fw-bold">{item.name.first}</div>
              <div className="text-muted">{item.gender}</div>
              <div className="text-muted">{item.email}</div>
            </div>
            <Link to={`/profilepage/${item.id.value}`} state={{ user: item }}>
              <button>More Details</button>
            </Link>
          </MDBListGroupItem>
        ))}
      </MDBListGroup>

      <MDBPagination className="mb-1 ml-5 " style={{ marginLeft: "600px" }}>
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink
            onClick={() => handlePageChange(currentPage - 1)}
            tabIndex="-1"
            style={{ cursor: "pointer" }}
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map(
          (page) => (
            <MDBPaginationItem key={page} active={page + 1 === currentPage}>
              <MDBPaginationLink
                onClick={() => handlePageChange(page + 1)}
                style={{ cursor: "pointer" }}
              >
                {page + 1}
              </MDBPaginationLink>
            </MDBPaginationItem>
          )
        )}
        <MDBPaginationItem
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
        >
          <MDBPaginationLink
            onClick={() => handlePageChange(currentPage + 1)}
            style={{ cursor: "pointer" }}
          >
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </>
  );
}
