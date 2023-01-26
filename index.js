const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: '',
    },
    {
        name: 'the guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'the telegraph',
        address: 'https://www.telegraph.co.uk/climate-change', 
        base: 'https://www.telegraph.co.uk',
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("climate")',html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
    })
})

app.get('/', (req, res ) =>{
    res.json('These are the latest Climate Change News around the World')
})
 
app.get('/news', (req, res) =>{
    res.json(articles)
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
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`)) 