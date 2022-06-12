import re, random, json
import asyncio
from markdown import markdown
from nio import *
import requests
clientee = ""
Devils = re.compile("(twitter\.com|youtube\.com|youtu\.be|youtube-nocookie\.com|reddit\.com|redd\.it|instagram\.com|medium\.com|google\.com|goo\.gl\/maps|https:\/\/t\.co[^ ]|http:\/\/t\.co..|bit\.ly\/[^ ]|rb\.gy\/[^ ]|tinyurl\.com\/[^ ]|rotf\.lol\/[^ ]|tiny\.one\/[^ ]|zpr\.io\/[^ ])", re.IGNORECASE)
nitter = ["nitter.net/", "nitter.42l.fr/", "nitter.pussthecat.org/", "nitter.kavin.rocks/", "nitter.unixfox.eu/", "nitter.eu/", "nitter.namazso.eu/", "n.actionsack.com/", "nitter.hu/", "nitter.moomoo.me/", "nitter.it/", "nitter.grimneko.de/", "nitter.mstdn.social/", "nitter.sethforprivacy.com/", "nttr.stream/", "nitter.cutelab.space/", "nitter.nl/", "nitter.mint.lgbt/", "nitter.bus-hit.me/", "nitter.govt.land/", "nitter.datatunnel.xyz/", "nitter.esmailelbob.xyz/", "tw.artemislena.eu/", "de.nttr.stream/", "nitter.tiekoetter.com/", "nitter.spaceint.fr/", "twtr.bch.bar/", "nitter.privacy.com.de/", "nitter.notraxx.ch/", "nitter.lunar.icu/"];
invidious = ["yewtu.be/", "invidious.kavin.rocks/", "vid.puffyan.us/", "invidious.namazso.eu/", "inv.riverside.rocks/", "invidio.xamh.de/", "youtube.076.ne.jp/", "yt.artemislena.eu/", "tube.cthd.icu/", "invidious.flokinet.to/", "invidious.privacy.gd/", "invidious.weblibre.org/", "invidious.esmailelbob.xyz/", "invidious.lunar.icu/", "invidious.mutahar.rocks/", "https://piped.kavin.rocks/"];
teddit = ["teddit.net/", "teddit.ggc-project.de/", "teddit.zaggy.nl/", "teddit.namazso.eu", "teddit.nautolan.racing/", "teddit.tinfoil-hat.net/", "teddit.domain.glass/", "snoo.ioens.is/", "teddit.httpjames.space/", "teddit.alefvanoon.xyz/", "incogsnoo.com/", "teddit.pussthecat.org/", "reddit.lol/", "teddit.sethforprivacy.com/", "teddit.totaldarkness.net/", "teddit.adminforge.de/", "teddit.bus-hit.me/", "teddit.froth.zone/", "rdt.trom.tf/"];
bibliogram = ["bibliogram.art/", "bibliogram.snopyta.org/", "bibliogram.pussthecat.org/", "bibliogram.1d4.us/", "bibliogram.froth.zone/", "insta.trom.tf/", "bib.riverside.rocks/", "bibliogram.esmailelbob.xyz/", "insta.tromdienste.de/", "bib.actionsack.com/"];
scribe = ["scribe.rip/", "scribe.nixnet.services/", "scribe.citizen4.eu/", "scribe.bus-hit.me/", "scribe.froth.zone/"];
search = ["startpage.com/", "duckduckgo.com/", "ecosia.org/", "search.ononoki.org/", "searx.tiekoetter.com/", "paulgo.io/", "search.vojkovic.xyz/", "northboot.xyz/", "swag.pw/", "searx.namejeff.xyz/", "searx.mha.fi/", "search.mdosch.de/", "searx.ebnar.xyz/", "search.rabbit-company.com/", "s.zhaocloud.net/", "search.bus-hit.me/", "searx.fmac.xyz/", "searx.gnous.eu/", "searx.ninja/", "searx.tyil.nl/", "searx.pwoss.org/", "anon.sx/", "search.stinpriza.org/", "searx.tuxcloud.net/", "search.disroot.org/", "search.jpope.org/", "searx.divided-by-zero.eu/", "searx.webheberg.info/", "www.gruble.de/", "searx.nevrlands.de/", "searx.gnu.style/", "searx.sp-codes.de/", "searx.roflcopter.fr/", "search.snopyta.org/", "searx.mastodontech.de/", "sx.catgirl.cloud/", "searx.slash-dev.de/"];
translate = ["simplytranslate.org/", "st.alefvanoon.xyz/", "translate.josias.dev/", "translate.namazso.eu/", "translate.riverside.rocks/", "st.manerakai.com/", "translate.bus-hit.me/", "simplytranslate.pussthecat.org/", "translate.northboot.xyz/", "translate.tiekoetter.com/", "simplytranslate.esmailelbob.xyz/", "translate.syncpundit.com/"];


