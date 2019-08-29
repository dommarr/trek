import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

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
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3 className="text-light">Activity</h3>
            <ActivityForm
              activity={this.state.activity}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <Button variant="secondary" href={`#trips/${this.state.activity.trip_id}`} size="sm">Back to trip</Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(UpdateActivity)
