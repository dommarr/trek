import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

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
      <ListGroup.Item key={trip.id}>
        <Link to={`/trips/${trip.id}`}>{trip.city ? `${trip.city},` : ''} {trip.country}</Link>
        <Link to={`/trips/${trip.id}/edit`}>
          <Button size="sm" className="mr-2">Edit</Button>
        </Link>
        <Button onClick={this.deleteTrip.bind(this, trip)} variant="danger" size="sm">Delete</Button>
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
      <Fragment>
        <Image className="mt-3 mb-3" src="https://i.imgur.com/9KyrdjV.jpg" fluid />
        <h3 className="text-light">Your Trips</h3>
        <ListGroup>
          {this.state.trips.length
            ? tripsJsx
            : <ListGroup.Item>No trips found</ListGroup.Item>
          }
        </ListGroup>
      </Fragment>
    )
  }
}

export default Trips
