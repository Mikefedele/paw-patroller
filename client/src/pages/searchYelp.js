import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { searchYelpApi } from "../utils/api";
import { mainSearch } from "../utils/api";
import Auth from '../utils/auth';
import { useMutation } from "@apollo/client";
const CORS = "https://cors-anywhere.herokuapp.com/"


const SearchBusinesses = () => {
  // create state for holding returned yelp api data
  const [searchedBiz, setSearchedBiz] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  //  state to hold businessId values
//    const [savedBizIds, setSavedBizIds] = useState(getSavedBizIds());
//    useEffect(() => {
//     return () => saveBizIds(savedBizIds);
//  });

  //function to handle the client's business search input
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
try{
    const response = await searchYelpApi(searchInput)


    // const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=dogs_allowed&location=${searchInput}`, {
    //       method: 'GET',
    //       headers: {
    //         authorization: `Bearer sFDrQ2pCQos8PDSDDwhIcVDKCUPVRHBWQf8OUcjX3PKW-d6e0S_uxIlVXXbHGFf96nF8w-VqDPw_2ZzSU-5-ievJLv_YlGpOQkamfNYe3l5k3b0BnlP2gTXQ5ZyLYnYx`,
    //       }
    //     }) 
        console.log(response)
        const data = await response.json();
            console.log(data)

      // searchYelpApi(searchInput);
      // console.log(response);
      // if (!response) {
      //   throw new Error("Could not complete search request");
      // }
      // // //map over the yelp results and get endpoints we want

      const bizArray = data.businesses.map((biz) => ({
        name: biz.name,
        id: biz.id,
        image: biz.image_url,
        rating: biz.rating,
        street: biz.location.display_address,
        city: biz.city,
        zip: biz.zip_code
      }));
      console.log(bizArray);
      setSearchedBiz(bizArray);
      

      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  // const handleSaveBiz = async (bizId) => {
    // find the book in `searchedBooks` state by the matching id
    // const bizToSave = savedBizIds.find((biz) => biz.bizId === bizId);

    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    // try {
    //   const { data } = await saveBiz({ 
    //    variables: {bizData: {...bizToSave}}
    //   })

      // if book successfully saves to user's account, save book id to state
  //     setSavedBizIds([...savedBizIds, bizToSave.bizId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search For Dog Friendly Businesses</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
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
            : 'Search to begin'}
        </h2>
        <CardColumns>
          {searchedBiz.map((biz) => {
            return (
              <Card key={biz.id} border='dark'>
                {biz.image ? (
                  <Card.Img src={biz.image} alt={`The cover for ${biz.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{biz.name}</Card.Title>
                  <p className='small'>Location: {}</p>
                  <Card.Text>{biz.street}</Card.Text>
                 
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

// {Auth.loggedIn() && (
//   <Button
//     disabled={savedBizIds?.some((savedBizId) => savedBizId === biz.bizId)}
//     className='btn-block btn-info'
//     onClick={() => handleSaveBiz(biz.bizId)}>
//     {savedBizIds?.some((savedBizId) => savedBizId === biz.bizId)
//       ? 'This business has already been saved!'
//       : 'Save this Business!'}
//   </Button>
// )}



