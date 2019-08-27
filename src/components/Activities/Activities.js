import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

class Activities extends Component {
  // constructor (props) {
  //   super(props)
  //
  //   this.
    state = {
      activities: [],
      isLoading: true
    }
    // }

    // console.log(response)
    // console.log(this.props.match.params.id)
    // // do something with response
    // const match = response.data.filter(activity => activity.trip_id === this.props.match.params.id)

    async componentDidMount () {
      try {
        // await the response from API call
        const response = await axios({
          method: 'GET',
          url: `${apiUrl}/activities`,
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
        const match = response.data.activities.filter(activity => activity.trip_id === this.props.parentTrip.id)
        console.log(response.data.activities.trip_id)
        console.log(match)
        this.setState({ activities: response.data.activities, isLoading: false })
      } catch (error) {
        console.error(error)
      }
    }

    async deleteActivity (activity) {
      try {
        // await the response from API call
        await axios({
          method: 'DELETE',
          url: `${apiUrl}/trips/${this.props.match.params.id}/activities/${activity.id}`,
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
        const response = await axios({
          method: 'GET',
          url: `${apiUrl}/trips/${this.props.match.params.id}/activities`,
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
        // do something with response
        this.setState({ activities: response.data.activities, isLoading: false })
      } catch (error) {
        console.error(error)
      }
    }

    render () {
      const activitiesJsx = this.state.activities.map(activity => (
        <ListGroup.Item key={activity.id} variant="flush">
          <p>{activity.begin_date} {activity.end_date} {activity.activity_title}</p>
          <Button onClick={this.deleteActivity.bind(this, activity)} variant="danger" size="sm">Delete Activity</Button>
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
          {this.state.activities.length
            ? activitiesJsx
            : <ListGroup.Item>No activities found</ListGroup.Item>
          }
        </ListGroup>
      )
    }
}

export default Activities
