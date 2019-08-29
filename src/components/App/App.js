import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Trips from '../Trips/Trips'
import Trip from '../Trips/Trip'
import CreateTrip from '../Trips/CreateTrip'
import UpdateTrip from '../Trips/UpdateTrip'
import CreateActivity from '../Activities/CreateActivity'
import UpdateActivity from '../Activities/UpdateActivity'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  // <div className="row logo">
  //   <div className="col-sm-10 col-md-8 mx-auto mt-5">
  //   </div>
  // </div>

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/trips' render={() => (
            <Trips user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/trips/:id' render={() => (
            <Trip user={user} alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} path='/createtrip' render={() => (
            <CreateTrip user={user} alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/trips/:id/edit' render={() => (
            <UpdateTrip user={user} alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} path='/trips/:id/addactivity' render={() => (
            <CreateActivity user={user} alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} path='/activities/:id/edit' render={() => (
            <UpdateActivity user={user} alert={this.alert}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
