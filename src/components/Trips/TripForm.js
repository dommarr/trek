import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TripForm = ({ trip, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="country">
      <Form.Label>Trip Country</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter a destination country"
        value={trip.country}
        onChange={handleChange}
        name="country"
        required
      />
    </Form.Group>

    <Form.Group controlId="city">
      <Form.Label>City</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter a destination city"
        value={trip.city}
        onChange={handleChange}
        name="city"
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
)

export default TripForm
