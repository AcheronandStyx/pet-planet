// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const thoughtSeeds = require('./thoughtSeed.json');
const db = require('../config/connection');
const { Pet, User } = require('../models');

db.once('open', async () => {
  try {
    await Pet.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, petOwner } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: petOwner },
        {
          $addToSet: {
            Pet: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});