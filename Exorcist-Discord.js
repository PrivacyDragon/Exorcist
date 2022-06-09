const Discord = require('discord.js');
const client = new Discord.Client();
//First two lines are standard bullshit.
//Now follow more important lines.
const fetch = require('node-fetch');
const fsPromises = require('fs/promises');
//Let's define who are the Devils!
const Devils = /(twitter\.com|youtube\.com|youtu\.be|youtube-nocookie\.com|reddit\.com|redd\.it|instagram\.com|medium\.com|google\.com|goo\.gl\/maps|https:\/\/t\.co[^ ]|http:\/\/t\.co..|bit\.ly\/[^ ]|rb\.gy\/[^ ]|tinyurl\.com\/[^ ]|rotf\.lol\/[^ ]|tiny\.one\/[^ ]|zpr\.io\/[^ ])/i
//And who are the beamish boys. Come to my arms, my beamish boy! O frabjous day! Callooh! Callay!
const nitter = ["nitter.net/", "nitter.42l.fr/", "nitter.pussthecat.org/", "nitter.kavin.rocks/", "nitter.unixfox.eu/", "nitter.eu/", "nitter.namazso.eu/", "n.actionsack.com/", "nitter.hu/", "nitter.moomoo.me/", "nitter.it/", "nitter.grimneko.de/", "nitter.mstdn.social/", "nitter.sethforprivacy.com/", "nttr.stream/", "nitter.cutelab.space/", "nitter.nl/", "nitter.mint.lgbt/", "nitter.bus-hit.me/", "nitter.govt.land/", "nitter.datatunnel.xyz/", "nitter.esmailelbob.xyz/", "tw.artemislena.eu/", "de.nttr.stream/", "nitter.tiekoetter.com/", "nitter.spaceint.fr/", "twtr.bch.bar/", "nitter.privacy.com.de/", "nitter.notraxx.ch/", "nitter.lunar.icu/"];
const invidious = ["yewtu.be/", "invidious.kavin.rocks/", "vid.puffyan.us/", "invidious.namazso.eu/", "inv.riverside.rocks/", "invidio.xamh.de/", "youtube.076.ne.jp/", "yt.artemislena.eu/", "tube.cthd.icu/", "invidious.flokinet.to/", "invidious.privacy.gd/", "invidious.weblibre.org/", "invidious.esmailelbob.xyz/", "invidious.lunar.icu/", "invidious.mutahar.rocks/", "https://piped.kavin.rocks/"];
const teddit = ["teddit.net/", "teddit.ggc-project.de/", "teddit.zaggy.nl/", "teddit.namazso.eu", "teddit.nautolan.racing/", "teddit.tinfoil-hat.net/", "teddit.domain.glass/", "snoo.ioens.is/", "teddit.httpjames.space/", "teddit.alefvanoon.xyz/", "incogsnoo.com/", "teddit.pussthecat.org/", "reddit.lol/", "teddit.sethforprivacy.com/", "teddit.totaldarkness.net/", "teddit.adminforge.de/", "teddit.bus-hit.me/", "teddit.froth.zone/", "rdt.trom.tf/"];
const bibliogram = ["bibliogram.art/", "bibliogram.snopyta.org/", "bibliogram.pussthecat.org/", "bibliogram.1d4.us/", "bibliogram.froth.zone/", "insta.trom.tf/", "bib.riverside.rocks/", "bibliogram.esmailelbob.xyz/", "insta.tromdienste.de/", "bib.actionsack.com/"];
const scribe = ["scribe.rip/", "scribe.nixnet.services/", "scribe.citizen4.eu/", "scribe.bus-hit.me/", "scribe.froth.zone/"];
const search = ["startpage.com/", "duckduckgo.com/", "ecosia.org/", "search.ononoki.org/", "searx.tiekoetter.com/", "paulgo.io/", "search.vojkovic.xyz/", "northboot.xyz/", "swag.pw/", "searx.prvcy.eu/", "searx.namejeff.xyz/", "searx.mha.fi/", "search.mdosch.de/", "searx.ebnar.xyz/", "search.rabbit-company.com/", "s.zhaocloud.net/", "search.bus-hit.me/", "searx.fmac.xyz/", "searx.gnous.eu/", "searx.ninja/", "searx.tyil.nl/", "searx.pwoss.org/", "anon.sx/", "search.stinpriza.org/", "searx.tuxcloud.net/", "search.disroot.org/", "search.jpope.org/", "searx.divided-by-zero.eu/", "searx.webheberg.info/", "searx.theanonymouse.xyz/", "www.gruble.de/", "searx.nevrlands.de/", "searx.gnu.style/", "searx.sp-codes.de/", "searx.roflcopter.fr/", "search.snopyta.org/", "searx.mastodontech.de/", "sx.catgirl.cloud/", "searx.slash-dev.de/"];
const translate = ["simplytranslate.org/", "st.alefvanoon.xyz/", "translate.josias.dev/", "translate.namazso.eu/", "translate.riverside.rocks/", "st.manerakai.com/", "translate.bus-hit.me/", "simplytranslate.pussthecat.org/", "translate.northboot.xyz/", "translate.tiekoetter.com/", "simplytranslate.esmailelbob.xyz/", "translate.syncpundit.com/"];

