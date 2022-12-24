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

const removeUser = (sId) => {
  const userIdx = users.findIndex((user) => user.sId == sId);

  if (userIdx !== -1) {
    return users.splice(userIdx, 1);
  }
};

module.exports = {
  userJoin,
  getCurrentUser,
  removeUser,
};
