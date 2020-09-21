"use strict";

const connectToDatabase = require("./db");

const User = require("./user.model.js");

require("dotenv").config({ path: "./variables.env" });

module.exports.hello = (event, context, callback) => {
  console.log("Hello World");
  callback(null, "Hello World");
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    User.create(JSON.parse(event.body))
      .then((user) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could'nt add user.",
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    User.find()
      .then((users) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(users),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch users.",
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    User.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true,
    })
      .then((user) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not update user.",
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    User.findByIdAndRemove(event.pathParameters.id)
      .then((user) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: "Removed user with id: " + user._id,
            user: user,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not delete user.",
        })
      );
  });
};
