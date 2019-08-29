import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Datetime from 'react-datetime'

// <Form.Group controlId="activity_title">
//   <Form.Label className="text-light">Activity</Form.Label>
//   <Datetime value={activity.end_date} onChange={handleChange} name="end_date"/>
// </Form.Group>

const ActivityForm = ({ activity, handleChange, handleSubmit }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <h3 className="text-light">Add an Activity</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="begin_date" className="mt-3">
          <Form.Label className="text-light">Begin Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={activity.begin_date}
            onChange={handleChange}
            name="begin_date"
            required
          />
        </Form.Group>

        <Form.Group controlId="end_date">
          <Form.Label className="text-light">End Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={activity.end_date}
            onChange={handleChange}
            name="end_date"
            required
          />
        </Form.Group>

        <Form.Group controlId="activity_title">
          <Form.Label className="text-light">Activity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the activty"
            value={activity.activity_title}
            onChange={handleChange}
            name="activity_title"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" size="sm">
          Submit
        </Button>
      </Form>
    </div>
  </div>
)

export default ActivityForm
