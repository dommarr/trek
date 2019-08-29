# Trek

A web app to plan your next great trip.

Users can add trips and build out an itinerary.

### Links
- [Application](https://dommarr.github.io/trek/)
- [Back end](https://trek-trips.herokuapp.com/)
- [Front end repo](https://github.com/dommarr/trek)
- [Back end repo](https://github.com/dommarr/trek-back-end)

### Front End Setup
1. Fork and clone this repository.
2. Install dependencies with `npm install`.
3. Use `npm start server` to spin up develpment server.

### Back End Setup
1. Fork and clone this repository.
2. Install dependencies with `bundle install`.
3. Use `bin/rails server` to spin up develpment server.

### Screenshots
![Trips Page](https://i.imgur.com/AKVDTu4.png "Trips Page")

![Activities Page](https://i.imgur.com/PHCg4fL.png "Activities Page")

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

The application will have a two one-to-many relationships: users to trips and trips to activities.

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
- activity_title: string
- trip_id: index
- id: index
```

### Routes

|Prefix| Verb  | URI Pattern      |          Controller#Action|
|:------|:-------|:------------------|:---------------------------|
| trips | GET    |/trips(.:format)   |        trips#index |
|    trips     |  POST  |   /trips(.:format)      |       trips#create |
| trip   |  GET   |   /trips/:id(.:format)     |    trips#show |
|  trip      |  PATCH  |  /trips/:id(.:format)     |    trips#update |
|   trip     |  PUT   |   /trips/:id(.:format)     |    trips#update |
|   trip     |  DELETE |  /trips/:id(.:format)     |    trips#destroy |
| activities |  GET  |    /activities(.:format)    |    activities#index |
|    activities        |  POST  |   /activities(.:format)    |    activities#create |
| activity |  GET   |   /activities/:id(.:format)  |  activities#show |
|     activity     |  PATCH  |  /activities/:id(.:format)  |  activities#update |
|    activity      |  PUT   |   /activities/:id(.:format)  |  activities#update |
|     activity     |  DELETE  | /activities/:id(.:format)  |  activities#destroy |
| sign_up  | POST   |  /sign-up(.:format)       |    users#signup |
| sign_in  | POST  |   /sign-in(.:format)      |     users#signin |
| sign_out  | DELETE  | /sign-out(.:format)    |      users#signout |
| change_password  | PATCH  |  /change-password(.:format) |  users#changepw |


### ERD

![ERD](https://i.imgur.com/uoK6TmK.png "ERD")

### Wireframes

![Sign Up / Sign In](https://i.imgur.com/0OVFjxE.png "Sign Up / Sign In")
![Trips](https://i.imgur.com/2mUPppF.png "Trips")
![Activities](https://i.imgur.com/4O5KSKp.png "Activities")

### Unsolved Issues / Future Features
- Improve input field for activity date and time.
- Allow for more detail to be saved within trip (flight info, hotel, etc.).
- Connect to Google API, so users can search and select locations for activities.
  - Could then incorporate directions to each activity.
- Allow users to invite others to collaboratively build itinerary.
