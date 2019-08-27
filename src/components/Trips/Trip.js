import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Activities from '../Activities/Activities'

import Button from 'react-bootstrap/Button'

class Trip extends Component {
  state = {
    trip: null
  }

  async componentDidMount () {
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

  // { trip && (
  //   <Fragment>
  //     <h1>{trip.country}</h1>
  //     <h2>{trip.city}</h2>
  //     {(this.props.user && trip) && this.props.user.id === trip.user_id
  //       ? <Button href={`#trips/${trip.id}/edit`}>Edit Trip</Button>
  //       : ''
  //     }
  //   </Fragment>
  // )}

  render () {
    const { trip } = this.state
    const parent = this.state.trip

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
            <Button href={`#trips/${trip.id}/addactivity`} size="sm" user={this.props.user}>Add Activity</Button>
            <Activities user={this.props.user} parentTrip={parent}/>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Trip)
