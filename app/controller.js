module.exports = store => {

  const createUser = user => {
    return store.saveUser(user);
  };

  const findAllUsers = Users => {
    return store.findAllUsers(Users)
  }

  const findSingleUser = userId => {
    return store.findSingleUser(userId)
  }

  const findUserByIdAndUpdate = userId => {
    return store.findUserByIdAndUpdate(userId)
  }

  const findUserByIdAndDelete = userId => {
    return store.findUserByIdAndDelete(userId)
  }

  return {
    createUser,
    findAllUsers,
    findSingleUser,
    findUserByIdAndUpdate,
    findUserByIdAndDelete
  };
};