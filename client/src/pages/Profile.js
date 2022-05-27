import React from 'react';
// import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BUSINESS } from '../utils/mutations'
import Auth from '../utils/auth';
import {
  CardColumns,
  Card,
  Button,
  Container
} from 'react-bootstrap';

// const imageStyle = {width: "150px", height: "150px"};

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [removeBusiness, { error }] = useMutation(REMOVE_BUSINESS);

  const user = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleDeleteBusiness = async (businessId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBusiness({
        variables: { businessId },
      });
      window.location.reload(false);
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };
console.log(user.businesses)
  return (
    <div>
      <Container>
        <h2>
          Viewing {user.username}'s profile.
        </h2>

        <div>
          <h3>Favorite Businesses</h3>
          <CardColumns>
            {user.businesses.map((business) => (
              <Card key={business._id} style={{ width: '20rem' }} >
                {business.imgUrl ? (
                  <Card.Img
                    src={business.imgUrl}
                    alt={`The cover for ${business.name}`}
                    variant="top"
                    // style={imageStyle}
                    
                  />
                ) : null}
                <a href= {business.url} target="_blank" rel="noreferrer"><Card.Title>{business.name}</Card.Title></a>
                <Card.Text>{business.location}</Card.Text>
                <Button variant="primary" onClick={() => handleDeleteBusiness(business._id)}>
                  Remove from favorites
                  </Button>
              </Card>
              
            ))}
          </CardColumns>
          

        </div>
      </Container>
    </div>
  );
};

export default Profile;
