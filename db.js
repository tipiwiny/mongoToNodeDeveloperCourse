import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

const state = {
  client: null,
};

exports.connect = function(url, done) {
  if (state.client) return done();

  MongoClient.connect(url, function(err, client) {
    if (err) return done(err);
    state.client = client;
    done();
  });
};

exports.getClient = function() {
  return state.client;
};

exports.close = function() {
  if (state.client) {
    state.client = null;
    return state.client.close();
  }
};
