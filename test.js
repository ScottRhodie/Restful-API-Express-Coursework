// File for just storing notes.  Please ignore.

// (Would ignore in the .gitignore file, but kept here
//  for personal use / so reader can maybe get an idea
//  of what I've been doing.)



//-###### routes ######-\\

app.get('/api/v1/users/:id', (req, res) => {
  return controller.findAllUsers(req)
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Unable to rerieve users"
      })
    })
})

//-###### store ######-\\

findAllUsers: () => {
  return User.find()
    .then((responce) => {
      console.log("Listing all users now...");
      return responce;
    })
}

//-###### controller ######-\\

const findAllUsers = Users => {
  return store.findAllUsers(Users)
}

return {
  findAllUsers
};