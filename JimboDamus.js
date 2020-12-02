const Discord = require('discord.js')
const client = new Discord.Client()
const jsmegahal = require('jsmegahal');
var megahal = new jsmegahal(4)
var fs = require('fs');

load();
function load() {
  if (fs.existsSync('jd.brain')) {
    var array = fs.readFileSync('jd.brain').toString().split("\n");
    for(i in array) {
       megahal.add(array[i]);
    }
    console.log('> Brain Loaded!');
  } else {
    var firstMsg = 'Hello floor! Make me a sandwich.'
    megahal.add(firstMsg);
    fs.writeFile('jd.brain', firstMsg, function (err) {
      if (err) throw err;
      console.log('> New Brain Saved!');
    });
  }
}

function write(message) {
  fs.appendFile('jd.brain', message + "\n", function (err) {
    if (err) throw err;
    //console.log('Saved to Brain!');
  });
}

function addToBrain(recievedMessage) {
  var sentence = recievedMessage.content.toString("");

  // Add sentence to hal memory
  megahal.add(sentence)
  // Add sentence to hal brain
  write(sentence)
  var r = Math.floor(Math.random() * (sentence.split(" ").length - 1))
  var word = sentence.split(" ")[r]
  // Get hal response
  var reply = megahal.getReplyFromSentence(word);
  // Send response
  recievedMessage.channel.send(reply)
}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    client.user.setActivity("With TimeSpace")

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
    })
})

client.on('message', (recievedMessage) => {
    if (recievedMessage.author == client.user) {
        return
    }
    //if (recievedMessage.content.toString("").includes('jimbodamus')) {
      addToBrain(recievedMessage)
    //}
})

client.login( "NzgzNDk1OTM4MTE1MTA4ODc0.X8bldA.JJDeP10sLoubSiVTsgULZZ2-4Ko" )