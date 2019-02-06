module.exports = store => {

  const createUser = user => {
    return store.saveUser(user);
  };

  const findAllUsers = Users => {
    return store.findAllUsers(Users)
  }

  return {
    createUser,
    findAllUsers
  };
};