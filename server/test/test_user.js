var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var server = require('../app');
var User = require('../models/users');

describe('User', () => {

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
      done()
    })
  })

  afterEach( done => {
    User.remove({}, err => {
      done();
    })
  });

  describe('GET - all users', () => {
    it('returns array of users', done => {
      chai.request(server)
      .get('/users')
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('array')

        // console.log("********************** get all user ",result.body)
        result.body.length.should.equal(1)

        result.body[0].should.have.property('name')
        result.body[0].should.have.property('username')
        result.body[0].should.have.property('email')
        result.body[0].should.have.property('password')
        result.body[0].should.have.property('phone')
        result.body[0].should.have.property('imageUrl')

        result.body[0].name.should.equal("rudy")
        result.body[0].username.should.equal("ijo")
        result.body[0].email.should.equal("ijo@haha.com")
        result.body[0].phone.should.equal("333")
        result.body[0].imageUrl.should.equal("a.jpg")


        done()
      })
    });
  });


  describe('POST - user signup using the same username', () => {
    it('should return array of users object', done => {
      chai.request(server)
      .post('/auth/signup')
      .send({
        name: 'rudy',
        username: 'ijo',
        password: passwordHash.generate('haha'),
        email: 'ijo@haha.com',
        phone: '333',
        imageUrl: 'a.jpg'
      })
      .end( (err, result) => {
        result.should.have.status(200)
        // console.log(result.body)
        result.body.should.be.an('array')

        result.body[0].should.have.property('name')
        result.body[0].should.have.property('username')
        result.body[0].should.have.property('email')
        result.body[0].should.have.property('password')
        result.body[0].should.have.property('phone')
        result.body[0].should.have.property('imageUrl')

        result.body[0].name.should.equal("rudy")
        result.body[0].username.should.equal("ijo")
        result.body[0].email.should.equal("ijo@haha.com")
        result.body[0].phone.should.equal("333")
        result.body[0].imageUrl.should.equal("a.jpg")


        done()
      })
    }); // it
  }); // describe

  describe('POST user signin', () => {
    it('return token', done => {
      chai.request(server)
      .post('/auth/signin')
      .send({
        username: 'ijo',
        password: 'haha'
      })
      .end( (err, result) => {
        result.should.have.status(200)
        // console.log(result);
        var token = result.text
        //decode token
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
          // console.log("***** decoded: ", decoded)

          decoded.username.should.equal('ijo')


          done()
        })

      })
    }); // it
  }); // describe

  describe('POST user signin with wrong credential', () => {
    it('return error message', done => {
      chai.request(server)
      .post('/auth/signin')
      .send({
        username: 'ijo',
        password: 'lol'
      })
      .end( (err, result) => {
        result.should.have.status(500)
        // console.log(result.text);

        done()

      })
    }); // it
  }); // describe



});
