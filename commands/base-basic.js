/*
	Basic Commands
*/

Settings.addPermissions(['say']);

exports.commands = {
	credits: 'about',
	bot: 'about',
	about: function () {
		this.restrictReply(this.trad('about') + ". " + this.trad('author') + ": " + Settings.package.author.name + ". (" + Settings.package.homepage + ")", 'info');
	},
	
	suspect: function () {
		if (!this.isRanked('+')) return false;
		this.reply('Little Cup is currently suspecting Drifloon! Check it out here:' + " (http://www.smogon.com/forums/threads/lc-suspect-black-balloon.3575912/)", 'info');
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

	git: 'github',
	github: function () {
		if (Settings.package.repository) this.restrictReply(Tools.stripCommands(Settings.package.repository.url), 'info');
	},

	botversion: 'version',
	version: function () {
		this.restrictReply(Tools.stripCommands(Settings.package.version), 'info');
	},

	guide: 'help',
	botguide: 'help',
	help: function () {
		this.restrictReply(this.trad('guide') + ': ' + (Config.botguide || (Settings.package.homepage + "/blob/master/commands/README.md")), 'info');
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
    	
    	flirt: function (target, room, user) {
		if (!this.isRanked('%')) return false;
        if (this.roomType !== 'chat' || !this.can('flirt')) return;
        if (!target) return;
        
        var lines = [
       		'you are hotter than the bottom of my laptop.',
       		'if i could rearrange the alphabet, i\'d put my dick in your butt.',
       		'my mom thinks i\'m gay, can you help me prove her wrong?',
       		'there are 8 planets in the universe, but only 7 after I destroy Uranus',
       		'you know why I am like a squirrel? Cause I want to bury my nuts in you.',
       		'I like every bone in your body, especially mine.',
       		'I`m no weatherman, but you can expect a few inches tonight.',
       		'You make me want to calibrate my joystick without the latest drivers',
       		'is that a keg in your pants? Because I’d love to tap that ass'
        	];
        var line = Math.floor(Math.random() * lines.length);
        this.reply('Hey ' + target + ', ' + lines[line]);
    },

	seen: function (arg, by, room, cmd) {
		var text = '';
		arg = toId(arg);
		if (!arg || arg.length > 18) return this.pmReply(this.trad('inv'));
		if (arg === toId(Bot.status.nickName)) return this.pmReply(this.trad('bot'));
		if (arg === toId(by)) return this.pmReply(this.trad('self'));
		var dSeen = Settings.userManager.getSeen(arg);
		if (dSeen) {
			text += '**' + (dSeen.name || arg).trim() + '** ' + this.trad('s1') + ' __' + Tools.getTimeAgo(dSeen.time, this.language).trim() + (this.trad('s2') ? ('__ ' + this.trad('s2')) : '__');
			if (dSeen.room) {
				switch (dSeen.action) {
					case 'j':
						text += ', ' + this.trad('j') + ' <<' + dSeen.room + '>>';
						break;
					case 'l':
						text += ', ' + this.trad('l') + ' <<' + dSeen.room + '>>';
						break;
					case 'c':
						text += ', ' + this.trad('c') + ' <<' + dSeen.room + '>>';
						break;
					case 'n':
						text += ', ' + this.trad('n') + ' **' + dSeen.args[0] + '**';
						break;
				}
			}
		} else {
			text += this.trad('n1') + ' ' + arg + ' ' + this.trad('n2');
		}
		this.pmReply(text);
	},

	publicalts: 'alts',
	alts: function (arg) {
		var text = '';
		arg = toId(arg);
		if (!arg || arg.length > 18) return this.pmReply(this.trad('inv'));
		var alts = Settings.userManager.getAlts(arg);
		if (alts && alts.length) {
			if (this.can("alts")) {
				var cmds = [];
				var toAdd;
				text += this.trad('alts') + " " + Settings.userManager.getName(arg) + ": ";
				for (var i = 0; i < alts.length; i++) {
					toAdd = alts[i] + (i < alts.length - 1 ? ", " : "");
					if ((text + toAdd).length > 300) {
						cmds.push(text);
						text = "";
					}
					text += toAdd;
				}
				if (text.length) cmds.push(text);
				this.pmReply(cmds);
				return;
			} else {
				if (alts.length <= 10) {
					text += this.trad('alts') + " " + Settings.userManager.getName(arg) + ": " + alts.join(", ");
				} else {
					var fAlts = [];
					for (var i = alts.length - 1; i >= 0 && i > alts.length - 10; i--) {
						fAlts.push(alts[i]);
					}
					text += this.trad('alts') + " " + Settings.userManager.getName(arg) + ": " + fAlts.join(", ") + ", (" + (alts.length - 10) + this.trad('more') + ")";
				}
			}
		} else {
			text += this.trad('n') + ' ' +  Settings.userManager.getName(arg);
		}
		this.pmReply(text);
	},

	say: function (arg) {
		if (!arg) return;
		if (!this.can('say')) return;
		this.reply(Tools.stripCommands(arg));
	}
};