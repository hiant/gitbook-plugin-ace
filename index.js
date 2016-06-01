var escape = require('html-escape');
var hljs = require('highlight.js');
var path = require('path');
var fs = require('fs');

var map = {
	'c_cpp': 'c'
};

module.exports = {

	website: {
		assets: "./assets",
		css: [
			"ace.css"
		],
		js: [
			"ace/ace.js",
			"ace.js"
		]
	},

	ebook: {
		assets: "./assets",
		css: [
			"pdf.css"
		]
	},

	blocks: {
		ace: {
			process: function(blk) {
				var filename = blk.kwargs.filename;
				var lang = blk.kwargs.lang || (filename? path.extname(filename).slice(1) : 'java');

				var content = (filename? fs.readFileSync(filename,'utf-8').trim():blk.body.trim());
				if (this.generator === 'website') {
					var config = {
						edit: false,
						lang: lang,
						check: blk.kwargs.check,
						theme: blk.kwargs.theme
					};
					return '<div class="ace"><div class="aceCode" data-config=' + JSON.stringify(config) + '>' + escape(content) + '<br></div></div>';
				} else {
					lang = map[lang] || lang;

					if (hljs.getLanguage(lang))
						content = hljs.highlight(lang, content).value;

					return '<pre><code class="hljs lang-' + lang + '">' + content + '</code></pre>';
				}
			}
		}
	}
};
