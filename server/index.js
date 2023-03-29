const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');


app.use(cors({
    origin: ['http://localhost:3000']
}));


app.get('/crypto-list', async (req, res) => {
  
  const parameters = { 'slug': 'bitcoin', 'convert': 'USD' }
  
  await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 
    {
      method: "GET", 
      headers: {
        'X-CMC_PRO_API_KEY': 'ef001fd1-93c5-4ad7-bc85-06a8bc183722'
      },
      params: parameters
  })
  .then((response) => response.json())
  .then(data => {
    console.log(data);
    
    res.send({
      data: data.data
    });

  })

})



app.get('/crypto-list/:crypto', async (req, res) => {

  const crypto = req.params.crypto
  // URL BRINGS BACK ALL INFO OF THE TOKEN 
  const url1 = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${crypto}`
  // URL2 BRINGS BACK THE CURRENT QUOTE AND PRICE DATA
  const url2 = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`

  let token = `${crypto.toUpperCase()}`;

  let modifyData = {
    metadata: {},
    statistics: {}
  };

  await fetch(url1, 
    {
      method: "GET", 
      headers: {
        'X-CMC_PRO_API_KEY': 'ef001fd1-93c5-4ad7-bc85-06a8bc183722'
      }
  })
  .then((response) => response.json())
  .then(data => {
    console.log(data);
    
    // res.send({
    //   data: data.data
    // });

    modifyData.metadata.name = data.data[`${token}`].name;
    modifyData.metadata.symbol =  data.data[`${token}`].symbol;
    modifyData.metadata.description = data.data[`${token}`].description;
    modifyData.metadata.socials = data.data[`${token}`]?.urls;
    modifyData.metadata.logo = data.data[`${token}`]?.logo;
    modifyData.metadata.subreddit = data.data[`${token}`]?.subreddit;

  })


  await fetch(url2, 
    {
      method: "GET", 
      headers: {
        'X-CMC_PRO_API_KEY': 'ef001fd1-93c5-4ad7-bc85-06a8bc183722'
      }
    })
    .then((response) => response.json())
    .then(data => {
      
      modifyData.statistics = data.data[`${token}`].quote.USD;

      res.send({
        data: modifyData
      });

    })
 

});


app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
