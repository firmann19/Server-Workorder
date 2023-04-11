const createTokenUser = (user) => {
  return {
    id: user.userId,
    name: user.name,
    email: user.email,
    posisi: user.posisi,
    roles: user.roles,
    DepartementId: user.DepartementId,
    GroupId: user.GroupId,
  };
};

module.exports = {createTokenUser}
