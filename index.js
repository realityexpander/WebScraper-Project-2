const Twitter = require('twitter');
const Sheet = require('./sheet');
const twitterCreds = require('./twitter_creds.json');
const sendEmail = require('./email');
const currentDateAndTime = require('./dateTime');

// Twitter Dev
// https://developer.twitter.com/en/portal/

// GCP
// https://console.cloud.google.com/cloudscheduler?project=returnz-tester-215418
// https://console.cloud.google.com/functions/list?project=returnz-tester-215418
// https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_function%22%0Aresource.labels.function_name%3D%22zen-twitter-bot%22%0Aresource.labels.region%3D%22us-central1%22?project=returnz-tester-215418

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

