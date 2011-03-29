/**
 * @preserve JavaScript Preprocessor v0.33
 *
 * Licensed under the new BSD License.
 * Copyright 2009, Bram Stein
 * All rights reserved.
 */
/*
 * This is a simple JavaScript preprocessor to enable conditional compilation. The 
 * syntax of the preprocessor is a subset of the C preprocessor. This means that all 
 * JavaScript preprocessor directives are valid C preprocessor directives (and can
 * thus be used with the C preprocessor), but not the other way around. 
 *
 * Pseudo EBNF for the preprocessor:
 * ---------------------------------
 * block       ::= statement block
 * 
 * statement        ::= if-statement |
 *                      define-statement |
 *                      undef-statement |
 *                      line
 *                  
 * if-statement     ::= ('#ifdef' | '#ifndef') <identifier> block ['#else' block] '#endif'
 * 
 * define-statement ::= '#define' <identifier>
 * undef-statement  ::= '#undef' <identifier>
 *
 * <identifier>     ::= [A-Za-z0-9_]
 */
/*global block*/
var preprocess = function (source, definitions) {
    var lines = [],
		p,
		lexer = function (lines) {
			var tokens = new RegExp("^\\s*//\\s*#(ifdef|ifndef|endif|else|define|undef|.*)\\s*(\\w*)$"),
				index = 0, m;

			function token(t, v, p) {
				return {
					id: t,
					value: v,
					position: p,
					toString: function () {
						return this.id + ' = "' + this.value + '", at: ' + this.position + '\n';
					}
				};
			}

			return {
				hasNext: function () {
				    return index < lines.length;
				},
				next: function () {
					if (index < lines.length) {
						m = tokens.exec(lines[index]);
						index += 1;
						if (m) {
							return token(m[1], m[2], index);
						} else {
							return token('line', lines[index - 1], index);
						}
					}
					return false;
				}
			};
		},
		parser = function (lines, definitions) {
			var	previousToken,
				token,
				l = lexer(lines),
				result = [],
				scope = [],
				symbols = Object.prototype.toString.apply(definitions) === '[object Object]' && definitions || {};

			function inScope() {
				var i = 0,
					len = scope.length,
					result = true;

				for (; i < len; i += 1) {
					result = result && scope[i];
				}
				return result;
			}

			function ifStatement() {
				var invert = token.id === 'ifndef',
					identifier = token.value;

				if (!invert && symbols[identifier] || invert && !symbols[identifier]) {
					scope.push(true);
				} else {
					scope.push(false);
				}
				block();
				scope.pop();
				if (token.id === 'else') {
					if (!invert && !symbols[identifier] || invert && symbols[identifier]) {
						scope.push(true);
					} else {
						scope.push(false);
					}
					block();
					scope.pop();
				}
				    
				if (token.id === 'endif') {
				    return true;
				}
				throw 'Missing #endif at line: ' + previousToken.position;
			}

			function defineStatement() {
				var define = token.id === 'define',
				    identifier = token.value;

				if (define && inScope()) {
					symbols[identifier] = true;        
				} else if (inScope()) {
					delete symbols[identifier];
				}
				return true;
			}

			function lineStatement() {
				if (inScope()) {
					result.push(token.value);
				}
				return true;
			}

			function statement() {
				previousToken = token;
				token = l.next();
				if (token) {
				    if (token.id === 'ifdef' || token.id === 'ifndef') {
				        return ifStatement();
				    } else if (token.id === 'define' || token.id === 'undef') {
				        return defineStatement();
				    } else if (token.id === 'line') {
				        return lineStatement();
				    }
				}
				return false;
			}

			function block() {
				while (statement()) {
				}
				return true;
			}

			return {
				parse: function () {
					scope.push(true);
					block();
		
					if (l.hasNext() || token.id === 'else') {
						throw 'Unexpected statement: "' + token.id + '" at line: ' + token.position;
					}
					scope.pop();

					return result;
				}
			};
		};

    if (typeof source === 'string') {
        lines = source.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    } else {
        lines = source;
    }

	p = parser(lines, definitions);

	return p.parse();
};

var fs = require("fs");

fs.readFile("foo.js", "utf8", function(err, text){
    if (err) {
            throw err;
    }
    console.log(preprocess(text));
});