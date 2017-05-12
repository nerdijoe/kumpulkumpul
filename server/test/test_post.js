var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var server = require('../app');
var User = require('../models/users');
var Post = require('../models/posts')

describe('Post', () => {

  var token = "";
  var post_id = "";
  beforeEach( done => {
    var newUser = User({
      name: 'rudy',
      username: 'ijo',
      password: passwordHash.generate('haha'),
      email: 'ijo@haha.com',
      phone: '333',
      imageUrl: 'a.jpg'
    })

    newUser.save( (err, user) => {

      // user needs to login first
      chai.request(server)
      .post('/auth/signin')
      .send({
        username: 'ijo',
        password: 'haha'
      })
      .end( (err, result) => {
        token = result.text
        // console.log("++++++ user token = ", token)

        // create post
        var newPost = Post({
          title : "Poem Night",
          time : "2017-05-15 10:00:00",
          place : "Gandaria",
          description : "Poem Night LOL",
          imageUrl : "poem.jpg",
        })
        newPost.save( (err, post) => {
          post_id = post._id
          done()
        })

      })


    })

  })

  afterEach( done => {
    Post.remove({}, err => {
      User.remove({}, err => {
        done();
      })
    })
  });


  describe('POST - create a new post', () => {
    it('should create a new post', done => {

        chai.request(server)
        .post('/posts')
        .set('token', token)
        .send({
          title : "Trivia Night",
          time : "2017-05-15 10:00:00",
          place : "PIM2",
          description : "Let's play!!",
          imageUrl : "trivia.jpg",

        })
        .end ( (err, result) => {
          result.should.have.status(200)
          result.body.should.be.an('object')

          // console.log(result.body)
          result.body.should.have.property('title')
          result.body.should.have.property('time')
          result.body.should.have.property('place')
          result.body.should.have.property('description')
          result.body.should.have.property('imageUrl')
          result.body.should.have.property('createdAt')

          result.body.title.should.equal('Trivia Night')
          result.body.time.should.equal('2017-05-15 10:00:00')
          result.body.place.should.equal('PIM2')
          result.body.description.should.equal("Let's play!!")
          result.body.imageUrl.should.equal('trivia.jpg')

          done()
        })


    }); // it
  }); // describe

  describe('GET - all posts', () => {
    it('should return all posts', done => {
      chai.request(server)
      .get('/posts')
      .set('token', token)
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.records.length.should.equal(1)

        done()
      })
    });
  });

  describe('GET - one post by id', () => {
    it('should return that post', done => {
      chai.request(server)
      .get('/posts/' + post_id)
      .set('token', token)
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')

        result.body.title.should.equal('Poem Night')
        result.body.time.should.equal('2017-05-15 10:00:00')
        result.body.place.should.equal('Gandaria')
        result.body.description.should.equal("Poem Night LOL")
        result.body.imageUrl.should.equal('poem.jpg')


        done()
      })
    });
  });

  describe('PUT - edit post by id', () => {
    it('should edit that post', done => {

      chai.request(server)
      .put('/posts/'+post_id)
      .set('token', token)
      .send({
        title : "VR Night",
        time : "2017-05-15 15:00:00",
        place : "Gandaria",
        description : "VR time!",
        imageUrl : "vr.jpg",

      })
      .end ( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')

        // console.log(result.body)
        result.body.should.have.property('title')
        result.body.should.have.property('time')
        result.body.should.have.property('place')
        result.body.should.have.property('description')
        result.body.should.have.property('imageUrl')
        result.body.should.have.property('createdAt')

        result.body.title.should.equal('VR Night')
        result.body.time.should.equal('2017-05-15 15:00:00')
        result.body.place.should.equal('Gandaria')
        result.body.description.should.equal("VR time!")
        result.body.imageUrl.should.equal('vr.jpg')

        done()
      })

    });
  });

  describe('DELETE - delete a post', () => {
    it('should delete that post', done => {

      chai.request(server)
      .delete('/posts/'+post_id)
      .set('token', token)
      .end ( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')

        // console.log(result.body)
        result.body.should.have.property('title')
        result.body.should.have.property('time')
        result.body.should.have.property('place')
        result.body.should.have.property('description')
        result.body.should.have.property('imageUrl')
        result.body.should.have.property('createdAt')

        result.body.title.should.equal('Poem Night')
        result.body.time.should.equal('2017-05-15 10:00:00')
        result.body.place.should.equal('Gandaria')
        result.body.description.should.equal("Poem Night LOL")
        result.body.imageUrl.should.equal('poem.jpg')

        done()
      })


    });
  });


});
