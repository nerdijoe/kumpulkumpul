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
        .populate('user_id')
        .exec((error, records) => {
            if (error) {
                res.json({
                    error
                })
            } else {
                res.json(records)
            }
        })
}

methods.getById = function(req, res){
  Post.findById(req.params.id, function(error, record){
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


module.exports = methods
