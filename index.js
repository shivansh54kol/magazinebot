const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "z!";
const fs = require("fs");
let accounts = "./accounts.json";

bot.on("message", async message => {
    const args = message.content.slice(prefix.length).split(/ +/g);
    
    let errorEmbedAvailable = new Discord.RichEmbed()
        .setTitle("An Error Occured")
        .setDescription("The only accounts available are - __origin, hulu, steam, nordvpn, spotify and crunchyroll__")
        .setColor("0xff0000");

    function addAccounts(accountType){
        let successEmebed = new Discord.RichEmbed()
        .setTitle("Succesfully Added **" + args.length  + "** Account to **" + args[1] + "**")
        .setColor("0x00FF00");

        fs.readFile("accounts.json", "utf-8", function(err, data){
            if(err) throw err;
            
            var arrayOfObjects = JSON.parse(data)
                for(i = 2; i < args.length; i++){
                    arrayOfObjects.magazine[accountType].push(
                        args[i]
                    )
                }
                console.log(arrayOfObjects);
    
                fs.writeFile(accounts, JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                    message.channel.send(successEmebed);
                })
        })
    }

    if(message.content.toLocaleLowerCase().startsWith(prefix + "addaccount")){  
        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        let errorEmbedFormat = new Discord.RichEmbed()
        .setTitle("An Error Occured")
        .setDescription("The format for this command is +addaccount <acc-type> <acc|email:pass>")
        .setColor("0xff0000");

        if(!args[1] || !args[2]){
            return message.channel.send(errorEmbedFormat);
        }            

        if(!["origin", "hulu", "nordvpn", "crunchyroll", "spotify", "steam"].includes(args[1])){
            return message.channel.send(errorEmbedAvailable);
        }

        addAccounts(args[1]);
    }

    function genAccount(accountType){

        let noAccountsAvailable = new Discord.RichEmbed()
        .setTitle("No accounts available right now!")
        .setColor("0xFF0000");

        let successEmebed = new Discord.RichEmbed()
        .setTitle("Succesfully generated one **" + args[1] + "** Account!")
        .setColor("0xFF0000");

        fs.readFile(accounts, "utf-8", function(err, data){
            if(err) throw err;

            var arrayOfObjects = JSON.parse(data);
            if(!arrayOfObjects.magazine[accountType][0]){
                return message.channel.send(noAccountsAvailable);
            }
                message.author.send({embed:{
                    color : 3447003,
                    title: args[1],
                    description: arrayOfObjects.magazine[accountType][0],
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: "© zer0 Magazines | The Magazines are free!!"
                    }
                }})
            arrayOfObjects.magazine[accountType].shift();
            
            fs.writeFile(accounts, JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                if (err) throw err
                console.log('Done!');
                message.channel.send(successEmebed);
            })
        })
    }

    if(message.content.toLocaleLowerCase().startsWith(prefix + "gen")){

        if(message.channel.type === "dm") return;

        if(!["origin", "hulu", "nordvpn", "crunchyroll", "spotify", "steam"].includes(args[1])){
            return message.channel.send(errorEmbedAvailable);
        }

        genAccount(args[1]);

    }

    /*if(message.content.toLocaleLowerCase().startsWith(prefix + "addacctype")){

        if(!args[1]) return message.channel.send({embed:{
            color : 3447003,
            title: "An Error Occured",
            description: "Please specify a type of account to add!",
            footer: {
                text: "© zer0 Magazines | The Magazines are free!!"
            }
        }})

        if(accounts.includes(args[1])) return message.channel.send("This type of account already exists!")
        let successEmebed = new Discord.RichEmbed()
        .setTitle("Added a account type successfully!")
        .setDescription("Added a account type - **" + args[1] + "**")
        .setColor("0x00ff00")
        .setFooter("© zer0 Magazines | The Magazines are free!!");

        let nosuccessEmebed = new Discord.RichEmbed()
        .setTitle("An Error Occured")
        .setDescription("An error occured! Couldnt add a account type - **" + args[1] + "**")
        .setColor("0xff0000")
        .setFooter("© zer0 Magazines | The Magazines are free!!");

        fs.readFile(accounts, "utf-8", function(err, data){
            if(err) throw message.channel.send(nosuccessEmebed);

            let arrayOfObjects = JSON.parse(data);
            arrayOfObjects.magazine.newacctypes.push();

            fs.writeFile(accounts, JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                if (err) message.channel.send(nosuccessEmebed);
                console.log('Done!');
                message.channel.send(successEmebed);
            })
        })
    }*/

    if(message.content.toLocaleLowerCase().startsWith(prefix + "stock"|| prefix + "stocks")){
        fs.readFile(accounts, 'utf-8', function(err, data){
            var arrayOfObjects = JSON.parse(data);
            let accountStockEmbed = new Discord.RichEmbed()
            .setTitle("Magazine Stock")
            .setDescription("Stocks of each of the Magazines we own!")
            .addField("Origin", arrayOfObjects.origin.length)
            .addField("Spotify", arrayOfObjects.spotify.length)
            .addField("Steam", arrayOfObjects.steam.length)
            .addField("Crunchyroll", arrayOfObjects.crunchyroll.length)
            .addField("Hulu", arrayOfObjects.hulu.length)
            .addField("NordVPN", arrayOfObjects.nordvpn.length)
            .setColor("0x03fca1")
            .setFooter("© zer0 Magazines | The Magazines are free!!")
            .setThumbnail(bot.user.avatarURL);
            message.channel.send(accountStockEmbed);
        })
    }

    if(message.content.toLocaleLowerCase().startsWith(prefix + "help")){
        let NormalHelpEmbed = new Discord.RichEmbed()
        .setTitle("Magazine Commands")
        .setDescription("All Our Commands!")
        .setFooter("© zer0 Magazines | The Magazines are free!!")
        .setColor("0x03fca1")
        .setThumbnail(bot.user.avatarURL)
        .setAuthor("", bot.user.avatarURL)
        .addField("z!gen <account-type>", "Generates a account for you and sends in the DMs. To know the types of accounts available use `z!stock`")
        .addField("z!stock", "Sends the information about the whole stock available in the Magzine bot!");

        let adminHelpEmbed = new Discord.RichEmbed()
        .setTitle("Magazine Commands")
        .setDescription("All Our Commands!")
        .setFooter("© zer0 Magazines | The Magazines are free!!")
        .setColor("0x03fca1")
        .setThumbnail(bot.user.avatarURL)
        .setAuthor("", bot.user.avatarURL)
        .addField("z!gen <account-type>", "Generates a account for you and sends in the DMs. To know the types of accounts available use `z!stock`")
        .addField("z!stock", "Sends the information about the whole stock available in the Magzine bot!")
        .addField("z!addaccount", "Adds a magazine for the specified magazine type to the stock!")
        //.addField("z!addacctype", "Adds a new type of magazine to the stock!")
        //.addField("z!removeacctype", "Removes a type of magazine from the accounts stock!");

        if(message.member.hasPermission("ADMINISTRATOR")){
            message.member.send(adminHelpEmbed)
        }else{
            message.member.send(NormalHelpEmbed)
        }

        message.channel.send("Sent you a DM :kissing_heart:");
    }
});

bot.login("NjM3ODQ1MzczNzc5NDQzNzIy.XbUGbg.Ap6pA6kz143ntOOkWG_xfOw9xAQ");