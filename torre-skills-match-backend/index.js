var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var chalk = require('chalk')
var Debug = require('debug')
var cors = require('cors')

const fetch = require('node-fetch')

const port = process.env.PORT || 80

const debug = new Debug('Torre')
const app = express()
const server = http.createServer(app)

// allow CORS from all origins
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));

function handleRecomendations(bio, connections){
    var holder = [];

    var connectionDegreeOne = 0;
    var sumWeights = 0
    connections.map(item => {
        if(item.degrees == 1){
            connectionDegreeOne++;
            sumWeights = sumWeights + item.person.weight
        }
    })

    console.log("Degrees ONE ", connectionDegreeOne)
    console.log("Sum of weight of your network ", sumWeights)

    if(connectionDegreeOne === 100){
        holder.push({
            recomendationText: `You have a really good network!`,
        })
    }else{
        if(connectionDegreeOne > 0){
            var networkAverage = sumWeights/connectionDegreeOne
            holder.push({
                recomendationText: `The average of your close network is ${Number(networkAverage).toFixed(0)}. While the average is higher your weight will be better.`,
            })
        }else{
            holder.push({
                recomendationText: `The average of your close network is 0. You really need connect with people. You can do it! While the average is higher your weight will be better`,
            })
        }
    }

    if(connectionDegreeOne <= 10){
        holder.push({
            recomendationText: `You have only ${connectionDegreeOne} close people on your network. You should develop more connections with people. Go and get recommended!`,
        })
    }

    if(connectionDegreeOne >= 10 && connectionDegreeOne <= 30){
        holder.push({
            recomendationText: `You have ${connectionDegreeOne} close people on your network. That\'s good but there are people with more! You should keep developing connections with people. Go and get recommended!`,
        })
    }

    var strengthsVerified = 0;
    var strengthsRecomended = 0;

    bio.strengths.map(item => {
        if(item.weight > 0){
            strengthsVerified++
        }
        if(item.recommendations > 0){
            strengthsRecomended++
        }
    })

    if(strengthsVerified === 0){
        holder.push({
            recomendationText: 'You don\'t have any strength verified. It\'s important to have at least 3 to be more likely considered a good candidate. By the way, verified strengths add weight to your bio.',
        })
    }

    if(strengthsRecomended === 0){
        holder.push({
            recomendationText: 'You don\'t have any strength recommended. It\'s important to have at least 3 to be more likely considered a good candidate. By the way, recommended strengths add weight to your bio.',
        })
    }

    if(bio.person.links.length == 0){
        holder.push({
            recomendationText: 'It\'s important to link your social networks profiles in the way recruiters can know you better.',
        })
    }

    if(!bio.person.verified){
        holder.push({
            recomendationText: 'Your are not verified! You need to ask to any verified person to verify your bio, don\'t be shy.',
        })
    }

    if(bio.languages.length == 0){
        holder.push({
            recomendationText: 'You don\'t have any languages on your bio. Add some to be more competitive.',
        })
    }

    if(bio.languages.length == 1){
        holder.push({
            recomendationText: 'You just have one lenguage on your bio. Add one more to be more competitive.',
        })
    }

    return holder
}

function handleReputation(statistics){
    let message = '';
    let status = '';
    let per = 0;
    let lastPercent = statistics[statistics.length - 1];

    console.log("MY PERCENT NOW IS: ", lastPercent)

    if(lastPercent){
        per = lastPercent.stat;

        if(lastPercent.stat <= 100){
            message = "Your reputation is really low, don’t apply to jobs until you improve It."
            status = "bad"
        }
    
        if(lastPercent.stat <= 75){
            message = "Your reputation is under the 50%. Recruiters probably won't see you."
            status = "normal"
        }
    
        if(lastPercent.stat <= 50){
            message = "Your reputation is good, you should apply for some job offers but still "
            status = "good"
        }
    
        if(lastPercent.stat <= 25){
            message = "Your reputation it’s really good! Apply now"
            status = "perfect"
        }
    }else{
        per = 0
        message = "Your reputation is really low, don’t apply to jobs until you improve It."
        status = "bad"
    }

    return {
        percent: per,
        message,
        status
    }
}

// manejador de errores con express
app.use((err, req, res, next) => {
  debug(`${chalk.red('[TORRE API ERROR]')} ${err.message}`)
  if (err.message.match(/not found/)) {
    return res.status(404).send({ err: err.message })
  }
  res.status(500).send({ err: err })
})

app.get('/onejob', async function(req, res){
  if(req.query.username){

    const requestBioResult = await fetch(`https://torre.bio/api/bios/${req.query.username}`)
    let bio = await requestBioResult.json()

    let strengthsValidatedArr = [];
    let maxVal = 0;
    let strongest = {};

    bio.strengths.map(item => {
      if(item.weight > 0){
        if(maxVal < item.weight){
          maxVal = item.weight;
        }
        strengthsValidatedArr.push(item);
      }
    })

    strengthsValidatedArr.map(item => {
      if(item.weight === maxVal){
        strongest = item
      }
    })

    console.log("strongest skill -> ", strongest);

    res.json({
      success: true,
      message: `your strongest skill is ${strongest.name}`
    }).end()
  }else{
    res.json({
      success: false,
      message: 'params needed'
    }).end()
  }
})

app.get('/', async function(req, res){
    if(req.query.username){

        const requestBioResult = await fetch(`https://torre.bio/api/bios/${req.query.username}`)
        let bio = await requestBioResult.json()

        const requestConnectionsResult = await fetch(`https://torre.bio/api/people/${req.query.username}/connections`)
        let connections = await requestConnectionsResult.json()

        const requestStatisticsResult = await fetch(`https://bio.torre.co/api/bios/${req.query.username}/stats/percentile`)
        let statistics = await requestStatisticsResult.json()
        
        if(!bio.person){
            res.json({
                success: false,
                message: bio.message
            }).end()
            return
        }

        var user = {
            name: bio.person.name,
            link_torre: `https://bio.torre.co/es/${req.query.username}`,
            weight: bio.person.weight,
            avatar: bio.person.picture,
        }

        
        var recomendations = handleRecomendations(bio, connections)
        var reputation = handleReputation(statistics)

        res.json({
            success: true,
            logMessage: `Hi ${req.query.username}, welcome to Torre Network Helper API`,
            user,
            recomendations,
            reputation,
            bio
        }).end()
    }else{
        res.json({
            success: false,
            message: 'params needed'
        }).end()
    }
})

function handleFatalError (err) {
  console.error(`${chalk.red('[FATAL ERROR]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[TORRE API server]')} on port ${port}`)
})
