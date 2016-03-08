var lazy = require('lazy');
var banned = [];

exports.commands = {
    validate: function (arg, by, room, cmd) {
    	console.log('ran');
        var link = arg;
        if (!link) return this.reply(this.trad('u1') + ': ' + this.cmdToken + cmd + ' ' + this.trad('u2'));
		if (link.substr(-1) === '/') link = link.substr(0, link.length - 1);
		var splitedLink = link.split('/');
		link = 'http://hastebin.com/raw/' + splitedLink[splitedLink.length - 1];
		var http = require('http');
				http.get(link, function (res) {
					var data = '';
					res.on('data', function (part) {
						data += part;
					}.bind(this));
					res.on('end', function (end) {
						if (data === '{"message":"Document not found."}') {
							Bot.say(room, this.trad('err1'));
							return;
						}
						var team, packed;
						try {
							team = Tools.teamToJSON(data);
							console.log(team);
						    new lazy(team)
     							.lines
     							.forEach(function(line){
      						var found = 0;
      						var i = 0;
      						var hits = [];
      						while (found = 0) {
    							 if (lines.indexOf(banned[i]) > -1) {
        						 console.log('Yeah this line contains a words from the array');
          						found += 1;
          						this.reply(banned[i] + 'is banned from the tour.');
        						 }
          						i++;
     							}
 							});
						} catch (e) {
							errlog(e.stack);
							Bot.say(room, this.trad('err2'));
							return;
						}
					}.bind(this));
					res.on('error', function (end) {
						Bot.say(room, this.trad('err4'));
					}.bind(this));
				}.bind(this)).on('error', function (e) {
					Bot.say(room, this.trad('err4'));
				}.bind(this));
    }
};