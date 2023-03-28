const createTokenUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    picture: user.picture,
    role: user.role,
    position: user.position,
    departement: user.departement,
    id: user.userId,
  };
};

module.exports = {createTokenUser}