//That's it for the definitions.
//Now on to work!

client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`); //It is nice to know that the bot is online, isn't it?
        client.user.setPresence({activity: { name: 'Twitter to Nitter'}, status: 'online'});
});

client.on('message', msg => {
    try { //This is, if I remember correctly, something about stuff. I do not really know anymore what it did.
        if (global.gc) {global.gc();}
    } catch (e) {
        console.log("`node --expose-gc index.js`");
        process.exit();
    }
    if (!msg.author.bot && (msg.mentions.has(client.user) || msg.channel.type == "dm")){
        if (/%bugreport/i.test(msg.content)) {
                ReportBugs(msg.content);
        } else {
                msg.channel.send("If you do not want me to check your message for 'evil' URL's, put somewhere in your message: `%NoDevil`\nIf you want to file a bug report, mention me or DM me and put somewhere in your message: `%BugReport`.");
        }
    }
    if (!msg.author.bot && (!/%NoDevil/i.test(msg.content))){ //Only if the author is not a bot there should happen stuf. This is to prevent endless loops with bots... (Yes, it happened...)
            //Also, if someone really wants to have their demonic URL unchanged, they can start their message with "!NoDevil".
        try {
                CheckEvilStuff(msg, msg.content); //See if there are Devils in the message and remove them!
        } catch (Garmr) { //Oh no! Garmr came for us! Catch him and show what he has to say!
                console.log(Garmr);
        }
    }
}

);

function CheckEvilStuff(message, content){
        if (Devils.test(content)) {//The message contains Demonic content!
                if (/https/.test(content)){
                        BrokenDownMessage = content.split("https://");
                } else { //EW! It looks like someone does not use HTTPS!
                        BrokenDownMessage = content.split("http://");
                }
                FirstCleanStringPart = BrokenDownMessage[0];
                LastBrokenHeart = BrokenDownMessage[1].split(" ");
                DemonicURL = LastBrokenHeart.shift(); //The Demonic URL! (The original URL.)
                DemonTemp = DemonicURL.split("/");
                DemonTemp.shift();
                DemonicData = DemonTemp.join("/"); //The stuff after the domain thing.
                //And here the Fallen Angel is detected and removed! Away with the Devil! Off with his head!
                switch (DetectFallenAngel(DemonicURL)) {
                        case "Twitter":
                                BeamishBoyURL = "https://" + nitter[Math.floor(Math.random() * nitter.length)] + DemonicData;
                                break;
                        case "Youtube":
                                BeamishBoyURL = "https://" + invidious[Math.floor(Math.random() * invidious.length)] + DemonicData;
                                break;
                        case "EvilYoutube":
                                video = "watch?v=" + DemonicData;
                                BeamishBoyURL = "https://" + invidious[Math.floor(Math.random() * invidious.length)] + video;
                                break;
                        case "Reddit":
                                BeamishBoyURL = "https://" + teddit[Math.floor(Math.random() * teddit.length)] + DemonicData;
                                break;
                        case "Instagram":
                                BeamishBoyURL = "https://" + bibliogram[Math.floor(Math.random() * bibliogram.length)] + DemonicData;
                                break;
                        case "Medium":
                                BeamishBoyURL = "https://" + scribe[Math.floor(Math.random() * scribe.length)] + DemonicData;
                                break;
                        case "Google Maps":
                                var Handled = true;
                                //Break down the location. Shatter it and throw it away. Uhm, no. Wait.
                                //Shatter it and refragment it.
                                //The beamish boys do not understand the Devil's language...
                                BrokenLocation = DemonicData.split("@");
                                ShatteredLocation = BrokenLocation[1].split(",");
                                if (/\/place/.test(BrokenLocation[0])) {
                                        //Aha! they want a very specific cursed place!
                                        ShreddedPlace = BrokenLocation[0].split("place/");
                                        SpotShard = ShreddedPlace[1].split("/")[0];
                                        JSONv2Well = "https://nominatim.openstreetmap.org/search.php?q=" + ShatteredLocation[0] + "+" + ShatteredLocation[1] + "+" + SpotShard + "&format=jsonv2";
                                        fetch(JSONv2Well, {method: 'Get'}).then(Water => Water.json())
                                        .then((HolyWater) => {
                                                if (HolyWater.length != 0) {
                                                BeamishBoyURL = `https://osm.org/${HolyWater[0].osm_type}/${HolyWater[0].osm_id}`;
                                                } else {FractalZoom = ShatteredLocation[2].split("/")[0].split('z')[0];                                             BeamishBoyURL = "https://facilmap.org/#" + FractalZoom + "/" + ShatteredLocation[0] + "/" + ShatteredLocation[1] + "/Mpnk/" + SpotShard;}
                                                //Yes, I know! "Don't repeat yourself". Shut up! It is the only way I could find to get it working.
                                                //Comments to the code are in the version more below.
                                                AngelsBring = `${FirstCleanStringPart}${BeamishBoyURL} `;
                                                CleanedMessage = AngelsBring + LastBrokenHeart.join(" ");
                                                try {
                                                     message.delete().catch(error => {console.log(error);});
                                                } catch(Hell) {
                                                     console.log(Hell);
                                                        message.channel.send(`Oh no! an error occured. message could not be deleted!`);
                                                }
                                                message.channel.send(`**[${message.author.username}]** | ${CleanedMessage}`);
                                        });
                                } else {
                                        Handled = false;
                                        FractalZoom = ShatteredLocation[2].split("/")[0].split('z')[0];
                                        BeamishBoyURL = "https://facilmap.org/#q=geo%3A" + ShatteredLocation[0] + "%2C" + ShatteredLocation[1] + "%3Fz%3D" + FractalZoom;
                                }
                                break;
                        case "Google Search":
                                //Only the 'vital' demonic data has to be used. We surely do not want to scare away the beamish boys, don't we?
                                //So we should remove the source. They do not have to know that we came from Hell...
                                VitalDemonicData = DemonicData.split("&source=")[0];
                                BeamishBoyURL = "https://" + search[Math.floor(Math.random() * search.length)] + VitalDemonicData;
                                break;
                        case "Google Translate":
                                BeamishBoyURL = "https://" + translate[Math.floor(Math.random() * translate.length)] + DemonicData;
                                break;
                        case "Shortener":
                                //Little Demons have to be unfold. the Handling happens via the same function. Kinda.
                                UnfoldAndHandle(DemonicURL, message);
                                Handled = true;
                                break;
                        default:
                                Handled = true;
                                message.channel.send("I see a distinctly evil entity, but I cannot recognize it... Be warned! Beware!");
                }

                if(!Handled) {//The Google Maps stuff have their own handling, because JavaScript sucks.
                        //This means that it has to be checked whether the good URL has already been sent back or not...
                        //Therefore, the Handled variable is used. It stays 'false' as long as below things have not yet happened.
                        try {
                                BeamishBoyURL = BeamishBoyURL.split("?utm")[0]; //Remove UTM-devillish content. Beamish Boys do not use it!
                        } catch(blup) {
                                //Yeah. Nothing special.
                        }
                        //The Angels bring the message back with the clean URL.
                        AngelsBring = `${FirstCleanStringPart}${BeamishBoyURL} `;
                        //And that gives us the cleaned message! Yay!
                        CleanedMessage = AngelsBring + LastBrokenHeart.join(" ");
                        try {//You never know where the Demons are. You never know who supports them, so use 'try-catch' for deleting the Demonic message.
                                //I mean, If the message cannot be deleted, the bot should not crash.
                                //We are surely not going to give the demons what they want!
                                message.delete().catch(error => {console.log(error);});
                        } catch(Hell){
                                //And log who the hell prevented us from deleting the demonic message!
                                //How dare they!
                                console.log(Hell);
                                message.channel.send(`Oh no! an error occured. message could not be deleted!`);
                        }
                        //Finally, send the clean message.
                        message.channel.send(`**[${message.author.username}]** | ${CleanedMessage}`);
                }
        } else if (content != message.content){
                try {
                        message.delete().catch(error => {console.log(error);});
                } catch(Hell){
                        console.log(Hell);
                        message.channel.send('Oh no! an error occured. Message could not be deleted!');
                }
                message.channel.send(`**[${message.author.username}]** | ${content}`);
        }

}

