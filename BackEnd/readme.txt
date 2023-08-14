Here are the endpoints for handling CRUD operations on Users, Movies, Members, and Subscriptions:

Users:
GET /api/users: Get all users
GET /api/users/:id: Get a specific user by ID
POST /api/users: Create a new user
PUT /api/users/:id: Update a user by ID
DELETE /api/users/:id: Delete a user by ID

Movies:
GET /api/movies: Get all movies
GET /api/movies/:id: Get a specific movie by ID
POST /api/movies: Create a new movie
PUT /api/movies/:id: Update a movie by ID
DELETE /api/movies/:id: Delete a movie by ID

Members:
GET /api/members: Get all members
GET /api/members/:id: Get a specific member by ID
POST /api/members: Create a new member
PUT /api/members/:id: Update a member by ID
DELETE /api/members/:id: Delete a member by ID

Subscriptions:
GET /api/subscriptions: Get all subscriptions
GET /api/subscriptions/:id: Get a specific subscription by ID
POST /api/subscriptions: Create a new subscription
PUT /api/subscriptions/:id: Update a subscription by ID
DELETE /api/subscriptions/:id: Delete a subscription by ID

auth:
POST /api/auth/login: Check User and Password and Create a new Token
GET /api/auth/sendGenerateToken: Generate 6 digits token and send it by Email
GET /api/auth/verify/:token: verify 6 digits token