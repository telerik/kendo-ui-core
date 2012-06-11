var fs = require("fs");
var template = require("build/kendo-template").template;
var vsDocTemplate = fs.readFileSync("build/vs-doc/kendo.all-vsdoc.js.tpl").toString();

function vsdoc(directory, filter) {
    var classes = [];

    processFilesRecursive(directory, filter, function(fileName) {
        var tree = toHeadingTree(fs.readFileSync(fileName).toString()),
            theClass = {
                name: tree.children[0].title,
                methods: []
            };

        tree.children[0].children[2].children.forEach(function(child) {
            theClass.methods.push(parseMethod(child));
        });

        classes.push(theClass);
    });

    return template(vsDocTemplate)(classes.sort(sortByName));
}

function toHeadingTree(contents) {
    var root = {
            title: "Root",
            contents: "",
            children: []
        },
        node = root,
        level = 0,
        match,
        currentLevel,
        currentTitle,
        newNode,
        filler;

    contents.split("\n").forEach(function(line) {
        match = line.match(/^(#+) (.+)$/);
        if (match) {
            currentLevel = match[1].length;
            currentTitle = match[2];

            newNode = {
                title: currentTitle,
                contents: "",
                children: []
            };


            if (currentLevel > level + 1) {
                while (level < currentLevel - 1) {
                    filler = { title: "-Dummy-", contents: "", children: [], parent: node };
                    node.children.push(filler);
                    node = filler;
                    level ++;
                }
            } else {
                while (level >= currentLevel) {
                    node = node.parent;
                    level --;
                }
            }

            level = currentLevel;

            newNode.parent = node;
            node.children.push(newNode);
            node = newNode;
        } else {
            node.contents += line + "\n";
        }
    });

    return root;
}

function parseMethod(child) {
    var match = child.title.match(/\w+/),
    method = {
        name: match[0],
        description: child.contents,
        parameters: []
    };

    child.children.forEach(function(member) {
        if (/Parameters/.test(member.title)) {
            member.children.forEach(function(param) {
                match = param.title.match(/(\w+).+`(.*)`/);
                method.parameters.push({
                    name: match[1],
                    type: match[2],
                    description: param.contents
                })
            });
        }
        else if (/Returns/.test(member.title)) {
            match = member.contents.match(/`(\w+)`(.*)/);
            method.returns = match[1];
            method.returnsDescription = match[2];
        }
    });

    return method;
}

function sortByName(a, b) {
    if (a.name < b.name) {
        return -1;
    } else {
        return 1;
    }
}


function processFilesRecursive(dir, filterRegex, callback) {
    var files = fs.readdirSync(dir),
        fileName,
        stat;

    for (var i = 0; i < files.length; i++) {
        fileName = dir + "/" + files[i];
        stat = fs.statSync(fileName);

        if (!stat.isFile()) {
            processFilesRecursive(fileName, filterRegex, callback);
        } else if (filterRegex.test(fileName)) {
            callback(fileName);
        }
    }
}

exports.vsdoc = vsdoc;
