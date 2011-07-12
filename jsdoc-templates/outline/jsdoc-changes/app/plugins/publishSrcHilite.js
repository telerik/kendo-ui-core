JSDOC.PluginManager.registerPlugin(
	"JSDOC.publishSrcHilite",
	{
		onPublishSrc: function(src) {
			if (src.path in JsHilite.cache) {
				return; // already generated src code
			}
			else JsHilite.cache[src.path] = true;
			
			try {
				var sourceCode = IO.readFile(src.path);
			}
			catch(e) {
				print(e.message);
				quit();
			}

			var hiliter = new JsHilite(sourceCode, src.charset);
			src.hilited = hiliter.hilite();
		}
	}
);

function JsHilite(src, charset) {

	var tr = new JSDOC.TokenReader();
	
	tr.keepComments = true;
	tr.keepDocs = true;
	tr.keepWhite = true;
	
	this.tokens = tr.tokenize(new JSDOC.TextStream(src));
	
	// TODO is redefining toString() the best way?
	JSDOC.Token.prototype.toString = function() { 
		return "<span class=\""+this.type+"\">"+this.data.replace(/</g, "&lt;")+"</span>";
	}
	
	if (!charset) charset = "utf-8";
	
	this.header = '<html><head><meta http-equiv="content-type" content="text/html; charset='+charset+'"> '+
		'<link rel=stylesheet href="../../code.css" type="text/css">' +
	  '</head><body><pre>';
	this.footer = "</pre></body></html>";
	this.showLinenumbers = true;
}

JsHilite.cache = {};

JsHilite.prototype.hilite = function() {
	var hilited = this.tokens.join("");
	var linenumber = 1;

	if (this.showLinenumbers) 
    hilited = hilited.replace(/(^|\n)/g, function(m){
        return m+"<span class='linenumber'>"+(linenumber<10?" ":"")+(linenumber<100?" ":"")+(linenumber<1000?" ":"")+(linenumber++)+"</span> "}
      );
	
	return this.header+hilited+this.footer;
}