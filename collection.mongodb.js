/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('kesa-perhonen');

// ========<<< Backup: Clone Product Collection >>>============================
const clone = (name, newName) => {
  const output = db.getCollection(name).aggregate([{ $out: newName }]);
  print(`${name} collection cloned as ${newName}`);
  return output;
};

// ========<<< Rename ProductCopy to Product to Replace >>>====================
const rename = (name, newName) => {
  const output = db.getCollection(name).renameCollection(newName);
  print(`${name} collection renamed to ${newName}`);
  return output;
};

// ========<<< Drop ProductCopy collection >>>=================================
const deleteCollection = (name) => {
  const output = db.getCollection(name).drop();
  print(`${name} collection deleted`);
  return output;
};

// =============================================
// ========<<< Run Commands Here >>>============
// =============================================

// rename('Product', 'ProductCopy');
// deleteCollection('ProductCopy');
