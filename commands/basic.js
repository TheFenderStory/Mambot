/*
	Basic Commands
*/
var repeatTimer = null;

function setPermission(room, perm, rank) {
	if (!Settings.settings.commands) Settings.settings.commands = {};
	if (!Settings.settings.commands[room]) Settings.settings.commands[room] = {};
	Settings.settings.commands[room][perm] = rank;
	Settings.save();
}

function repeat(room) {
	Bot.say(room, 'hi friends!');
}

Settings.addPermissions(['say']);

exports.commands = {
	credits: 'about',
	bot: 'about',
	about: function () {
		this.restrictReply(this.trad('about') + " (https://github.com/Ecuacion/Pokemon-Showdown-Node-Bot)", 'info');
	},
	
	suspect: function () {
		if (!this.isRanked('+')) return false;
		this.reply(this.trad('suspect') + " (http://www.smogon.com/forums/threads/lc-suspect-diglett.3566865/)", 'info');
	},
	
	viability: function () {
		if (!this.isRanked('+')) return false;
		this.reply(this.trad('viability') + " (http://www.smogon.com/forums/threads/lc-viability-rankings-2-0.3547566/page-5#post-6519836)", 'info');
	},
	
	introductions: function () {
		if (!this.isRanked('+')) return false;
		this.reply(this.trad('introductions') + " (http://www.smogon.com/forums/threads/useful-lc-stuff-introductions-simple-questions-simple-answers.3491009/)", 'info');
	},
	
	timburr: function () {
		if (!this.isRanked('+')) return false;
		this.reply(this.trad('timburr') + " (http://www.smogon.com/forums/threads/metagame-discussion-thread.3505710/page-55#post-6586231)", 'info');
	},
	
	resource: function () {
		if (!this.isRanked('+')) return false;
		this.reply(this.trad('resource') + " (http://www.smogon.com/forums/threads/little-cup-resource-thread.3548652/)", 'info');
	},

	bottime: 'time',
	time: function () {
		var f = new Date();
		this.restrictReply("**" + this.trad('time') + ":** __" + f.toString() + "__", 'info');
	},

	uptime: function () {
		var text = '';
		text += '**Uptime:** ';
		var divisors = [52, 7, 24, 60, 60];
		var units = [this.trad('week'), this.trad('day'), this.trad('hour'), this.trad('minute'), this.trad('second')];
		var buffer = [];
		var uptime = ~~(process.uptime());
		do {
			var divisor = divisors.pop();
			var unit = uptime % divisor;
			if (!unit) {
				units.pop();
				uptime = ~~(uptime / divisor);
				continue;
			}
			buffer.push(unit > 1 ? unit + ' ' + units.pop() + 's' : unit + ' ' + units.pop());
			uptime = ~~(uptime / divisor);
		} while (uptime);

		switch (buffer.length) {
		case 5:
			text += buffer[4] + ', ';
			text += buffer[3] + ', ';
			text += buffer[2] + ', ' + buffer[1] + ', ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 4:
			text += buffer[3] + ', ';
			text += buffer[2] + ', ' + buffer[1] + ', ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 3:
			text += buffer[2] + ', ' + buffer[1] + ', ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 2:
			text += buffer[1] + ' ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 1:
			text += buffer[0];
			break;
		}
		this.restrictReply(text, 'info');
	},

	seen: function (arg, by, room, cmd) {
		var text = '';
		var name = arg;
		arg = toId(arg);
		if (!arg || arg.length > 18) return this.pmReply(this.trad('inv'));
		if (arg === toId(Bot.status.nickName)) return this.pmReply(this.trad('bot'));
		if (arg === toId(by)) return this.pmReply(this.trad('self'));
		if (Settings.seen[arg]) {
			var dSeen = Settings.seen[arg];
			var lang = Config.language || 'english';
			if (Settings.settings['language'] && Settings.settings['language'][room]) lang = Settings.settings['language'][room];
			text += name + ' ' + this.trad('s1') + ' ' + Tools.getTimeAgo(dSeen.time, lang) + (this.trad('s2') ? (' ' + this.trad('s2')) : '');
			if (dSeen.room) {
				switch (dSeen.action) {
					case 'j':
						text += ', ' + this.trad('j') + ' ' + dSeen.room;
						break;
					case 'l':
						text += ', ' + this.trad('l') + ' ' + dSeen.room;
						break;
					case 'c':
						text += ', ' + this.trad('c') + ' ' + dSeen.room;
						break;
					case 'n':
						text += ', ' + this.trad('n') + ' ' + dSeen.args[0];
						break;
				}
			}
		} else {
			text += this.trad('n1') + ' ' + arg + ' ' + this.trad('n2');
		}
		this.pmReply(text);
	},

	say: function (arg) {
		if (!arg) return;
		if (!this.can('say')) return;
		this.reply(Tools.stripCommands(arg));
	},
	
	repeat: function (arg, by, room, cmd) {
		if (!this.isRanked('#')) return false;
		var lang = toId(arg);
		if (lang === 'on') {
			var repeatTimer = setInterval(repeat(room), 180000);
		} else if (lang === 'off') {
			clearInterval(repeatTimer);
		}
		Bot.say(room, "Now on repeat mode");
	},

	lang: 'language',
	language: function (arg, by, room, cmd) {
		if (!this.isRanked('#')) return false;
		if (this.roomType !== 'chat') return this.reply(this.trad('notchat'));
		var lang = toId(arg);
		if (!lang.length) return this.reply(this.trad('nolang'));
		if (!Tools.translations[lang]) return this.reply(this.trad('v') + ': ' + Object.keys(Tools.translations).join(', '));
		if (!Settings.settings['language']) Settings.settings['language'] = {};
		Settings.settings['language'][room] = lang;
		Settings.save();
		this.reply(this.trad('l'));
	},
	
	   insult: function (target, room, user) {
		if (!this.isRanked('%')) return false;
        if (this.roomType !== 'chat' || !this.can('insult')) return;
        if (!target) return;
        
        var arrayA = [
            'the dude who got shit on by Pawniard on ladder and changed his Timburr to Spritzee',
            'guess you couldve gone all the way after critting me 4 times in our dpp ou playoffs game but hey not quite there yet in terms of skill',
            'bet you played more mons than me in the last 2 weeks alone good job "not caring"',
            'if i cared about mons half as much as you do id jerk off to the unbelievable thought of you winning once in your life',
            'i hate it when dumbass bitches like you make retarded moves and choke the whole fucking game away that way',
            'i swear to fucking god how can a single player be this lucky after getting played all the fucking way',
            'no person using a team that shit and standard and fucking horrible in ORAS should ever be gaining any of my respect whatsoever because its disgusting and a waste of time',
            'arent you the guy whose friend got fucking trashbagged by me in what 12 minutes? while he cheered for him',
            'arent you the guy whose friend got fucking trashbagged by me in what 12 minutes? while he cheered for him',
            'something is very wrong with your head to begin with, seeing how you cant handle a timer consisting of 300 seconds in a game designed for children and actually start to hyperventilate'];
            
        var arrayB = [
            'Maybe you should shut the fuck up instead of calling out other people',
            'Get real',
            'Why are you still posting',
            'You almost ruined our season by just existing',
            'You are a mere slave',
            'I am here to show Smogon how fucking awful you are at everything',
            'You\'re useless for everything everywhere on Smogon',
            'I wish the people i played werent actually worthless',
            'Die in a ditch and dont ever mention my name again',
            'This felt like the special olympics of ORAS'];
            
        var arrayC = [
            'nut-hugger',
            'dumbass baboon',
            'glorified heap of trash',
            'filth',
            'stinky italian',
            'worthless protoplasm',
            'random grinch',
            'useless sack of shit',
            'no one on a site that means nothing',
            'literal trash'];
            
        var returnInfo = [arrayA[Math.floor(Math.random() * 10)], arrayB[Math.floor(Math.random() * 10)], arrayC[Math.floor(Math.random() * 10)]];
        this.reply('Oh, its ' + target + ', ' + returnInfo[0] + '. ' + returnInfo[1] + ' you ' + returnInfo[2] + '.');
    },

	settings: 'set',
	set: function (arg, by, room, cmd) {
		if (!this.isRanked('#')) return false;
		if (this.roomType !== 'chat') return this.reply(this.trad('notchat'));
		var args = arg.split(",");
		if (args.length < 2) return this.reply(this.trad('u1') + ": " + this.cmdToken + cmd + " " + this.trad('u2'));
		var perm = toId(args[0]);
		var rank = args[1].trim();
		if (!(perm in Settings.permissions)) {
			return this.reply(this.trad('ps') + ": " + Object.keys(Settings.permissions).sort().join(", "));
		}
		if (rank in {'off': 1, 'disable': 1}) {
			if (!this.canSet(perm, true)) return this.reply(this.trad('denied'));
			setPermission(room, perm, true);
			return this.reply(this.trad('p') + " **" + perm + "** " + this.trad('d'));
		}
		if (rank in {'on': 1, 'all': 1, 'enable': 1}) {
			if (!this.canSet(perm, ' ')) return this.reply(this.trad('denied'));
			setPermission(room, perm, ' ');
			return this.reply(this.trad('p') + " **" + perm + "** " + this.trad('a'));
		}
		if (Config.ranks.indexOf(rank) >= 0) {
			if (!this.canSet(perm, rank)) return this.reply(this.trad('denied'));
			setPermission(room, perm, rank);
			return this.reply(this.trad('p') + " **" + perm + "** " + this.trad('r') + ' ' + rank + " " + this.trad('r2'));
		} else {
			return this.reply(this.trad('not1') + " " + rank + " " + this.trad('not2'));
		}
	}
};
