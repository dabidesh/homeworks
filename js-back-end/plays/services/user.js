//my by userService.js, intelisense work good

const User = require('../models/User');

async function createUser(username, email, gender, ganre, hashedPassword) {
  // TODO adapt properties to project requirements
  // validation by in middleware or controler

  const user = new User({
    username,
    email,
    gender,
    ganre,
    hashedPassword,
    likedPlays: [],
  });

  await user.save();

  // middleware will by use meta data (id)
  return user;
}

async function getUserByUsername(username) {
  const pattern = new RegExp(`^${username}$`, 'i');
  const user = await User.findOne({ username: { $regex: pattern } });
  return user;
  //my by ...
  /* while (false) {
    return User.findOne({ username: { $regex: username, $options: 'i' } });
  } */
}

// TODO add function for finding user by other properties, as specified in the project requirements

async function getUserByEmail(email) {
  const pattern = new RegExp(`^${email}$`, 'i');
  const user = await User.findOne({ email: { $regex: pattern } });
  return user;
}
//.populate('likedPlays').lean()
const getUserDetailsByUsername = async (username) => {
  const pattern = new RegExp(`^${username}$`, 'i');
  const user = await User.findOne({ username: { $regex: pattern } })
    .populate('likedPlays').lean();
  // без populate е undefined (id.title) -> т.е. попълва полетата по id-то!
  // С други думи: попълва данните вътре в референцията
  // likedPlays е такова поле: масив от пиеси, сочещи към съответните документи от колекцията
  //console.log('user.js: ', user);
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserDetailsByUsername,
};