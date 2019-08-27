import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ActivityForm = ({ activity, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="begin_date">
      <Form.Label>Begin Date</Form.Label>
      <Form.Control
        type="date"
        value={activity.begin_date}
        onChange={handleChange}
        name="begin_date"
        required
      />
    </Form.Group>

    <Form.Group controlId="end_date">
      <Form.Label>End Date</Form.Label>
      <Form.Control
        type="date"
        value={activity.end_date}
        onChange={handleChange}
        name="end_date"
      />
    </Form.Group>

    <Form.Group controlId="activity_title">
      <Form.Label>Activity</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the activty"
        value={activity.activity_title}
        onChange={handleChange}
        name="activity_title"
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
)

export default ActivityForm
