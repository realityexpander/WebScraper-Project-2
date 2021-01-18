const Twitter = require('twitter');
const Sheet = require('./sheet');
const twitterCreds = require('./twitter_creds.json');
const sendEmail = require('./email');
const currentDateAndTime = require('./dateTime');

const {consumer_key, consumer_secret, access_token_key, access_token_secret}=twitterCreds;
const myCreds = {consumer_key, 
  consumer_secret, 
  access_token_key, 
  access_token_secret
};

// console.log(JSON.stringify(twitterCreds) === JSON.stringify(myCreds));
// process.exit()

(async function() {
  // connect to twitter api
  const client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
    // consumer_key: process.env.TWITTER_CONSUMER_KEY,
    // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })

  // pull next tweet from SS // Zen Quotes
  const sheet = new Sheet()
  await sheet.load()
  const quotes = await sheet.getRows()
  const status = quotes[0].quote


  // // send tweet
  // client.post('statuses/update', {status}, function(err, tweet, callback){
  //   if(err) throw error;
  //   console.log(tweet)
  //   console.log(response)

  // })

  // remove quote from SS
  // await quotes[0].delete()

  console.log('Tweeted:', status)
  console.log(myCreds)
  console.log("Current time:", currentDateAndTime())

  sendEmail('realityexpander@gmail.com', 'Time sent:' + currentDateAndTime() )

})()

