function ListFormatFinder(tag) {
    var tags = [tag == 'ul' ? 'ol' : 'ul', tag];
        
    BlockFormatFinder.call(this, [{ tags: tags}]);

    this.isFormatted = function (nodes) {
        var formatNodes = [], formatNode;
            
        for (var i = 0; i < nodes.length; i++)
            if ((formatNode = this.findFormat(nodes[i])) && dom.name(formatNode) == tag)
                formatNodes.push(formatNode);

        if (formatNodes.length < 1) {
            return false;
        }

        if (formatNodes.length != nodes.length) {
            return false;
        }

        // check if sequential lists are selected
        for (i = 0; i < formatNodes.length; i++) {
            if (formatNodes[i].parentNode != formatNode.parentNode) {
                break;
            }

            if (formatNodes[i] != formatNode) {
                return false;
            }
        }

        return true;
    }

    this.findSuitable = function (nodes) {
        var candidate = dom.parentOfType(nodes[0], tags)
        if (candidate && dom.name(candidate) == tag)
            return candidate;
        return null;
    }
}

function ListFormatter(tag, unwrapTag) {
    var finder = this.finder = new ListFormatFinder(tag);

    this.tag = tag;

    this.wrap = function(list, nodes) {
        var li = dom.create(list.ownerDocument, 'li');

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            if (dom.is(node, 'li')) {
                list.appendChild(node);
                continue;
            }

            if (dom.is(node, 'ul') || dom.is(node, 'ol')) {
                while (node.firstChild) {
                    list.appendChild(node.firstChild);
                }
                continue;
            }
            
            if (dom.is(node, "td")) {
                while (node.firstChild) {
                    li.appendChild(node.firstChild);
                }
                list.appendChild(li);
                node.appendChild(list);
                list = list.cloneNode(false);
                li = li.cloneNode(false);
                continue;
            }

            li.appendChild(node);

            if (dom.isBlock(node)) {
                list.appendChild(li);
                dom.unwrap(node);
                li = li.cloneNode(false);
            }
        }

        if (li.firstChild)
            list.appendChild(li);
    }

    var containsAny = this.containsAny = function (parent, nodes) {
        for (var i = 0; i < nodes.length; i++)
            if (isAncestorOrSelf(parent, nodes[i]))
                return true;

        return false;
    }

    this.suitable = function(candidate, nodes) {
        if (candidate.className == "t-marker") {
            var sibling = candidate.nextSibling;

            if (sibling && dom.isBlock(sibling)) {
                return false;
            }

            sibling = candidate.previousSibling;

            if (sibling && dom.isBlock(sibling)) {
                return false;
            }
        }

        return containsAny(candidate, nodes) || dom.isInline(candidate) || candidate.nodeType == 3;
    }

    this.split = function (range) {
        var nodes = textNodes(range);
        if (nodes.length) {
            var start = dom.parentOfType(nodes[0], ['li']);
            var end = dom.parentOfType(nodes[nodes.length - 1], ['li'])
            range.setStartBefore(start);
            range.setEndAfter(end);

            for (var i = 0, l = nodes.length; i < l; i++) {
                var formatNode = finder.findFormat(nodes[i]);
                if (formatNode) {
                    var parents = $(formatNode).parents("ul,ol");
                    if (parents[0]) {
                        split(range, parents.last()[0], true);
                    } else {
                        split(range, formatNode, true);
                    }
                }
            }
        }
    }

    $.extend(this, {
        merge: function(tag, formatNode) {
            var prev = formatNode.previousSibling, next;
    
            while (prev && (prev.className == "k-marker" || (prev.nodeType == 3 && dom.isWhitespace(prev)))) {
                prev = prev.previousSibling;
            }
    
            // merge with previous list
            if (prev && dom.name(prev) == tag) {
                while(formatNode.firstChild) {
                    prev.appendChild(formatNode.firstChild);
                }
                dom.remove(formatNode);
                formatNode = prev;
            }
    
            next = formatNode.nextSibling;
            while (next && (next.className == "k-marker" || (next.nodeType == 3 && dom.isWhitespace(next)))) {
                next = next.nextSibling;
            }
    
            // merge with next list
            if (next && dom.name(next) == tag) {
                while(formatNode.lastChild) {
                    next.insertBefore(formatNode.lastChild, next.firstChild);
                }
                dom.remove(formatNode);
            }
        },
    
        applyOnSection: function (section, nodes) {
            var tag = this.tag,
                commonAncestor;
    
            if (nodes.length == 1) {
                commonAncestor = dom.parentOfType(nodes[0], ["ul","ol"]);
            } else {
                commonAncestor = dom.commonAncestor.apply(null, nodes);
            }
    
            if (!commonAncestor) {
                commonAncestor = dom.parentOfType(nodes[0], ["td"]) || nodes[0].ownerDocument.body;
            }
    
            if (dom.isInline(commonAncestor)) {
                commonAncestor = dom.blockParentOrBody(commonAncestor);
            }
    
            var ancestors = [];
    
            var formatNode = this.finder.findSuitable(nodes);
    
            if (!formatNode) {
                formatNode = new ListFormatFinder(tag == "ul" ? "ol" : "ul").findSuitable(nodes);
            }
    
            var childNodes = dom.significantChildNodes(commonAncestor);
    
            if (!childNodes.length) {
                childNodes = nodes;
            }
    
            if (/table|tbody/.test(dom.name(commonAncestor))) {
                childNodes = $.map(nodes, function(node) {
                    return dom.parentOfType(node, ["td"]);
                });
            }
    
            function pushAncestor() {
                ancestors.push(this);
            }
    
            for (var i = 0; i < childNodes.length; i++) {
                var child = childNodes[i];
                var nodeName = dom.name(child);
                if (this.suitable(child, nodes) && (!formatNode || !dom.isAncestorOrSelf(formatNode, child))) {
    
                    if (formatNode && (nodeName == "ul" || nodeName == "ol")) {
                        // merging lists
                        //Array.prototype.push.apply(ancestors, $.toArray(child.childNodes));
                        $.each(child.childNodes, pushAncestor);
                        dom.remove(child);
                    } else {
                        ancestors.push(child);
                    }
                }
            }
    
            if (ancestors.length == childNodes.length && commonAncestor != nodes[0].ownerDocument.body && !/table|tbody|tr|td/.test(dom.name(commonAncestor))) {
                ancestors = [commonAncestor];
            }
    
            if (!formatNode) {
                formatNode = dom.create(commonAncestor.ownerDocument, tag);
                dom.insertBefore(formatNode, ancestors[0]);
            }
    
            this.wrap(formatNode, ancestors);
    
            if (!dom.is(formatNode, tag)) {
                dom.changeTag(formatNode, tag);
            }
    
            this.merge(tag, formatNode);
        },
    
        apply: function (nodes) {
            var i = 0,
                sections = [],
                lastSection,
                lastNodes,
                section;
    
            // split nodes into sections that need to be different lists
            do {
                section = dom.parentOfType(nodes[i], ["td","body"]);
    
                if (!lastSection || section != lastSection) {
                    if (lastSection) {
                        sections.push({
                            section: lastSection,
                            nodes: lastNodes
                        });
                    }
    
                    lastNodes = [nodes[i]];
                    lastSection = section;
                } else {
                    lastNodes.push(nodes[i]);
                }
    
                i++;
            } while (i < nodes.length);
    
            sections.push({
                section: lastSection,
                nodes: lastNodes
            });
    
            for (i = 0; i < sections.length; i++) {
                this.applyOnSection(sections[i].section, sections[i].nodes);
            }
        }
    });

    function unwrap(ul) {
        var parents = $(ul).parents('ul,ol'),
            li,
            p,
            child,
            insert;
            
        if (parents[0]) {
            insert = function(element) {
                dom.insertBefore(element, parents.last()[0]);
            }
        } else {
            insert = function(element) {
                dom.insertBefore(element, ul);
            }
        }

        for (li = ul.firstChild; li; li = li.nextSibling) {
            p = dom.create(ul.ownerDocument, unwrapTag || 'p');
                
            while(li.firstChild) {
                child = li.firstChild;

                if (dom.isBlock(child)) {

                    if (p.firstChild) {
                        insert(p);
                        p = dom.create(ul.ownerDocument, unwrapTag || 'p');
                    }

                    insert(child);
                } else {
                    p.appendChild(child);
                }
            }

            if (p.firstChild) {
                insert(p);
            }
        }

        if (parents[0]) {
            parents.last().remove();
        }

        dom.remove(ul);
    }

    this.remove = function (nodes) {
        var formatNode;
        for (var i = 0, l = nodes.length; i < l; i++)
            if (formatNode = finder.findFormat(nodes[i]))
                unwrap(formatNode);
    }

    this.toggle = function (range) {
        var nodes = textNodes(range),
            ancestor = range.commonAncestorContainer;

        if (!nodes.length) {
            range.selectNodeContents(ancestor);
            nodes = textNodes(range);
            if (!nodes.length){
                var text = ancestor.ownerDocument.createTextNode("");
                range.startContainer.appendChild(text);
                nodes = [text];
                range.selectNode(text.parentNode);
            }

        }
            
        if (finder.isFormatted(nodes)) {
            this.split(range);
            this.remove(nodes);
        } else {
            this.apply(nodes);
        }
    }
}

function ListCommand(options) {
    options.formatter = new ListFormatter(options.tag);
    Command.call(this, options);
}

function ListTool(options) {
    FormatTool.call(this, $.extend(options, {
        finder: new ListFormatFinder(options.tag)
    }));

    this.command = function (commandArguments) { 
        return new ListCommand($.extend(commandArguments, { tag: options.tag }));
    }
};