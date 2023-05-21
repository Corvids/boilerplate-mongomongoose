require('dotenv').config();
const mongoose = require('mongoose')
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
Person = mongoose.model("Person", personSchema)


const createAndSavePerson = (done) => {
  const person = new Person({ name: 'Jenny', age: 25, favouriteFoods: ['chicken', 'waffles'] })
  person.save(function(err, data) {
    if (err) {
      return done(err)
    }
    else {
      done(null, data)
    }
  }
  )
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      done(err)
    } else {
      done(null, data)
    }
  })
};

const findPeopleByName = (personName, done) => {
  const person = Person.find({ name: personName }, function(err, data) {
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};

const findOneByFood = (food, done) => {
  const person = Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};

const findPersonById = (personId, done) => {
  const person = Person.findById({ _id: personId }, function(err, data) {
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  const person = Person.findById({ _id: personId }, function(err, data) {
    if (err) {
      return done(err)
    }

    data.favoriteFoods.push(foodToAdd)

    data.save(function(err, data) {
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const person = Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, data) {
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};

const removeById = (personId, done) => {
  const person = Person.findByIdAndRemove({ _id: personId }, function(err, data) {
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  const person = Person.remove({ name: nameToRemove }, function(err, data) {
    if (err) {
      return done(err)
    }
    else {
      return done(null, data)
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const people = Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec(function(err, data){
      if (err) {
        done(err)
      }
      else {
        done(null, data)
      }
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
