import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import ActivityForm from './ActivityForm'

class CreateActivity extends Component {
  state = {
    activity: {
      begin_date: '',
      end_date: '',
      activity_title: ''
    }
  }

  handleChange = event => {
    // const updatedField = {
    //   [event.target.name]: event.target.value
    // }
    // const editedBook = Object.assign(this.state.book, updatedField)
    // this.setState({ book: editedBook })

    this.setState({
      activity: {
        ...this.state.activity,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.props.match.params.id)
    console.log(this.props.user.id)
    console.log(this.state.activity.begin_date)
    axios({
      method: 'POST',
      url: `${apiUrl}/activities`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        activity: {
          'begin_date': this.state.activity.begin_date,
          'end_date': this.state.activity.end_date,
          'activity_title': this.state.activity.activity_title,
          'trip_id': parseInt(this.props.match.params.id),
          'user_id': this.props.user.id
        }
      }
    })
      .then(response => {
        this.props.alert({
          heading: 'Success!',
          message: 'You added an activity.',
          variant: 'success'
        })
        this.props.history.push(`/trips/${response.data.trip_id}`)
      })
      .catch(console.error)
  }

  render () {
    return (
      <ActivityForm
        activity={this.state.activity}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(CreateActivity)
