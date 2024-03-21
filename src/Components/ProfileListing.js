import React, { useEffect, useState } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import {
  MDBRadio,
  MDBInput,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";
import Card from "./Card";

export default function ProfileListing({ item }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredData = data.filter((item) => {
    const genderMatch = selectedGender === "" || item.gender === selectedGender;
    const nameMatch = item.name.first
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return genderMatch && nameMatch;
  });

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
        <MDBInput
          type="search"
          label="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <MDBBtn color="primary">Search</MDBBtn>
      </div>
      <div style={{ marginLeft: "450px", marginTop: "50px", display: "flex" }}>
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
      <MDBContainer>
        <MDBRow>
          {currentItems.map((item, index) => (
            <MDBCol size="4" key={index}>
              <Card user={item} />
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
      <MDBListGroup style={{ minWidth: "8rem" }} light></MDBListGroup>
      <MDBListGroup style={{ minWidth: "8rem" }} light></MDBListGroup>

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
