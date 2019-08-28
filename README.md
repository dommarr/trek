# Trek

A web app to plan your next great trip.

Users can add trips and build out an itinerary.

### Links
- [Application](https://dommarr.github.io/trek/)
- [Back end](https://trek-trips.herokuapp.com/)
- [Front end repo](https://github.com/dommarr/trek)
- [Back end repo](https://github.com/dommarr/trek-back-end)

### Development
1. Planning:
  1. Create user stories.
  2. Develop wireframes.
  3. Develop ERD.
2. Build out back end.
  1. Decided to use Ruby, Rails.
  2. Scaffold api.
  3. Create and update database.
3. Build out front end.
  1. Decided to use JS, React.
  2. Work through CRUD on the first resource (trips).
  3. Work through CRUD on the second resource (activities).
4. Once the above is complete, shift to general (non-api) front end functionality.
5. Then focus on styling.

### Technologies
- HTML
- Bootstrap
- Javascript
- React
- Ruby
- Rails

### User Stories

```md
As a user, I want to sign up & auto sign in.
As a user, I want to sign in.
As a signed-in user, I want to change my password.
As a signed-in user, I want to sign out.
As a signed-in user, I want to add a new trip.
As a signed-in user, I want to edit existing trips.
As a signed-in user, I want to delete existing trips.
As a signed-in user, I want to add activities to my trip.
As a signed-in user, I want to edit and/or delete activities.
```

### Database

The application will have a simple one to many relationship between two tables: users and trips.

```md
Table: Users
- email: string
- id: index

Table: Trips
- country: string
- city: string
- id: index

Table: Activities
- begin_date: datetime
- end_date: datetime
- activity: string
- trip_id: index
- id: index
```

### ERD

![ERD](https://i.imgur.com/uoK6TmK.png "ERD")

### Wireframes

![Sign Up / Sign In](https://i.imgur.com/0OVFjxE.png "Sign Up / Sign In")
![Trips](https://i.imgur.com/2mUPppF.png "Trips")
![Activities](https://i.imgur.com/4O5KSKp.png "Activities")

### Unsolved Issues / Future Features
- Improve styling.
- Set timebound streaks, so it resets to zero if the habit has not been completed in a day.
- Add icons.
- Track longest streak for every habit.
- Show percent completion over time.
