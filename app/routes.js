module.exports = function (app, passport, db) {
  // normal routes ===============================================================
  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  //confused how data is sent to profile to be populated through profile.ejs
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection(`profileBoard:${req.user._id}`).find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // MOVIES ==============================
  app.get('/movie/:href', isLoggedIn, function (req, res) {
    const href = req.params.href
    db.collection(`movie:${href}`).find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('movie.ejs', {
        title: href.replace('_',' '),
        ratings: result
      })
    })
  });

  app.post('/publishRating', (req,res) => {
    db.collection(`movie:${req.body.href}`).save({ id: req.user._id, title: req.body.title, href: req.body.title.replace(' ', '_'), date: req.body.date, comment: req.body.comment, rating: req.body.rating, star:req.body.star /*include user tbd*/ }, (err, result) =>  {
      if (err) return console.log(err)
      console.log(`saved to movie ${req.body.href} database`)
      res.redirect(`/movie/${req.body.href}`)
    })
  })


  // profile board routes ===============================================================

  app.post('/profileboard', (req, res) => {
    //TBD: save username instead of id to populate on the community movie board
    db.collection(`profileBoard:${req.user._id}`).save({ id: req.user._id, title: req.body.title, href: req.body.title.replace(' ', '_'), date: `[${req.body.date}]`, comment: req.body.comment, star: 'Click a star to rate' }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/profile')
    })
  })

  app.put('/rating', (req, res) => {
    db.collection(`profileBoard:${req.user._id}`)
      .findOneAndUpdate({ title: req.body.title, date: req.body.date }, {
        $set: {
          star: `${req.body.star} star`
        }
      }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.put('/edit', (req, res) => {
    db.collection(`profileBoard:${req.user._id}`)
      .findOneAndUpdate({ title: req.body.title, date: req.body.date }, {
        $set: {
          comment: `"${req.body.comment}"`
        }
      }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.delete('/delete', (req, res) => {
    db.collection(`profileBoard:${req.user._id}`).findOneAndDelete({ title: req.body.title, date: req.body.date }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Movie deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    // user.local.username = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
