const Twitter = require('twitter');
const Sheet = require('./sheet');
const twitterCreds = require('./twitter_creds.json');
const sendEmail = require('./email');
const currentDateAndTime = require('./dateTime');

// Twitter Dev @ZenBot19
// https://developer.twitter.com/en/portal/
// https://developer.twitter.com/en/portal/dashboard

// Sheet
// https://docs.google.com/spreadsheets/d/1VSO2QUvvlViayMal5wHREUCU9YRwCZN1SymVXB91sPw/edit#gid=0

// Twitter API
// https://www.npmjs.com/package/twitter

// Google Sheets API
// https://www.npmjs.com/package/google-spreadsheet

// GCP
// https://console.cloud.google.com/functions/list?project=returnz-tester-215418
// https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_function%22%0Aresource.labels.function_name%3D%22zen-twitter-bot%22%0Aresource.labels.region%3D%22us-central1%22?project=returnz-tester-215418

const {consumer_key, consumer_secret, access_token_key, access_token_secret}=twitterCreds;
const myTwitterCreds = {
  consumer_key, 
  consumer_secret, 
  access_token_key, 
  access_token_secret
};

// console.log(JSON.stringify(twitterCreds) === JSON.stringify(myCreds));
// process.exit()

(async function() {
  // connect to twitter api
  const client = new Twitter(
    myTwitterCreds
    // consumer_key: process.env.TWITTER_CONSUMER_KEY,
    // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  )

  // pull next tweet from SS // Zen Quotes
  const sheet = new Sheet()
  await sheet.load()
  const quotes = await sheet.getRows()
  const status = quotes[0].quote


  // send tweet
  client.post('statuses/update', {status}, function(err, response, callback) {
    if(err) {
      console.log({err})
    }
    console.log({response})
  })

  // remove quote from SS
  await quotes[0].delete()

  console.log('Tweeted:', status)
  console.log("Current time:", currentDateAndTime())

  sendEmail('realityexpander@gmail.com', 'Zen quote sent: ' + status + '\n\nTime sent: ' + currentDateAndTime() )

})()

