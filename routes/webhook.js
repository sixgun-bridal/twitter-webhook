var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'tQDdXIdquwLq84u3ABZsHdOvs9pZ8YiqWWGn9EQKzKDYFOFwIc');
const twilio = require('twilio');

/* Post for handling the tweet. */
router.post('/dm', function(req, res, next) {
	console.log("handling the tweet");
	console.log(req.body);
	res.send('respond with a resource');
});

/* Security Check CRC */
router.get('/dm', function(req, res, next) {
	if (req.query.crc_token) {
		hmac.update(req.query.crc_token);
		let response = { response_token: "sha256=" + hmac.digest('hex') };
		console.log(JSON.stringify(response));
		res.send(JSON.stringify(response));
	}
	res.send('invalid request');
});

router.get('/message', (req, res, next) => {
	// Find your account sid and auth token in your Twilio account Console.
	var client = twilio('ACf03a5e52d4e12e75f2193a6a5777f1e4', '9915385d2f49bb0b53b7c17ccbb60804');
	console.log('client: ', client);
	// Send the text message.
	client.sendMessage({
	  'to': '+18473404789',
	  'from': '+12406508168',
	  'body': 'Hello from Twilio!'
	})
	.then(() => {
		return res.send('text sent')})
})

module.exports = router;
