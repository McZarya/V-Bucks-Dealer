const Discord = require('discord.js');

const config = require('./config.json');
const client = new Discord.Client(); 

const cmdsArray = [
    "Ping - Pings The Bot To Test Connectivity",
    " ",
    "Honrey - ;)",
    " ",
    "Kick - Kicks a specified user from the server",
    " ",
    "Ban - Bans a specified user from the server",
    " ",
    "Purge - Deletes a Specified number of messages from the channel (currently a little buggy, Check change log for more info) ",
    " ",
    "Mute - Mutes a specified user in the server",
    " ",
    "Unmute - Do I really need to tell what this does?",
    " ",
    "Avatar - Gets a specified users profile picture",
    //" ",
    //"Calc - A Calculator(Disabled till I patch it cause it kept crashing the bot)", // A Calculator(Addition:+, Multiplication:*, division:/
    //" ",
    //"stats - Shows statistics about the bot",
    " ",
    "Changelog - Post's The most recent changes to the bot",
    " ",
    "GitHub - Sends a link to the bots GitHub",
    " "
];

const changelog = [
    "V Bucks Dealer Version 1.1.1",
    " ",
    "Bug Fix:",
    " ",
    "Fixed an issue with the bots status",
    " "
]


client.once('ready', () => { // Shit to be spammed in Console upon launch.
    console.log('====================================================================================================')
    console.log("McZarya's V-Bucks Dealer V1.1.1");
    console.log("Created And Developed By McZarya.")
    console.log("McZarya is not responsible for anything you do with this bot.")
    console.log('====================================================================================================')
    console.log('Ready To Surppress The Masses');
    console.log('====================================================================================================')
    
    client.user.setStatus('dnd') //Bot's status and game/streaming. dnd, idle, online
    client.user.setPresence({
        game: {
            name: 'Police Scanners ',
            type: "Listening", // Playing, Listening, Watching, STREAMING
			// url: "URL Here" <- link for stream when using the 'STREAMING' status
        }
    });
});



