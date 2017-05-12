var mongoose = require('mongoose');
let helperJob = require('../helpers/cron_job_email')

const Post = require('../models/posts')
const methods = {}

methods.insertOne = function(req, res) {
    Post.create(req.body, function(error, record) {
        if (error) {
            res.json({
                error
            })
        } else {
            res.json(record)
        }
    })
}

methods.getAll = function(req, res) {
    Post.find({})
        .populate('user_id rsvp')
        .exec((error, records) => {
            if (error) {
                res.json({
                    error
                })
            } else {
                // res.send(records)
                let arr = [];
                records.forEach(function(val) {
                    let obj = {};
                    obj._id = val._id;
                    obj.title = val.title;
                    obj.time = val.time;
                    obj.place = val.place;
                    obj.description = val.description;
                    obj.imageUrl = val.imageUrl;
                    obj.user_id = val.user_id
                    obj.createdAt = val.createdAt;
                    obj.rsvp = val.rsvp;
                    arr.push(obj);
                })
                res.json({records: arr, success: true});
            }
        })
}

methods.getById = function(req, res){
  Post.findById(req.params.id).populate('user_id rsvp').exec((error, record) => {
   if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })

}

methods.updateById = function(req, res) {
    Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        .exec((error, record) => {
            if (error) {
                res.json({
                    error
                })
            } else {
                res.json(record)
            }
        })
}

methods.deleteById = function(req, res) {
    Post.findByIdAndRemove(req.params.id)
        .exec((error, record) => {
            if (error) {
                res.json({
                    error
                })
            } else {
                res.json(record)
            }
        })
}


methods.addRsvp = function(req, res) {
  var user_id = req.decoded._id;
  console.log("** add RSVP, user_id=", user_id)

  Post.findById( req.params.id, (error, post) => {
    if(error) res.json({error})
    else {
      if(post){

        var is_found = false;
        post.rsvp.map( (id) => {
          if(id==user_id) {
            console.log("here")
            is_found = true;
          }
        })

        if(!is_found) {
          post.rsvp.push(user_id);

          post.save( (err, post) => {
            if(error) resn.json({error})

            // do cron job
            // send email
            console.log('**** start');
            let user = req.decoded;
            let msg = `Dear ${user.name},\n\nAcara ${post.title} sebentar lagi akan dimulai. Silahkan bersiap-siap.\nTime: ${post.time}\nPlace: ${post.place}\n\nDescription: ${post.description}\n\nYours truly xoxo,\nMeetUpYuks Team`;
            helperJob.reminder_email(user, post, msg)
            console.log('**** end');

            res.json(post)
          })
        }
        else {
          var message = {
            message: 'User has already RSVP to this event.'
          }
          res.json(message)
        }

      }
    }
  })
}


module.exports = methods
