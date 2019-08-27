import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

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
      // await the response from API call
      const response = await axios({
        method: 'GET',
        url: `${apiUrl}/trips`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
      // do something with response
      this.setState({ trips: response.data.trips, isLoading: false })
    } catch (error) {
      console.error(error)
    }
  }

  deleteTrip = (trip) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/trips/${trip.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
  }

  render () {
    const tripsJsx = this.state.trips.map(trip => (
      <ListGroup.Item key={trip.id}>
        <Link to={`/trips/${trip.id}`}>{trip.city}, {trip.country}</Link>
        <Link to={`/trips/${trip.id}/edit`}>
          <Button size="sm">Edit Trip</Button>
        </Link>
        <Button onClick={this.deleteTrip.bind(this, trip)} variant="danger" size="sm">Delete Trip</Button>
      </ListGroup.Item>
    ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }

    return (
      <ListGroup>
        {this.state.trips.length
          ? tripsJsx
          : <ListGroup.Item>No trips found</ListGroup.Item>
        }
      </ListGroup>
    )
  }
}

export default Trips
