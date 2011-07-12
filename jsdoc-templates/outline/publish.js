function publish(symbolSet) {
	publish.conf = {  // trailing slash expected for dirs
		ext: ".html",
		outDir: JSDOC.opt.d || SYS.pwd+"../out/outline/",
		templatesDir: SYS.pwd+"../templates/outline/",
		symbolsDir: "symbols/",
		srcDir: "symbols/src/",
		projectRootDir: "C:\\projetoAjax\\tronco\\jproton\\source\\"
	};
	
	
	if (JSDOC.opt.s && defined(Link) && Link.prototype._makeSrcLink) {
		Link.prototype._makeSrcLink = function(srcFilePath) {
			return "&lt;"+srcFilePath+"&gt;";
		}
	}
	
	IO.mkPath((publish.conf.outDir+"symbols/src").split("/"));
		
	// used to check the details of things being linked to
	Link.symbolSet = symbolSet;

	try {
		var classTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"class.tmpl");
		var classesTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allclasses.tmpl");
	}
	catch(e) {
		print(e.message);
		quit();
	}
	
	// filters
	function hasNoParent($) {return ($.memberOf == "")}
	function isaFile($) {return ($.is("FILE"))}
	function isaClass($) {return ($.is("CONSTRUCTOR") || $.isNamespace)}
	
	var symbols = symbolSet.toArray();
	
	var files = JSDOC.opt.srcFiles;
 	for (var i = 0, l = files.length; i < l; i++) {
 		var file = files[i];
 		var srcDir = publish.conf.outDir + "symbols/src/";
		makeSrcFile(file, srcDir);
 	}
 	
 	var classes = symbols.filter(isaClass).sort(makeSortby("alias"));
	
	Link.base = "../";
 	publish.classesIndex = classesTemplate.process(classes); // kept in memory
	
	for (var i = 0, l = classes.length; i < l; i++) {
		var symbol = classes[i];
		var output = "";
		output = classTemplate.process(symbol);
		
		IO.saveFile(publish.conf.outDir+"symbols/", symbol.alias+publish.conf.ext, output);
	}
	
	// regenrate the index with different relative links
	Link.base = "";
	publish.classesIndex = classesTemplate.process(classes);
	
	try {
		var classesindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"index.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var classesIndex = classesindexTemplate.process(classes);
	IO.saveFile(publish.conf.outDir, "index"+publish.conf.ext, classesIndex);
	classesindexTemplate = classesIndex = classes = null;
	
	try {
		var fileindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allfiles.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var documentedFiles = symbols.filter(isaFile);
	var allFiles = [];
	
	for (var i = 0; i < files.length; i++) {
		allFiles.push(new JSDOC.Symbol(files[i], [], "FILE", new JSDOC.DocComment("/** */")));
	}
	
	for (var i = 0; i < documentedFiles.length; i++) {
		var offset = files.indexOf(documentedFiles[i].alias);
		allFiles[offset] = documentedFiles[i];
	}
		
	allFiles = allFiles.sort(makeSortby("name"));

	var filesIndex = fileindexTemplate.process(allFiles);
	IO.saveFile(publish.conf.outDir, "files"+publish.conf.ext, filesIndex);
	fileindexTemplate = filesIndex = files = null;


	var out = publish.conf.outDir, template=publish.conf.templatesDir+"static/",
    imgOut = out + "images";
    
	IO.mkPath((out+"images").split("/"));
  if (out) {
		IO.copyFile(template+"jproton.js", out);
		IO.copyFile(template+"ui.js", out);
		IO.copyFile(template+"default.css", out);
		IO.copyFile(template+"code.css", out);
		IO.copyFile(template+"sh.js", out);
		IO.copyFile(template+"sh.css", out);
		IO.copyFile(template+"images/expandbtn.gif", imgOut);
		IO.copyFile(template+"images/collapsebtn.gif", imgOut);

		IO.copyFile(template+"images/namespace_obj.png", imgOut);
		IO.copyFile(template+"images/namespace_function_obj.png", imgOut);
		IO.copyFile(template+"images/class_obj.png", imgOut);
		IO.copyFile(template+"images/class_default_obj.png", imgOut);
		IO.copyFile(template+"images/method_public_obj.png", imgOut);
		IO.copyFile(template+"images/method_private_obj.png", imgOut);
		IO.copyFile(template+"images/field_public_obj.png", imgOut);
		IO.copyFile(template+"images/field_private_obj.png", imgOut);
		IO.copyFile(template+"images/plus.gif", imgOut);
		IO.copyFile(template+"images/minus.gif", imgOut);
		IO.copyFile(template+"images/never_translate.png", imgOut);
		IO.copyFile(template+"images/bg.png", imgOut);
		IO.copyFile(template+"images/file_obj.png", imgOut);
	}
}


/** Just the first sentence. */
function summarize(desc) {
	if (typeof desc != "undefined") {
    desc = desc.replace(/\s+/g, ' ').
      replace(/"'/g, '&quot;').
      replace(/^<p>/, '');
      
		return desc.match(/([\w\W]+?\.)[^a-z0-9]/i) ? RegExp.$1 : desc;
  }
}

/** make a symbol sorter by some attribute */
function makeSortby(attribute) {
	return function(a, b) {
		if (a[attribute] != undefined && b[attribute] != undefined) {
			a = a[attribute].toLowerCase();
			b = b[attribute].toLowerCase();
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		}
	}
}
function sortByRelevance(a, b) {
  var order = {
    "_global_": 0,
    "jProton": 1,
    "jProton.Set": 2,
    "jProton.element": 3,
    "jProton.event": 4,
    "jProton.ajax": 5,
    "jProton.query": 6
  };

	a = a.get("alias");
	b = b.get("alias");
  if (order[a] > order[b]) return 1;
  if (order[a] < order[b]) return -1;
  return 0;
}

function include(path) {
	var path = publish.conf.templatesDir+path;
	return IO.readFile(path);
}

function makeSrcFile(path, srcDir, name) {
	if (JSDOC.opt.s) return;
	
	if (!name) {
		name = path.replace(publish.conf.projectRootDir, "").replace(/\.\.?[\\\/]/g, "").replace(/[\\\/]/g, "_");
		name = name.replace(/\:/g, "_");
	}
	
	var src = {path: path, name:name, charset: IO.encoding, hilited: ""};
	
	if (defined(JSDOC.PluginManager)) {
		JSDOC.PluginManager.run("onPublishSrc", src);
	}

	if (src.hilited) {
		IO.saveFile(srcDir, name+publish.conf.ext, src.hilited);
	}
}

function makeSignature(params) {
  var r = ['('], desc;
  for(var i=0, p; p=params[i]; i++) {
    // Ignora os atributos dos parametros tipo objeto
    if (p.name.indexOf('.') == -1) {
      if (i > 0)
        r.push(', ');
      
      r.push('<span');
      
      if (desc = summarize(p.desc) || p.type) {
        r.push(' title="');
        if (p.type) {
          r.push('(');
          r.push(p.type);
          r.push(') ');
        }
        r.push(desc);
        r.push('"');
      }
      
      r.push('>');
      r.push(p.name);
      r.push('</span>');
    }
  }
  r.push(')');
  return r.join('');
}

/** Find symbol {@link ...} strings in text and turn into html links */
function resolveLinks(str, from) {
	str = str.replace(/\{@link ([^} ]+) ?\}/gi,
		function(match, symbolName) {
			return new Link().toSymbol(symbolName);
		}
	);
	
	return str;
}

function hasModule(item) {
  return typeof item.augments[0] != 'undefined';  
}

function getModule(item) {
	return typeof item.augments[0] != 'undefined' ? item.augments[0] : '';
}

function getPrivateClass(item) {
  return (item.isPrivate || item.name.charAt(0) == '_') ? ' private' : '';
}

function getDesc(item) {
  return resolveLinks(summarize(item.desc));
}

function getPlainDesc(item) {
  var desc = summarize(item.desc);
  return desc.replace(/<.*?>/g, '').replace(/\{\@link\s*(.*?)\}/g, '$1');
}

function getNSClass(item) {
  if (item.isNamespace) {
    if (item.alias == "jProton" || item.alias == "jProton.ajax") 
      return " namespace-function";
      
    return " namespace";
  } else
    return "";
}