async def message_cb(room, event):
    if "Exorcist (bot)" in event.body and room.user_name(event.sender) != "Exorcist (bot)":
        if re.search("%BugReport", event.body, re.I):
            if event.body.isascii():
                ReportBugs(event.body)
                await clientee.room_send(                                 room_id=room.room_id,                                 message_type="m.room.message",                        ignore_unverified_devices=True,                       content={"msgtype": "m.text", "body": "Thank you! We found a shelter for the bug in the Asylum!"})
            else:
                await clientee.room_send(
                    room_id=room.room_id,
                    message_type="m.room.message",
                    ignore_unverified_devices=True,
                    content={"msgtype": "m.text", "body": "I am very sorry, but bug reports may only contain ASCII characters."})
        else:
            await clientee.room_send(
                    room_id=room.room_id,
                    message_type="m.room.message",
                    ignore_unverified_devices=True,
                    content={"msgtype": "m.text", "format": "org.matrix.custom.html", "body": "If you do not want me to check your message for 'evil' URL's, put somewhere in your message: `%NoDevil`\nIf you want to file a bug report, mention me or DM me and put somewhere in your message: `%BugReport`.", "formatted_body": markdown("If you do not want me to check your message for 'evil' URL's, put somewhere in your message: `%NoDevil`\nIf you want to file a bug report, mention me or DM me and put somewhere in your message: `%BugReport`.\nI am being maintained by Privacy_Dragon, also known as StoryDragon. (@storydragon:semi.social)")})
    if Devils.search(event.body) and room.room_id != EXCLUDED_ROOM_ID and not re.search("%NoDevil", event.body, re.I):
        try:
            await CheckEvilStuff(event, event.body, room)
        except:
            print("Something went wrong while dealing with a Devil!")

