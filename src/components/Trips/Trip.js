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

  render () {
    const { trip } = this.state
    const parent = this.state.trip

    return (
      <div>
        { trip && (
          <Fragment>
            <h1 className="text-light mt-3">{trip.city}</h1>
            <h2 className="text-light">{trip.country}</h2>
            <hr/>
            <h4 className="text-light">Your Itinerary</h4>
            {(this.props.user && trip) && this.props.user.id === trip.user_id
              ? <Button href={`#trips/${trip.id}/edit`}>Edit trip</Button>
              : ''
            }
            <Activities user={this.props.user} parenttrip={parent}/>
            <Button className="mt-3 mr-2" href={`#trips/${trip.id}/addactivity`} size="sm" user={this.props.user} parenttrip={parent}>Add activity</Button>
            <Button className="mt-3" href={'#trips/'} size="sm" user={this.props.user}>Back to all trips</Button>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Trip)
