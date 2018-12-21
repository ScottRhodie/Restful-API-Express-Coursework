const findUserByName = (db, name) => db.find(currentUser => currentUser.name === name);
const findUserById = (db, id) => db.find(currentUser => currentUser.id === parseInt(id));

module.exports = {
    findUserById,
    findUserByName
};