import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import TripForm from './TripForm'

class CreateTrip extends Component {
  state = {
    trip: {
      country: '',
      city: ''
    }
  }

  handleChange = event => {
    this.setState({
      trip: {
        ...this.state.trip,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/trips`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        trip: this.state.trip
      }
    })
      .then(response => {
        this.props.alert({
          heading: 'Success!',
          message: 'You created a trip.',
          variant: 'success'
        })
        this.props.history.push(`/trips/${response.data.trip.id}`)
      })
      .catch(console.error)
  }

  render () {
    return (
      <TripForm
        trip={this.state.trip}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(CreateTrip)
