import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Table from 'react-bootstrap/Table'
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
        const match = response.data.activities.filter(activity => activity.trip_id === this.props.parenttrip.id)
        const sortedMatch = match.sort(function (a, b) {
          return new Date(a.begin_date) - new Date(b.begin_date)
        })
        this.setState({ activities: sortedMatch, isLoading: false })
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
        const match = response.data.activities.filter(activity => activity.trip_id === this.props.parenttrip.id)
        this.setState({ activities: match, isLoading: false })
      } catch (error) {
        console.error(error)
      }
    }

    render () {
      const activitiesJsx = this.state.activities.map(activity => (
        <tr key={activity.id}>
          <td>{moment(activity.begin_date).fromNow()}</td>
          <td>{moment(activity.begin_date).calendar()}</td>
          <td>{moment(activity.end_date).calendar()}</td>
          <td>{activity.activity_title}</td>
          <td>
            <Link to={`/activities/${activity.id}/edit`}>
              <Button size="sm" variant="light">Edit</Button>
            </Link>
          </td>
          <td>
            <Button onClick={this.deleteActivity.bind(this, activity)} variant="danger" size="sm">Delete</Button>
          </td>
        </tr>
      ))

      if (this.state.isLoading) {
        return (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )
      }

      return (
        <Table striped bordered hover responsive variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>Starting</th>
              <th>Begin Date</th>
              <th>End Date</th>
              <th>Activity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.activities.length
              ? activitiesJsx
              : <tr><th>Add an activity!</th></tr>
            }
          </tbody>
        </Table>
      )
    }
}

export default Activities
