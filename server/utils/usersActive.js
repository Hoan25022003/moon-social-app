const users = [];

const userJoin = (sId, user, post) => {
  const newUser = { sId, user, post };
  users.push(newUser);
  console.log(newUser);
  return newUser;
};

const getCurrentUser = (sId) => {
  return users.filter((user) => user.sId === sId);
};

const removeUser = (sId) => {};

module.exports = {
  userJoin,
  getCurrentUser,
};
