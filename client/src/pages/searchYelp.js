import React, { useState, useEffect } from "react";
import { searchYelp } from "../utils/api";
import { useMutation } from "@apollo/client";

const SearchBusinesses = () => {
  // create state for holding returned yelp api data
  const [searchedBiz, setSearchedBiz] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  //state to hold businessId values
  // const [savedBizIds, setSavedBizIds] = useState(getSavedBizIds());
  // useEffect(() => {
  //   return () => saveBizIds(savedBizIds);
  // });

  //function to handle the client's business search input
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchYelp(searchInput);
      console.log(response);
      if (!response.ok) {
        throw new Error("Could not complete search request");
      }
      //map over the yelp results and get endpoints we want
      const { data } = await response.json();
      const bizArray = data.map((biz) => ({
        //todo what data do we want back
      }));

      setSearchedBiz(bizArray);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };





  
};
