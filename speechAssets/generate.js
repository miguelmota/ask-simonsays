'use strict';

var intentUtteranceGenerator = require('intent-utterance-generator');

var intents = {
  'AMAZON.HelpIntent': [
    'help (|me)',
    'what can I ask you',
    'get help',
    'what commands can I (ask|say)',
    'what can I do',
    'what can I use this for',
    'what questions can I ask',
    'what can you do',
    'what do you do',
    'how (do|can) I use you',
    'what can you tell me'
  ],
  'AMAZON.CancelIntent': [
    'exit',
    'quit',
    'never mind',
    'shut up',
    'stop',
    'please stop',
    'leave',
    'good bye',
    'cancel',
    'enough'
  ],
  StartNewGameIntent: [
    '(start|begin|launch) new game',
    'start over'
  ],
  ColorIntent: [
    '{green|Color}',
    '{green blue|Color}',
    '{green blue blue|Color}',
    '{green blue blue red|Color}',
    '{green blue blue red yellow|Color}',
    '{green blue blue red yellow red|Color}',
    '{green blue blue red yellow red green|Color}',
    '{green blue blue red yellow red green green|Color}',
    '{green blue blue red yellow red green green blue|Color}'
  ]
};

var utterances = intentUtteranceGenerator(intents);

console.log(utterances.toString());