async def CheckEvilStuff(event, message, room):
    sender = room.user_name(event.sender)
    if not sender:
        sender = event.sender
    if Devils.search(message):
        Handled = False
        if re.search("https://", message):
            BrokenDownMessage = re.split("https://", message)
        else:
            try:
                BrokenDownMessage = re.split("http://", message)
            except:
                return
        FirstCleanStringPart = BrokenDownMessage[0]
        LastBrokenHeart = BrokenDownMessage[1].split(" ")
        DemonicURL = LastBrokenHeart.pop(0) #The Demonic URL! (The original URL.)
        DemonTemp = DemonicURL.split("/")
        DemonTemp.pop(0)
        DemonicData = "/".join(DemonTemp) #The stuff after the domain thing.
        random.seed()
        KindOf = DetectFallenAngel(DemonicURL)
        if KindOf == "Twitter":
            BeamishBoyURL = "https://" + nitter[random.randint(0, len(nitter))] + DemonicData
        elif KindOf == "Youtube":
            BeamishBoyURL = "https://" + invidious[random.randint(0, len(invidious))] + DemonicData
        elif KindOf == "EvilYoutube":
            video = "watch?v=" + DemonicData
            BeamishBoyURL = "https://" + invidious[random.randint(0, len(invidious))] + video
        elif KindOf == "Reddit":
            BeamishBoyURL = "https://" + teddit[random.randint(0, len(teddit))] + DemonicData
        elif KindOf == "Instagram":
            BeamishBoyURL = "https://" + bibliogram[random.randint(0, len(bibliogram))] + DemonicData
        elif KindOf == "Medium":
            BeamishBoyURL = "https://" + scribe[random.randint(0, len(scribe))] + DemonicData
        elif KindOf == "Google Maps":
            Handled = True
            BrokenLocation = DemonicData.split("@")
            ShatteredLocation = BrokenLocation[1].split(",")
            if re.search("/place", BrokenLocation[0]):
                ShreddedPlace = BrokenLocation[0].split("place/")
                SpotShard = ShreddedPlace[1].split("/")[0]
                JSONv2Well = "https://nominatim.openstreetmap.org/search.php?q=" + ShatteredLocation[0] + "+" + ShatteredLocation[1] + "+" + SpotShard + "&format=jsonv2"
                Water = requests.get(JSONv2Well)
                HolyWater = Water.json()
                if len(HolyWater) != 0:
                    BeamishBoyURL = "https://osm.org/" + HolyWater[0]["osm_type"] + "/" + str(HolyWater[0]["osm_id"])
                else:
                    FractalZoom = ShatteredLocation[2].split("/")[0].split('z')[0]
                    BeamishBoyURL = "https://facilmap.org/#" + FractalZoom + "/" + ShatteredLocation[0] + "/" + ShatteredLocation[1] + "/Mpnk/" + SpotShard
                AngelsBring = FirstCleanStringPart + BeamishBoyURL
                CleanedMessage = AngelsBring + " ".join(LastBrokenHeart)
                try:
                    await clientee.room_redact(room_id=room.room_id, event_id=event.event_id, reason="Message contains an evil URL!")
                except:
                    print("Could not remove message!")
                await clientee.room_send(
                        room_id=room.room_id,
                        message_type="m.room.message",
                        ignore_unverified_devices=True,
                        content={"msgtype": "m.text", "format": "org.matrix.custom.html",
                        "body": "**[{}]** | {}".format(sender, CleanedMessage), "formatted_body": markdown("**[{}]** | {}".format(sender, CleanedMessage))})
            else:
                Handled = False
                FractalZoom = ShatteredLocation[2].split("/")[0].split('z')[0]
                BeamishBoyURL = "https://facilmap.org/#q=geo%3A" + ShatteredLocation[0] + "%2C" + ShatteredLocation[1] + "%3Fz%3D" + FractalZoom
        elif KindOf == "Google Search":
            try:
                VitalDemonicData = DemonicData.split("&source=")[0]
            except:
                VitalDemonicData = DemonicData
            BeamishBoyURL = "https://" + search[random.randint(0, len(search))] + VitalDemonicData
        elif KindOf == "Google Translate":
            BeamishBoyURL = "https://" + translate[random.randint(0, len(translate))] + DemonicData
        elif KindOf == "Shortener":
            await UnfoldAndHandle(DemonicURL, event, room)
            Handled = True
        else:
            Handled = True
            await clientee.room_send(
                    room_id=room.room_id,
                    message_type="m.room.message",
                    ignore_unverified_devices=True,
                    content={"msgtype": "m.text", "body": "I see a distinctly evil entity, but I cannot recognize it... Be warned! Beware!"})
        if not Handled:
            try:
                BeamishBoyURL = BeamishBoyURL.split("?utm")[0]
            except:
                print("No tracking!")
            AngelsBring = "{}{} ".format(FirstCleanStringPart, BeamishBoyURL)
            CleanedMessage = AngelsBring + " ".join(LastBrokenHeart)
            try:
                await clientee.room_redact(room_id=room.room_id, event_id=event.event_id, reason="Message contains an evil URL!")
            except:
                print("Could not remove message!")
            await clientee.room_send(
                    room_id=room.room_id,
                    message_type="m.room.message",
                    ignore_unverified_devices=True,
                    content={"msgtype": "m.text", "format": "org.matrix.custom.html", "body": "**[{}]** | {}".format(sender, CleanedMessage), "formatted_body": markdown("**[{}]** | {}".format(sender, CleanedMessage))})
    elif message != event.body:
        try:
            await clientee.room_redact(room_id=room.room_id, event_id=event.event_id, reason="Message contains an evil URL!")
        except:
            print("Could not remove message!")
        await clientee.room_send(
                    room_id=room.room_id,
                    message_type="m.room.message",
                    ignore_unverified_devices=True,
                    content={"msgtype": "m.text", "format": "org.matrix.custom.html", "body": "**[{}]** | {}".format(sender, message), "formatted_body": markdown("**[{}]** | {}".format(sender, message))})

