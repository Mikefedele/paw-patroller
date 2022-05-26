import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Jumbotron,
} from "react-bootstrap";
import { searchYelpApi } from "../utils/api";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BUSINESS } from "../utils/mutations";
import { getSavedBizIds, saveBizIds } from "../utils/localStorage";
import { QUERY_ME } from "../utils/queries";

const SearchBusinesses = () => {
  // create state for holding returned yelp api data
  const [searchedBiz, setSearchedBiz] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  console.log(user.businesses);

  //  state to hold businessId values

  const [savedBizIds, setSavedBizIds] = useState(getSavedBizIds());
  const [addBusiness, { error }] = useMutation(ADD_BUSINESS);

  useEffect(() => {
    return () => saveBizIds(savedBizIds);
  });

  //function to handle the client's business search input
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("here");
    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchYelpApi(searchInput);
      console.log(response);
      if (!response.ok) {
        throw new Error("Could not complete search request");
      }
      //map over the yelp results and get endpoints we want
      const data = await response.json();
      console.log(data);
      const bizArray = data?.businesses.map((biz) => ({
        //todo what data do we want back
        name: biz.name,
        id: biz.id,
        image: biz.image_url,
        rating: biz.rating,
        street: biz.location.address1,
        city: biz.city,
        zip: biz.zip_code,
        url: biz.url,
      }));

      setSearchedBiz(bizArray);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBiz = async (bizId) => {
    // find the book in `searchedBooks` state by the matching id
    const bizToSave = searchedBiz.find((biz) => biz.id === bizId);
    console.log(bizToSave);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await addBusiness({
        variables: {
          name: bizToSave.name,
          yelpId: bizToSave.id,
          url: bizToSave.url,
          location: bizToSave.street,
          imgUrl: bizToSave.image,
        },
      });
      // console.log(data);
      // if biz successfully saves to user's account, save biz id to state
      setSavedBizIds([...savedBizIds, bizToSave.bizId]);
      alert("Business saved to your profile")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-danger">
        <Container>
          <h1><mark>Search For Dog Friendly Businesses Nearby</mark></h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search by City, State or Zip"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      

      <Container>
        <h2>
          {searchedBiz.length
            ? `Viewing ${searchedBiz.length} results:`
            : "Search to begin"}
        </h2>

        <CardColumns>
          {searchedBiz.map((biz) => {
            return (
              <Card key={biz.id} border="dark">
                {biz.image ? (
                  <Card.Img
                    src={biz.image}
                    alt={`The cover for ${biz.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{biz.name}</Card.Title>
                  <p className="small">Location: {}</p>
                  <Card.Text>
                    {biz.street}                    
                  </Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBizIds?.some(
                        (savedBizId) => savedBizId === biz.id
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBiz(biz.id)}
                    >
                      {savedBizIds?.some((savedBizId) => savedBizId === biz.id)
                        ? "This business has already been saved!"
                        : "Save this Business!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBusinesses;


