import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import ActivityForm from './ActivityForm'

class UpdateActivity extends Component {
  state = {
    activity: null
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${apiUrl}/activities/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ activity: response.data.activity })
      })
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'Something went wrong',
        variant: 'danger'
      }))
  }

  handleChange = event => {
    this.setState({
      activity: {
        ...this.state.activity,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/activities/${this.state.activity.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        activity: this.state.activity
      }
    })
      .then(response => {
        this.props.alert({
          heading: 'Success!',
          message: 'You updated an activity.',
          variant: 'success'
        })
        this.props.history.push(`/trips/${response.data.activity.trip_id}`)
      })
      .catch(console.error)
  }

  render () {
    if (!this.state.activity) {
      return (
        <h1>Loading... </h1>
      )
    }
    return (
      <ActivityForm
        activity={this.state.activity}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(UpdateActivity)
