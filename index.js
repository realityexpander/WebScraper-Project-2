const Twitter = require('twitter');
const Sheet = require('./sheet');
const twitterCreds = require('./twitter_creds.json');

const {consumer_key, consumer_secret, access_token_key, access_token_secret}=twitterCreds;
console.log({consumer_key, 
  consumer_secret, 
  access_token_key, 
  access_token_secret
});

(async function() {
  // connect to twitter api
  const client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  })
  //4:48 video 2.2

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

})()

