let CronJob = require('cron').CronJob;
let kue = require('kue'),
    queue = kue.createQueue();
require('dotenv').config();

module.exports = {
  reminder_eventByEmail: function(req, res, next) {
		let time = req.body.time
		let data = {
			from: `Edim <edimdendi@gmail.com>`,
			to: 'edimdendy@gmail.com',
			subject: req.body.title,
			text: req.body.description
		};
		var job = new CronJob(`00 56 14 * * 1-5`, function() {

		  var job = queue.create('email',
				data
			  ).save(function(err) {
			    if (!err) console.log(job.id);
			  });
		  },
		  null,
		  true, /* Start the job right now */
		  'Asia/Jakarta' /* Time zone of this job. */
		);
  }
}




queue.process('email', function(output, done) {
    email(output.data, done);
});

function email(data, done) {

	var api_key = 'key-06f7f089efacb7cce55e79eaed063b43';
	var domain = 'sandboxdc8d329f2cc44c62b42a0b13f715abb6.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: process.env.api_key, domain: process.env.domain});

	mailgun.messages().send(data, function (error, body) {
		console.log(body)

	});
	done();
}
