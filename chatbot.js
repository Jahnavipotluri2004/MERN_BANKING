//chatbot.js

const RiveScript = require('rivescript');

// Initialize the RiveScript chatbot
const chatbot = new RiveScript();

// Load your .rive files
chatbot.loadFile([
  'greetings.rive',
  'account_balance.rive',
  'security.rive',
  'transferFunds.rive',
], on_load_success, on_load_error);

function on_load_success() {
  console.log('RiveScript chatbot has been loaded successfully.');
  chatbot.sortReplies(); // Sort the replies for efficient searching
}

function on_load_error(error) {
  console.error('Error loading RiveScript chatbot:', error);
}

// Function to get a response from the chatbot
chatbot.getResponse = (message) => {
  const response = chatbot.reply('user', message);
  return response;
};

export default chatbot;