def DetectFallenAngel(Devil):
    if re.search("twitter\.com", Devil, re.I):
        return "Twitter"
    elif re.search("youtube\.", Devil, re.I):
        return "Youtube"
    elif re.search("youtu\.be", Devil, re.I):
        return "EvilYoutube"
    elif re.search("(reddit|redd\.it)", Devil, re.I):
        return "Reddit"
    elif re.search("instagram", Devil, re.I):
        return "Instagram"
    elif re.search("medium\.com", Devil, re.I):
        return "Medium"
    elif re.search("(t\.co|bit\.ly..|rb\.gy..|tinyurl\.com..|rotf\.lol..|tiny\.one..|zpr\.io..|goo\.gl)", Devil, re.I):
        return "Shortener"
    elif re.search("google", Devil, re.I):
        if re.search("maps", Devil, re.I):
            return "Google Maps"
        elif re.search("search", Devil, re.I):
            return "Google Search"
        elif re.search("translate", Devil, re.I):
            return "Google Translate"
        elif re.search("google\.com$", Devil, re.I) or re.search("google\.com/$", Devil, re.I):
            return "Google Search"

async def UnfoldAndHandle(LittleDevil, event, room):
    message = event.body
    if re.search("https://", message):
        BrokenDownMessage = re.split("https://", message)
    else:
        try:
            BrokenDownMessage = re.split("http://", message)
        except:
            return
    FirstCleanStringPart = BrokenDownMessage[0]
    LastBrokenHeart = BrokenDownMessage[1].split(" ")
    LastBrokenHeart.pop(0)
    Murmurs = requests.head("https://{}".format(LittleDevil), allow_redirects=True)
    DemonicURL = Murmurs.url
    DemonTemp = DemonicURL.split("/")
    DemonTemp.pop(0)
    DemonicData = "/".join(DemonTemp)
    try:
        DemonicURL = DemonicURL.split("?utm")[0]
    except:
        1+1
    NewPossibleDemon = "{}{} {}".format(FirstCleanStringPart, DemonicURL, " ".join(LastBrokenHeart))
    await CheckEvilStuff(event, NewPossibleDemon, room)

def ReportBugs(bug):
    BugAsylum = open(BUG_REPORTS_FILE, "a")
    BugAsylum.write("[{time}] -- {problem}\n\n".format(time = datetime.now(), problem = bug))
    BugAsylum.close()

async def main():
    global clientee
    client_config = AsyncClientConfig(
        store_sync_tokens=True,
        encryption_enabled=True,
    )
    clientee = AsyncClient(HOME_SERVER, BOT_USER_HANDLE, CLIENT_ID ,store_path=STORE_PATH, config=client_config )
    clientee.add_event_callback(message_cb, RoomMessageText)
    clientee.restore_login(BOT_USER_HANDLE, CLIENT_ID, SESSION_TOKEN)
    print("Running...")

    if clientee.should_upload_keys:
        await clientee.keys_upload()
    await clientee.sync_forever(timeout=30000)

asyncio.get_event_loop().run_until_complete(main())
