module.exports = store => {

  const createUser = user => {
    return store.saveUser(user);
  };


  const getAllUsers = Users => {
    return store.getAllUsers(Users)
  }


  const findUser = userId => {
    return store.findUser(userId)
  }


  const updateUser = userId => {
    return store.updateUser(userId)
  }


  const deleteUserById = userId => {
    return store.deleteUserById(userId)
  }

  return {
    createUser,
    getAllUsers,
    findUser,
    updateUser,
    deleteUserById
  };
};