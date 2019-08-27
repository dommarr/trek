import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import TripForm from './TripForm'

class UpdateTrip extends Component {
  state = {
    trip: null
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${apiUrl}/trips/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ trip: response.data.trip })
      })
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'Something went wrong',
        variant: 'danger'
      }))
  }

  handleChange = event => {
    // const updatedField = {
    //   [event.target.name]: event.target.value
    // }
    // const editedBook = Object.assign(this.state.book, updatedField)
    // this.setState({ book: editedBook })

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
      method: 'PATCH',
      url: `${apiUrl}/trips/${this.state.trip.id}`,
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
          message: 'You updated a trip.',
          variant: 'success'
        })
        this.props.history.push(`/trips/${this.state.trip.id}`)
      })
      .catch(console.error)
  }

  render () {
    if (!this.state.trip) {
      return (
        <h1>Loading... </h1>
      )
    }
    return (
      <TripForm
        trip={this.state.trip}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(UpdateTrip)
