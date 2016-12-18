'use strict';

var _ = require('lodash');
var pluralize = require('pluralize');
var AlexaSkill = require('./AlexaSkill');
var i18n = require('./i18n');
var gameSounds = require('./game-sounds');

var intents = {
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.YesIntent': YesIntent,
  'AMAZON.NoIntent': NoIntent,
  'AMAZON.CancelIntent': CancelIntent,
  StartNewGameIntent: StartNewGameIntent,
  ColorIntent: ColorIntent
};

function HelpIntent(intent, session, response) {
  var speech = i18n.helpInstructions + ' ' + i18n.seeHelpCard + ' ' + i18n.helpPrompt;
  var cardTitle = i18n.help;
  var cardContent = i18n.helpInstructions + ' ' + i18n.helpContact;

  var speechOutput = {
    speech: '<speak>' + speech + '</speak>',
    type: AlexaSkill.speechOutputType.SSML
  };

  var repromptOutput = {
    speech: i18n.helpInstructions,
    type: AlexaSkill.speechOutputType.PLAIN_TEXT
  };

  response.askWithCard(speechOutput, repromptOutput, cardTitle, cardContent);
}

function YesIntent(intent, session, response) {
  if (session.attributes.startNewGame) {
    return StartNewGameIntent(intent, session, response);
  }
}

function NoIntent(intent, session, response) {
  var speechOutput = {
    speech: '<speak></speak>',
    type: AlexaSkill.speechOutputType.SSML
  };

  if (session.attributes.startNewGame) {
    speechOutput = {
      speech: '<speak>' + i18n.exit + '</speak>',
      type: AlexaSkill.speechOutputType.SSML
    };
  }

  response.tell(speechOutput);
}

function CancelIntent(intent, session, response) {
  var speechOutput = {
    speech: '<speak>' + i18n.exit + '</speak>',
    type: AlexaSkill.speechOutputType.SSML
  };

  response.tell(speechOutput);
}

function StartNewGameIntent(intent, session, response) {
  var speech = 'Starting new game.';
  session.attributes.startNewGame = false;

  var sequence = generateSequence();

  session.attributes.sequence = sequence;
  var round = 1;
  session.attributes.round = round;

  speech = speech + ' Round ' + round + '. ' + sequence.slice(0, round).join(' ') + '. Your turn.';

  var speechOutput = {
    speech: '<speak>' + speech + '</speak>',
    type: AlexaSkill.speechOutputType.SSML
  };

  response.ask(speechOutput);
}

function ColorIntent(intent, session, response) {
  var speech = '';
  var userColors = _.get(intent, ['slots', 'Color', 'value'], '').split(' ');

  var sequence = session.attributes.sequence.slice(0, session.attributes.round);
  var isCorrect = sequenceEqual(sequence, userColors);

  if (isCorrect) {
    session.attributes.round += 1;
    var round = session.attributes.round;
    var nextSequence = session.attributes.sequence.slice(0, round);

    speech = '<audio src="' + gameSounds.correct + '" /> Correct. ' + ' Round ' + round + '. ' + nextSequence.join(' ') + '. Your turn.';
  } else {
    session.attributes.startNewGame = true;

    speech = '<audio src="' + gameSounds.wrong + '" /> Incorrect. You said ' + userColors.join(' ') + ' but the correct sequence was ' + sequence.join(' ') + '. Do you want to play again?';
  }

  var speechOutput = {
    speech: '<speak>' + speech + '</speak>',
    type: AlexaSkill.speechOutputType.SSML
  };

  response.ask(speechOutput);
}

function sequenceEqual(sequenceA, sequenceB) {
  if (!(Array.isArray(sequenceA) && Array.isArray(sequenceB))) {
    return false;
  }

  return sequenceA.toString() === sequenceB.toString();
}

function generateSequence() {
  return ['green', 'blue', 'blue', 'red', 'yellow', 'red', 'green', 'green', 'blue'];
  var colors = ['green', 'red', 'yellow', 'blue'];

  return _.map(_.range(0, 100), function() {
    return _.sample(colors);
  });
}

module.exports = intents;
