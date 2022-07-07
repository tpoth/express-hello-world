"use strict";
const logger = function (options) {
  if (!options) {
    throw new Error("Options is missing.");
  }
  if (!options.level) {
    throw new Error("Level is missing");
  }

  return function (req, res, next) {
    console.log(`(${options.level}) ${req.method} ${req.path}`);
    next();
  };
};

module.exports = logger;
