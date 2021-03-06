import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'

class Trips extends Component {
  constructor () {
    super()

    this.state = {
      trips: [],
      isLoading: true
    }
  }

  async componentDidMount () {
    try {
      const response = await axios({
        method: 'GET',
        url: `${apiUrl}/trips`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
      this.setState({ trips: response.data.trips, isLoading: false })
    } catch (error) {
      console.error(error)
    }
  }

  async deleteTrip (trip) {
    try {
      await axios({
        method: 'DELETE',
        url: `${apiUrl}/trips/${trip.id}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
      const response = await axios({
        method: 'GET',
        url: `${apiUrl}/trips`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
      this.setState({ trips: response.data.trips, isLoading: false })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const tripsJsx = this.state.trips.map(trip => (
      <Card key={trip.id} className="mt-1 mb-1">
        <Card.Body className="tripCard justify-content-between">
          <ButtonToolbar className="justify-content-between">
            <ButtonGroup aria-label="First group">
              <Button href={`#trips/${trip.id}`} variant="outline-dark">{trip.city ? `${trip.city},` : ''} {trip.country}</Button>
            </ButtonGroup>
            <ButtonGroup aria-label="second group">
              <Button href={`#trips/${trip.id}/edit`} variant="dark">Edit</Button>
              <Button onClick={this.deleteTrip.bind(this, trip)} variant="danger">Delete</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }

    return (
      <Fragment>
        <Carousel className="mt-2 mb-2 carousel-fade">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/LSPzb6z.jpg"
              alt="Lush hills and fjords"
            />
            <Carousel.Caption>
              <div className="caption pt-2 pb-1">
                <h1 className="logo">🌎</h1>
                <div className="quote">
                  <h1 className="text-white">Trek</h1>
                  <p className="text-white mb-0">Live life with no excuses, travel with no regret.</p>
                  <p className="text-white">- Oscar Wilde</p>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/CowuTKx.jpg"
              alt="Tropical beach"
            />

            <Carousel.Caption>
              <div className="caption pt-2 pb-1">
                <h1 className="logo">🌎</h1>
                <div className="quote">
                  <h1 className="text-white">Trek</h1>
                  <p className="text-white mb-0">It is not down in any map; true places never are.</p>
                  <p className="text-white">- Herman Melville</p>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/lPYa2nZ.jpg"
              alt="Desert mountain road"
            />

            <Carousel.Caption>
              <div className="caption pt-2 pb-1">
                <h1 className="logo">🌎</h1>
                <div className="quote">
                  <h1 className="text-white">Trek</h1>
                  <p className="text-white mb-0">A good traveler has no fixed plans, and is not intent on arriving.</p>
                  <p className="text-white">- Lao Tzu</p>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h3 className="text-light">Your Trips</h3>
        <ListGroup>
          {this.state.trips.length
            ? tripsJsx
            : <ListGroup.Item>No trips found</ListGroup.Item>
          }
        </ListGroup>
        <Button className="mt-3 mb-5" href={'#createtrip/'}>Create trip</Button>
      </Fragment>
    )
  }
}

export default Trips
