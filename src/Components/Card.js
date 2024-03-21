import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
const Card = ({ user }) => {
  const [countryFlag, setCountryFlag] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const countryFlagResponse = await fetch(
        `https://flagcdn.com/w80/${user.nat.toLowerCase()}.png`
      );
      // Set the flag URL
      setCountryFlag(countryFlagResponse.url);
    };
    fetchData();
  }, [user]);
  return (
    <MDBCard className="mb-4">
      <MDBCardBody className="text-center">
        <MDBCardImage
          src={user.picture.large}
          alt="avatar"
          className="rounded-circle"
          style={{ width: "150px" }}
          fluid
        />
        <p className="text-muted mb-1">
          {user.name.title},{user.name.first},{user.name.last}&nbsp; &nbsp;
          {countryFlag && (
            <img
              src={countryFlag}
              alt="country flag"
              style={{ width: "30px", marginRight: "10px" }}
            />
          )}
        </p>
        <div className="mb-4 d-flex align-items-center justify-content-center">
          <p className="text-muted mb-0">{user.gender}</p>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <Link to={`/profilepage/${user.id.value}`} state={{ user: user }}>
            <MDBBtn>View More Details</MDBBtn>
          </Link>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
