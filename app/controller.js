module.exports = (store) => {
    const createUser = (user) => {
        return store.saveUser(user);
    };

    return {
        createUser
    };
};