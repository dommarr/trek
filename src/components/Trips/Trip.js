import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Button from 'react-bootstrap/Button'

class Trip extends Component {
  state = {
    trip: null
  }

  async componentDidMount () {
    console.log(this.props.user)
    try {
      const response = await axios({
        method: 'GET',
        url: `${apiUrl}/trips/${this.props.match.params.id}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
      this.setState({
        trip: response.data.trip
      })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { trip } = this.state

    return (
      <div>
        { trip && (
          <Fragment>
            <h1>{trip.country}</h1>
            <h2>{trip.city}</h2>
            {(this.props.user && trip) && this.props.user.id === trip.user_id
              ? <Button href={`#trips/${trip.id}/edit`}>Edit Trip</Button>
              : ''
            }
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Trip)
