'use strict';

var test = require('tape');
var intents = require('../libs/intents');

var intent = {};

var session = {
  user: {
    userId: 1
  },
  attributes: {}
};

var response = {
  ask: function(data) {
    console.log('Alexa ASK: ' + data);
    return data;
  },
  askWithCard: function(data) {
    console.log('Alexa ASK with CARD: ' + data);
    return data;
  },
  tell: function(data) {
    console.log('Alexa TELL: ' + data);
    return data;
  },
  tellWithCard: function(data) {
    console.log('Alexa TELL with CARD: ' + data);
    return data;
  }
};

test('intents', function (t) {
  t.plan(1);

  callback(intents.StartNewGameIntent(intent, session, response));

  function callback(speech) {
    t.equal(typeof speech, 'string');
  }
});
