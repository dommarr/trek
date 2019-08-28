import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

class Activities extends Component {
    state = {
      activities: [],
      isLoading: true
    }

    async componentDidMount () {
      try {
        const response = await axios({
          method: 'GET',
          url: `${apiUrl}/activities`,
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
        const match = response.data.activities.filter(activity => activity.trip_id === this.props.parentTrip.id)
        this.setState({ activities: match, isLoading: false })
      } catch (error) {
        console.error(error)
      }
    }

    async deleteActivity (activity) {
      try {
        await axios({
          method: 'DELETE',
          url: `${apiUrl}/activities/${activity.id}`,
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
        const response = await axios({
          method: 'GET',
          url: `${apiUrl}/activities`,
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
        const match = response.data.activities.filter(activity => activity.trip_id === this.props.parentTrip.id)
        this.setState({ activities: match, isLoading: false })
      } catch (error) {
        console.error(error)
      }
    }

    render () {
      const activitiesJsx = this.state.activities.map(activity => (
        <ListGroup.Item key={activity.id} variant="flush">
          <p>{activity.begin_date} {activity.end_date} {activity.activity_title}</p>
          <Link to={`/activities/${activity.id}/edit`}>
            <Button size="sm">Edit Activity</Button>
          </Link>
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