client.on("messageUpdate", (AncientMessage, NewMessage) => {
        try {
                if (!NewMessage.author.bot && (!/!NoDevil/i.test(NewMessage.content)) && NewMessage.editedAt.getMinutes() - AncientMessage.createdAt.getMinutes() <= 1){//if someone really wants to have their demonic URL unchanged, they can start their message with "!NoDevil". Also, bots can post devils as much as they want. An edited message is only checked if it is edited no more than one minute after it was created.
                try {
                        CheckEvilStuff(NewMessage, NewMessage.content); //See if there are Devils in the message and remove them!
                } catch (Garmr) { //Oh no! Garmr came for us! Catch him and show what he has to say!
                        console.log(Garmr);
                }
        }
        } catch (Fish) {
                console.log(Fish); //What kind of fish did we catch?
        }
}

);


function DetectFallenAngel(Devil) {
        if (/twitter\.com/i.test(Devil)){
                //It is Twitter!!!
                return "Twitter";
        }
        else if (/youtube/i.test(Devil)){
                //It is YouTube!!!
                return "Youtube";
        }
        else if (/youtu\.be/i.test(Devil)){
                //It is YouTube Evil!!!
                return "EvilYoutube";
        }
        else if (/(reddit|redd\.it)/i.test(Devil)){
                //It is Reddit!!!
                return "Reddit";
        }
        else if (/instagram/i.test(Devil)){
                //It is Instagram!!!
                return "Instagram";
        }
        else if (/medium\.com/i.test(Devil)){
                //It is Medium!!!
                return "Medium";
        }
        else if (/google/i.test(Devil)){
                //It is something by the Evil Google!
                if (/maps/i.test(Devil)){
                        //It is Google Maps!!!
                        return "Google Maps";
                }
                else if (/search/i.test(Devil)){
                        //It is Google Search!!!
                        return "Google Search";
                }
                else if (/translate/i.test(Devil)){
                        //It is Google Translate!!!
                        return "Google Translate";
                }
                else if (Devil.endsWith("google.com") || Devil.endsWith("google.com/")){
                        //It is Google Search!!! (Kinda)...
                        return "Google Search";
                }
        }
        else if (/(t\.co|bit\.ly..|rb\.gy..|tinyurl\.com..|rotf\.lol..|tiny\.one..|zpr\.io..|goo\.gl)/i.test(Devil)){
                //It is a shortener!
                return "Shortener";
        }


}

