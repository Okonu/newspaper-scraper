const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const articles = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change'
    },
    {
        name: 'the guardian',
        address: 'https://www.theguardian.com/environment/climate-change'
    },
    {
        name: 'the telegraph',
        address: 'https://www.telegraph.co.uk/climate-change
    }
]

app.get('/', (req, res ) =>{
    res.json('These are the latest Climate Change News around the World')
})

// app.get('/news', (req, res) =>{
//     axios.get('https://www.theguardian.com/environment/climate-crisis')
//     .then((response) =>{
//         const html = response.data
//         const $ = cheerio.load(html)

//         $('a:contains("climate")', html).each(function(){
//             const title = $(this).text()
//             const url = $(this).attr('href')
//             articles.push({
//                 title, url
//             })
//         }) 
//         res.json(articles)
//     }).catch((err) => console.log(err))
// })

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`)) 