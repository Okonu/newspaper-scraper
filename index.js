const PORT = process.env.PORT ||8000
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
    // let h2Elements = ""
    // articles.forEach(article => {
    //     h2Elements += `<h2><a href=${article.url}>${article.title}</a> - ${article.source}</h2>`
    // })
    // res.send(`<html><body>${h2Elements}</body></html>`)
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


//route to get a specific article
app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId;

    const selectedNewspaper = newspapers.filter(newspaper => newspaper.name == newspaperId)[0];

    if (!selectedNewspaper) {
      res.status(404).send('Newspaper not found');
      return;
    }

    const newspaperAddress = selectedNewspaper.address;
    const newspaperBase = selectedNewspaper.base;

    axios.get(newspaperAddress)
        .then(response =>{
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function (){
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            let h2Elements = ""
            specificArticles.forEach(article => { h2Elements += `<h2><a href=${article.url}>${article.title}</a> - ${article.source}</h2>`
        })
            res.send(`<html><body>${h2Elements}</body></html>`)

        }).catch(err => {
            console.log(err);
            res.status(500).send("An error occurred while fetching data");
        });
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`)) 