function UnfoldAndHandle(LittleDevil, message) {
        try {
                if (/https/.test(message.content)){
                        BrokenDownMessage = message.content.split("https://");
                } else { //EW! It looks like someone does not use HTTPS!
                        BrokenDownMessage = message.content.split("http://");
                }
                FirstCleanStringPart = BrokenDownMessage[0];
                LastBrokenHeart = BrokenDownMessage[1].split(" ");
                LastBrokenHeart.shift();
                fetch(`[https://${LittleDevil]https://${LittleDevil}`, { redirect: 'manual' }) //Fecth the Little Devil to see where they go!
                .then((Murmurs) => { //Harke! They are murmuring something!
                        if (Murmurs.status === 301 || Murmurs.status === 302) {
                                DemonicURL = new URL(Murmurs.headers.get('location'), Murmurs.url).toString(); //The 'real' URL is found!
                                DemonTemp = DemonicURL.split("/");
                                DemonTemp.shift();
                                DemonicData = DemonTemp.join("/"); //The stuff after the domain thing.
                                try {
                                        DemonicURL = DemonicURL.split("?utm")[0];
                                } catch (gloep) {
                                        //Nothing to do here.
                                }
                                NewPossibleDemon = `${FirstCleanStringPart}${DemonicURL} ${LastBrokenHeart.join(" ")}`;
                                CheckEvilStuff(message, NewPossibleDemon);
                        }
                });
        } catch(GRR) {
                console.log(GRR);
        }

}

function ReportBugs(Spell) {
        try {
                Now = new Date();
                fsPromises.appendFile("Bugs_of_the_Devil.txt", `[${Now.getFullYear()}-${Now.getMonth()+1}-${Now.getDate()} | ${Now.getHours()}:${Now.getMinutes()}.${Now.getSeconds()}] ${Spell}\n\n`);
        } catch (one) {
                console.log(one);
        }
}

client.login(CLIENT_TOKEN);
