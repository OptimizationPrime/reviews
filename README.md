# Project Name

> This projects features a mock version of Turila's neighborhood reviews. Users can see neighborhood stats and filter reviews based on a variety of categories.


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Set-up

1. `npm install`
2. `npm run webpack` to run webpack
3. `npm start` to run the express-server

## Requirements

- Node 14.15.0


## REVIEWS CRUD

### Read reviews

**Endpoint:** `/:id/neighborhood_reviews`

**Method:** GET

**Request:** `{id: number, category: string}`

**Response:** JSON
```
{
  'username': result[i].name,
  'user_type': result[i].user_type,
  'review_date': result[i].review_date,
  'full_text': result[i].full_text,
  'likes': result[i].likes,
  'category': {
    'parent': result[i].parent === 1 ? true : false,
    'commute': result[i].commute === 1 ? true : false,
    'dog_owner': result[i].dog_owner === 1 ? true : false,
    'community': result[i].community === 1 ? true : false,
  }
}
```

### Create review
* **Endpoint:** `/:id/neighborhood_reviews/`
* **Method:** POST
* **Request:**
* **Response:** HTTP Status Code `201`

### Update review
* **Endpoint:** `/:id/neighborhood_reviews`
* **Method:** PATCH
* **Request:**
* **Response:**: HTTP Status Code `200`

### Delete review
* **Endpoint:** `/:id/neighborhood_reviews`
* **Method:** DELETE
* **Request:**
* **Response:**: HTTP Status Code `200`


### Read stats
* **Endpoint:** `/:id/neighborhood_stats`
* **Method:** GET
* **Request:** `{id: number}`
* **Response:**: JSON
```
{
  'dog_friendly': result[i].dog_friendly,
  'grocery_stores': result[i].grocery_stores,
  'neighbors_friendly': result[i].neighbors_friendly,
  'parking_easy': result[i].parking_easy,
  yard: result[i].yard,
  'community_events': result[i].community_events,
  sidewalks: result[i].sidewalks,
  'walk_night': result[i].walk_night,
  'five_years': result[i].five_years,
  'kids_outside': result[i].kids_outside,
  car: result[i].car,
  restaurants: result[i].restaurants,
  streets: result[i].streets,
  holiday: result[i].holiday,
  quiet: result[i].quiet,
  wildlife: result[i].wildlife,
}
```