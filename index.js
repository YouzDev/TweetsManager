var Twitter = require('twitter')
var bodyParser = require('body-parser')
var express = require('express')
var session = require('express-session')
var hbs = require('hbs')
var UglifyJS = require("uglify-js")
var path = require('path')
var _ = require('lodash')
var fs = require('fs')
var OAuth = require('oauth')
var app = express()
var md5 = require('md5')
var ip = process.env.IP || 'localhost'
var access_token = ''
var access_token_secret = ''
var consumer_key = 'J3VLchWRKjaMhvuPLFFv9od9H'
var consumer_secret = 'cLm62xSeK29xODLRVJI5BCi3Es3tXWs9UuvMuVqLaiHuS0UGLP'
var oauth_token = ''
var oauth_secret = ''
var oauth_verifier = ''
var tweets
var twitter
var sess = {
  secret: '12345678990',
  cookie: {},
  resave: true,
  saveUninitialized: true
}
var oauth = new OAuth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  consumer_key,
  consumer_secret,
  '1.0A',
  'http://' + ip + ':8080/oauth/authorize',
  'HMAC-SHA1'
)

hbs.registerHelper('assets', (process.env.NODE_ENV === 'production' ? _.memoize : _.identity)(function (path) {
  var file = fs.readFileSync('assets' + path, 'utf8')

  // if (process.env.NODE_ENV === 'production') {
  //   var minifedFile = UglifyJS.minify(path)
  //   console.log(minifiedFile.code)
  //   fs.writeFile(path, minifedFile.code, 'utf8')
  // }
  return '/assets' + path + '?v=' + md5(file).substring(10, 0)
}))

app.use('/assets/', express.static(path.join(__dirname, '/assets')))
app.use(session(sess))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')

app.get('/oauth/request_token', function (req, res, next) {
  oauth.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      console.log(error)
    } else {
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauthToken)
    }
  })
})

app.get('/oauth/authorize', function (req, res) {
  if (!req.query.denied) {
    oauth_token = req.query.oauth_token
    oauth_secret = req.query.oauth_secret
    oauth_verifier = req.query.oauth_verifier

    oauth.getOAuthAccessToken(oauth_token, oauth_secret, oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (error) {
        res.render('error', {message: data[0].message})
      } else {
        access_token = oauthAccessToken
        access_token_secret = oauthAccessTokenSecret

        twitter = new Twitter({
          consumer_key: consumer_key,
          consumer_secret: consumer_secret,
          access_token_key: access_token,
          access_token_secret: access_token_secret
        })

        twitter.get('account/verify_credentials', function (error, data) {
          if (error) {
            console.log(error)
          } else {
            req.session.userId = data.id
            req.session.username = data.screen_name
            req.session.name = data.name
            req.session.profilePic = data.profile_image_url.split('_normal')[0] + '.png'
          }
          res.redirect('/')
        })
      }
    })
  } else {
    res.render('error', {
      message: 'You canceled the authentication. Redirecting to home'
    })
  }
})

app.get('/', function (req, res) {
  if (req.session.username) {
    twitter.get('statuses/user_timeline', function (error, data) {
      if (error) {
        res.render('error', {
          message: error[0].message
        })
      } else {
        tweets = data
      }
      res.render('index', {
        username: req.session.username,
        profile_picture: req.session.profilePic,
        tweets: tweets
      })
    })
  } else {
    res.render('signin')
  }
})

app.get('/logout', function (req, res) {
  req.session.userId = null
  req.session.username = null
  req.session.name = null
  req.session.profilePic = null
  res.redirect('/')
})

app.post('/tweet', function (req, res) {
  twitter.post('statuses/update', {
    status: req.body.status
  }, function (error, data) {
    if (error) {
      res.render('error', {
        message: error[0].message
      })
    }
  })
})

app.get('/tweets', function (req, res) {
  if (req.session.username) {
    twitter.get('statuses/user_timeline', function (error, data) {
      if (error) {
        res.render('error', {
          message: error[0].message
        })
      } else {
        res.json(data)
      }
    })
  }
})

app.post('/delete', function (req, res) {
  twitter.post('statuses/destroy/' + req.body.id, function (error, data) {
    if (error) {
      res.render('error', {
        message: error[0].message
      })
    }
  })
})

app.get('*', function (req, res, next) {
  var err = new Error()
  err.status = 404
  err.message = 'Wrong address'
  next(err)
})

app.use(function (err, req, res, next) {
  if (err.status !== 404) {
    return next()
  } else {
    res.status(err.status)
    res.render('error', {
      message: err.message
    })
  }
})

app.listen(8080, function () {
  if (ip === 'localhost' || ip[0] === '1') {
    console.log('Server running on http://' + ip + ':8080')
  } else if (ip !== 'localhost' && ip[0] !== '1') {
    console.error('Your ip address is not valid')
    process.exit(1)
  }
})
