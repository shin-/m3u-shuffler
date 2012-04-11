var fs = require('fs');

function recFill(cwd, mix, cb) {
	fs.readdir(cwd, function(err, files) {
		if (err) return console.error(err);
		function a(i) {
			if (i < 0)
				return cb(mix);
			fs.stat(cwd + '\\' + files[i], function(err, stats) {
				if (err) return console.error(err);
				if (stats.isDirectory()) {
					return recFill(cwd + '\\' + files[i], mix, function(m) { mix = m; a(i - 1); });
				} else if (files[i].substr(files[i].length - 4) == '.mp3') {
					mix.push(cwd + '\\' + files[i]);
				}
				a(i - 1);
			});
			
		}
		a(files.length - 1);
	});
}

recFill('.', [], function(mix) {
	var newMix = [];
	while (mix.length) {
		var i = Math.floor(Math.random() * mix.length);
		newMix.push(mix[i]);
		mix.splice(i, 1);
	}
	var newM3U = newMix.join('\n');
	fs.writeFile('playlist.m3u', newM3U, function(err) {
		if (err) return console.error(err);
		console.log('Success!');
	});
});