client.on('message', message => { // Command List Start
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.trim().split(/ +/g);
    const command = args[0].slice(config.prefix.length).toLowerCase();
//===============================================================================================================
    if(command == "help"){
        message.reply("Here you go.");
        const embed = new Discord.RichEmbed()
        .addField("Commands", cmdsArray)
        .addField("Further Support", "Thanks for using this bot, If you need Further help DM McZarya#0001");
        message.channel.send({embed: embed});
}
//===============================================================================================================
if(command == "ping"){ // Check The Bots Connectivity
    message.reply("🏓pong");
}

//===============================================================================================================
if(command == "github"){ // Sends a link to the bots GitHub repository 
    message.reply("you can find the bots GitHub repository at: https://github.com/McZarya/V-Bucks-Dealer");
}

//===============================================================================================================
if (command == 'avatar') {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor(0x333333)
        .setAuthor(user.username)
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
}

//===============================================================================================================
if(command == "changelog"){
    message.channel.send("Here is the most recent update.");
    const embed = new Discord.RichEmbed()
    .addField("Change Log", changelog)
    .addField("Sanity Lost", "0");
    message.channel.send({embed: embed});
}

//=============================================================================================================== // Below two modules are still Work I proccess  
/*if(command == "stats"){
    let statsembed = new Discord.RichEmbed()
        .setTitle('Bot Stats!')
        .addField('I am in:', `${client.guilds.cache.size} servers!`)
        .addField('I am helping', `${client.user.cache.size} users!`)
        .addField("Not what you were looking for? Try the help command", client.user.username)
        message.channel.send(statsembed)
}*/
//===============================================================================================================
/*if(command == "say"){ // Makes the bot say what you tell it to
 
*/

//===============================================================================================================
if(command == "honrey") { // Are you honrey?
    message.reply("Heres My instagram bio: ");
    message.channel.send("🌷12🌷 🥀Depressed🥀 🗡️Suisidal🗡️ 🐺Half wolf🐺 😈Half deamon😈 💦Honrey💦 💜𝓲'𝓶 𝓷𝓸𝓽 𝓵𝓲𝓴𝓮 𝓽𝓱𝓮 𝓸𝓽𝓱𝓮𝓻 𝓰𝓲𝓻𝓵𝓼💜");
}

//===============================================================================================================
if(command == "lemons") { // Why am I banned, I swear I didnt do anything wrong?
    message.channel.send("Where are my fucking lemons!, I swear to god tupper im coming over and if I find even a single lemon up your ass im bleaching your eyes!");
    for (let lemons = 0; lemons < 24; lemons++) { // one lemon for every hour I was banned 
        message.channel.send("🍋");  
        //guild.members.ban.random(); // Dont touch you fucking sped 
    } 
}

//===============================================================================================================
/*if (command == 'rules') { // Check NotePad.txt for links

}*/
//===============================================================================================================
if(command == "kick") { // Kicks a specified user
    if(message.channel.type === 'DM') { // Check if message channel is a direct message 
        message.channel.send("I can't kick from DM's. Try again in the server"); 
        return;
    };

    if(!message.member.hasPermission('KICK_MEMBERS')) { // Checks if the user have permission to kick
        message.channel.send("You are overstepping your bounds! (You don't have permission todo that)");
        return;
    };

    let mentionMember = message.mentions.members.first();
    if(!mentionMember) { // Shows this error if user doesn't mention a memeber
        message.channel.send("This isn't a game of russian roulette, who do you want me to kick?");
        return;
    }

    // Compare's dick sizes (See's who has the higher role)
    let authorHighestRole = message.member.highestRole.position;
    let mentionHighestRole = mentionMember.highestRole.position;

    if(mentionHighestRole >= authorHighestRole) { // shows this error message if the mentioned user has the same role or a higher role
        message.channel.send("You can't kick people with a equal or a higher position then yourself");
        return;
    };

    if(!mentionMember.kickable) { // Shows this error if the bot can't kick the user  
        message.channel.send("I don't have permissions to kick this user");
        return
    };

    mentionMember.kick() // If all steps are completed successfully tries to kick the user
        .catch(console.error);
        message.channel.send(mentionMember + " has successfully been kicked by " + message.member + "!");
    };

//===============================================================================================================
if(command == "ban") { // Ban a specified user
    if(message.channel.type === 'DM') { // Check if message channel is a direct message 
        message.channel.send("I can't ban from DM's. Try again in the server"); // this causes the bot to stroke out and crash if DMed... Too Bad!!!
        return;
    };

    if(!message.member.hasPermission('BAN_MEMBERS')) { // Checks if the user have permission to ban
        message.channel.send("You are overstepping your bounds! (You don't have permission todo that)");
        return;
    };

    let mentionMember = message.mentions.members.first();
    if(!mentionMember) { // Shows this error if user doesn't mention a memeber
        message.channel.send("This isn't a game of russian roulette, who do you want me to ban?");
        return;
    }

    // Compare's dick sizes (See's who has the higher role)
    let authorHighestRole = message.member.highestRole.position;
    let mentionHighestRole = mentionMember.highestRole.position;

    if(mentionHighestRole >= authorHighestRole) { // shows this error message if the mentioned user has the same role or a higher role
        message.channel.send("You can't ban people with a equal or a higher position then yourself");
        return;
    };

    if(!mentionMember.bannable) { // Shows this error if the bot can't ban the user  
        message.channel.send("I don't have permissions to ban this user");
        return
    };

    mentionMember.ban() // If all steps are completed successfully tries to ban the user
        .catch(console.error);
        message.channel.send(mentionMember + " has successfully been banned by " + message.member + "!");
    };

//===============================================================================================================
if(command == "mute") { // Mute a specified user
    if(message.channel.type === 'DM') { // Check if message channel is a direct message 
        message.channel.send("I can't mute from DM's. Try again in the server"); // this causes the bot to stroke out and crash if DMed... Too Bad!!!
        return;
    };

    if(!message.member.hasPermission('KICK_MEMBERS')) { // Checks if the user have permission to mute (technically their isnt a MUTE_Members for text chat just voice so this can be made what ever perm)
        message.channel.send("You are overstepping your bounds! (You don't have permission todo that)");
        return;
    };

    let mentionMember = message.mentions.members.first();
    if(!mentionMember) { // Shows this error if user doesn't mention a memeber
        message.channel.send("This isn't a game of russian roulette, who do you want me to mute?");
        return;
    }

    // Compare's dick sizes (See's who has the higher role)
    let authorHighestRole = message.member.highestRole.position;
    let mentionHighestRole = mentionMember.highestRole.position;

    if(mentionHighestRole >= authorHighestRole) { // shows this error message if the mentioned user has the same role or a higher role
        message.channel.send("You can't mute people with a equal or a higher position then yourself");
        return;
    };

    let muteuser = message.mentions.members.first(); 
    let muterole = message.guild.roles.find('name',"Muted");
    // Error: (node:19956) DeprecationWarning: Collection#find: pass a function instead. 
    //This has been updated to #Collection.find(x => x.name === "name"), will fix later this works for now
    muteuser.addRole(muterole);('Muted') // If all steps are completed successfully tries to ban the user
       // .catch(console.error); // Error Catching is causing command to stroke out... Too Bad!!!
        message.channel.send(mentionMember + " Silence Yourself");
        message.channel.send(mentionMember + " has successfully been muted by " + message.member + "!");
    };

//===============================================================================================================
if(command == "unmute") { // Mute a specified user
    if(message.channel.type === 'DM') { // Check if message channel is a direct message 
        message.channel.send("I can't unmute from DM's. Try again in the server"); // this causes the bot to stroke out and crash if DMed... Too Bad!!!
        return;
    };

    if(!message.member.hasPermission('KICK_MEMBERS')) { // Checks if the user have permission to mute (technically their isnt a MUTE_Members for text chat just voice so this can be made what ever perm)
        message.channel.send("You are overstepping your bounds! (You don't have permission todo that)");
        return;
    };

    let mentionMember = message.mentions.members.first();
    if(!mentionMember) { // Shows this error if user doesn't mention a memeber
        message.channel.send("This isn't a game of russian roulette, who do you want me to unmute?");
        return;
    }

    // Compare's dick sizes (See's who has the higher role)
    let authorHighestRole = message.member.highestRole.position;
    let mentionHighestRole = mentionMember.highestRole.position;

    if(mentionHighestRole >= authorHighestRole) { // shows this error message if the mentioned user has the same role or a higher role
        message.channel.send("You can't unmute people with a equal or a higher position then yourself");
        return;
    };

    let muteuser = message.mentions.members.first(); 
    let muterole = message.guild.roles.find('name',"Muted");
    // Error: (node:19956) DeprecationWarning: Collection#find: pass a function instead. 
    //This has been updated to #Collection.find(x => x.name === "name"), will fix later this works for now
    muteuser.removeRole(muterole);('Muted') // If all steps are completed successfully tries to ban the user
       // .catch(console.error); // Error Catching is causing command to stroke out... Too Bad!!!
        message.channel.send(mentionMember + " You may speak again");
        message.channel.send(mentionMember + " has successfully been unmuted by " + message.member + "!");
    };

//===============================================================================================================
if(command == "purge") { // deletes a specified amount of messages
    var dn = message.content.split(" ")[1];
    var fdn = dn + 1; -
    message.channel.bulkDelete(dn);
    message.channel.send("Successfully deleted " + dn + " message(s)!")
  }

//===============================================================================================================
client.on('message', message => { 
	if (message.author.id === "199875176035254273") { // <--- Enter User ID for comedy
        message.reply(message.content + ", Faggot");
	}
});

  //===============================================================================================================
/* if(command == "calc") { // Causes bot to crash if a invalid operation is entered (X instead of *)... Too Bad!!!
    var ca = message.content.substring(message.content.indexOf(" "));
    message.reply(ca + " is " + eval(ca).toFixed(2));
} */

//===============================================================================================================
}); // Command List End

/* yandere dev be like
if(false){
}
    else if(false){
    }
        else if(false){
        }
            else if(false){
            }
                else if(false){
                }
                    else if(false){
                    }
                        else if(false){
                        }
                            else if(false){
                            }
                                else if(false){
                                }
                                    else if(false){
                                    }
                                        else if(false){
                                        }
                                            else if(false){
                                            }
                                                else if(false){
                                                }
                                                    else if(false){
                                                    }
                                                        else if(false){
                                                    }
*/


client.login(config.token);