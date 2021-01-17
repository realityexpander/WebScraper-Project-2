const Twitter = require('twitter');
const Sheet = require('./sheet');
const twitterCreds = require('./twitter_creds.json');
const sendEmail = require('./email');

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

  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log("Time sent:", year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

  sendEmail('realityexpander@gmail.com', 'Time sent:' + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds )

})()

