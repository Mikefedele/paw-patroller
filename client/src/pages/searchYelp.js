import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card } from "react-bootstrap";
import { searchMain, searchYelpApi } from "../utils/api";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_BUSINESS } from "../utils/mutations";
import { getSavedBizIds, saveBizIds } from "../utils/loacalStorage";

const SearchBusinesses = () => {
  // create state for holding returned yelp api data
  const [searchedBiz, setSearchedBiz] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

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
    const bizToSave = searchedBiz.find((biz) => biz.bizId === bizId);

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
        },
      });
      // console.log(data);
      // if biz successfully saves to user's account, save biz id to state
      setSavedBizIds([...savedBizIds, bizToSave.bizId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid="true" className="text-light bg-dark">
        <Container>
          <h1>Search For Dog Friendly Businesses</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for Dog Friendly Businesses"
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
      </div>

      <Container>
        <h2>
          {searchedBiz.length
            ? `Viewing ${searchedBiz.length} results:`
            : "Search to begin"}
        </h2>
        <Col>
          {searchedBiz.map((biz) => {
            return (
              <Card key={biz.bizId} border="dark">
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
                  <Card.Text>{biz.street}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBizIds?.some(
                        (savedBizId) => savedBizId === biz.bizId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBiz(biz.bizId)}
                    >
                      {savedBizIds?.some(
                        (savedBizId) => savedBizId === biz.bizId
                      )
                        ? "This business has already been saved!"
                        : "Save this Business!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Container>
    </>
  );
};

export default SearchBusinesses;

// {Auth.loggedIn() && (
//   <Button
//     disabled={savedBizIds?.some((savedBizId) => savedBizId === biz.bizId)}
//     className='btn-block btn-info'
//     onClick={() => handleSaveBiz(biz.bizId)}>
//     {savedBizIds?.some((savedBizId) => savedBizId === biz.bizId)

//       : 'Save this Business!'}
//   </Button>
// )}

//
