# KumpulKumpul
MeetUp Clone


___
#### User RSVP to event
```
POST localhost:3000/posts/:id/addRsvp

```
**Note:** id is the post._id

It will return post object json
```
{
  "_id": "59152319e935fe0b7ad1f166",
  "title": "Game Night",
  "time": "2017-05-15 10:00:00",
  "place": "PIM2",
  "description": "Let's play!!",
  "imageUrl": "http://i.imgur.com/FSUdequ.jpg",
  "__v": 2,
  "createdAt": "2017-05-12T02:51:05.219Z",
  "rsvp": [
    "59148b5383b3220bf5ec9449",
    "591524cb06bf230bc8465f98"
  ]
}
```

if user has already RSVP, it will return this json:
```
{
  "message": "User has already RSVP to this event."
}
```
___
