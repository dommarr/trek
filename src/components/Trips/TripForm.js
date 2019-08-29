import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TripForm = ({ trip, handleChange, handleSubmit }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <h3 className="text-light">Trip</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="city">
          <Form.Label className="text-light">Destination City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a destination city"
            value={trip.city}
            onChange={handleChange}
            name="city"
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label className="text-light">Destination Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a destination country"
            value={trip.country}
            onChange={handleChange}
            name="country"
            required
          />
        </Form.Group>

        <Button className="mt-3 mr-2" variant="primary" type="submit" size="sm">
          Submit
        </Button>
        <Button variant="secondary" className="mt-3" href={'#trips/'} size="sm">Back to trips</Button>
      </Form>
    </div>
  </div>
)

export default TripForm
