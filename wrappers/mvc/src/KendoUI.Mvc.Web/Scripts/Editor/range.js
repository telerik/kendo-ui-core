var START_TO_START = 0,
    START_TO_END = 1,
    END_TO_END = 2,
    END_TO_START = 3;


function documentFromRange(range) {
    var startContainer = range.startContainer;
    return startContainer.nodeType == 9 ? startContainer : startContainer.ownerDocument;
}

function selectionFromWindow(window) {
    if ($.browser.msie && $.browser.version < 9) {
        return new W3CSelection(window.document);
    }
    
    return window.getSelection(); 
}

function selectionFromRange(range) {
    var document = documentFromRange(range);
    return selectionFromDocument(document);
}

function selectionFromDocument(document) {
    return selectionFromWindow(windowFromDocument(document));
}

function windowFromDocument(document) {
    return document.defaultView || document.parentWindow;
}

function split(range, node, trim) {
    function partition(start) {
        var partitionRange = range.cloneRange();
        partitionRange.collapse(start);
        partitionRange[start ? 'setStartBefore' : 'setEndAfter'](node);
        var contents = partitionRange.extractContents();
        if (trim)
            contents = dom.trim(contents);
        dom[start ? 'insertBefore' : 'insertAfter'](contents, node);
    }
    partition(true);
    partition(false);
}

function selectRange(range) {
    var image = RangeUtils.image(range);
    if (image) {
        range.setStartAfter(image);
        range.setEndAfter(image);
    }
    var selection = selectionFromRange(range);
    selection.removeAllRanges();
    selection.addRange(range);
}

function W3CRange(doc) {
    $.extend(this, {
        ownerDocument: doc, /* not part of the spec; used when cloning ranges, traversing the dom and creating fragments */
        startContainer: doc,
        endContainer: doc,
        commonAncestorContainer: doc,
        startOffset: 0,
        endOffset: 0,
        collapsed: true
    });
};

W3CRange.prototype = {
    // Positioning Methods

    setStart: function (node, offset) {
        this.startContainer = node;
        this.startOffset = offset;
        updateRangeProperties(this);
        fixIvalidRange(this, true);
    },

    setEnd: function (node, offset) {
        this.endContainer = node;
        this.endOffset = offset;
        updateRangeProperties(this);
        fixIvalidRange(this, false);
    },

    setStartBefore: function (node) {
        this.setStart(node.parentNode, findNodeIndex(node));
    },

    setStartAfter: function (node) {
        this.setStart(node.parentNode, findNodeIndex(node) + 1);
    },

    setEndBefore: function (node) {
        this.setEnd(node.parentNode, findNodeIndex(node));
    },

    setEndAfter: function (node) {
        this.setEnd(node.parentNode, findNodeIndex(node) + 1);
    },

    selectNode: function (node) {
        this.setStartBefore(node);
        this.setEndAfter(node);
    },

    selectNodeContents: function (node) {
        this.setStart(node, 0);
        this.setEnd(node, node[node.nodeType === 1 ? 'childNodes' : 'nodeValue'].length);
    },

    collapse: function (toStart) {
        if (toStart)
            this.setEnd(this.startContainer, this.startOffset);
        else
            this.setStart(this.endContainer, this.endOffset);
    },

    // Editing Methods

    deleteContents: function () {
        var range = this.cloneRange();

        if (this.startContainer != this.commonAncestorContainer)
            this.setStartAfter(findClosestAncestor(this.commonAncestorContainer, this.startContainer));

        this.collapse(true);

        (function deleteSubtree(iterator) {
            while (iterator.next())
                iterator.hasPartialSubtree() ? deleteSubtree(iterator.getSubtreeIterator())
                                            : iterator.remove();
        })(new RangeIterator(range));
    },
    
    cloneContents: function () {
        // clone subtree
        var document = documentFromRange(this);
        return (function cloneSubtree(iterator) {
                for (var node, frag = document.createDocumentFragment(); node = iterator.next(); ) {
                        node = node.cloneNode(!iterator.hasPartialSubtree());
                        if (iterator.hasPartialSubtree())
                                node.appendChild(cloneSubtree(iterator.getSubtreeIterator()));
                        frag.appendChild(node);
                }
                return frag;
        })(new RangeIterator(this));
    },

    extractContents: function () {
        var range = this.cloneRange();

        if (this.startContainer != this.commonAncestorContainer)
            this.setStartAfter(findClosestAncestor(this.commonAncestorContainer, this.startContainer));

        this.collapse(true);

        var self = this;

        var document = documentFromRange(this);

        return (function extractSubtree(iterator) {
            for (var node, frag = document.createDocumentFragment(); node = iterator.next(); ) {
                iterator.hasPartialSubtree() ? node = node.cloneNode(false) : iterator.remove(self.originalRange);

                if (iterator.hasPartialSubtree())
                    node.appendChild(extractSubtree(iterator.getSubtreeIterator()));

                frag.appendChild(node);
            }

            return frag;
        })(new RangeIterator(range));
    },

    insertNode: function (node) {
        if (isDataNode(this.startContainer)) {
            if (this.startOffset != this.startContainer.nodeValue.length)
                splitDataNode(this.startContainer, this.startOffset);

            dom.insertAfter(node, this.startContainer);
        } else {
            dom.insertAt(this.startContainer, node, this.startOffset);
        }

        this.setStart(this.startContainer, this.startOffset);
    },

    cloneRange: function () {
        // fast copy
        return $.extend(new W3CRange(this.ownerDocument), {
            startContainer: this.startContainer,
            endContainer: this.endContainer,
            commonAncestorContainer: this.commonAncestorContainer,
            startOffset: this.startOffset,
            endOffset: this.endOffset,
            collapsed: this.collapsed,

            originalRange: this /* not part of the spec; used to update the original range when calling extractContents() on clones */
        });
    },

    // used for debug purposes
    toString: function () {
        var startNodeName = this.startContainer.nodeName,
            endNodeName = this.endContainer.nodeName;

        return [startNodeName == "#text" ? this.startContainer.nodeValue : startNodeName, '(', this.startOffset, ') : ',
                endNodeName == "#text" ? this.endContainer.nodeValue : endNodeName, '(', this.endOffset, ')'].join('');
    }
}
/* can be used in Range.compareBoundaryPoints if we need it one day */
function compareBoundaries(start, end, startOffset, endOffset) {
    if (start == end)
        return endOffset - startOffset;

    // end is child of start
    var container = end;
    while (container && container.parentNode != start)
        container = container.parentNode;

    if (container)
        return findNodeIndex(container) - startOffset;

    // start is child of end
    container = start;
    while (container && container.parentNode != end)
        container = container.parentNode;

    if (container)
        return endOffset - findNodeIndex(container) - 1;

    // deep traversal
    var root = dom.commonAncestor(start, end);
    var startAncestor = start;

    while (startAncestor && startAncestor.parentNode != root)
        startAncestor = startAncestor.parentNode;

    if (!startAncestor)
        startAncestor = root;

    var endAncestor = end;
    while (endAncestor && endAncestor.parentNode != root)
        endAncestor = endAncestor.parentNode;

    if (!endAncestor)
        endAncestor = root;

    if (startAncestor == endAncestor)
        return 0;

    return findNodeIndex(endAncestor) - findNodeIndex(startAncestor);
}

function fixIvalidRange(range, toStart) {
    function isInvalidRange(range) {
        try {
            return compareBoundaries(range.startContainer, range.endContainer, range.startOffset, range.endOffset) < 0;
        } catch (ex) {
            // range was initially invalid (e.g. when cloned from invalid range) - it must be fixed
            return true;
        }
    }

    if (isInvalidRange(range)) {
        if (toStart) {
            range.commonAncestorContainer = range.endContainer = range.startContainer;
            range.endOffset = range.startOffset;
        } else {
            range.commonAncestorContainer = range.startContainer = range.endContainer;
            range.startOffset = range.endOffset;
        }

        range.collapsed = true;
    }
}

function updateRangeProperties(range) {
    range.collapsed = range.startContainer == range.endContainer && range.startOffset == range.endOffset;

    var node = range.startContainer;
    while (node && node != range.endContainer && !isAncestorOf(node, range.endContainer))
        node = node.parentNode;

    range.commonAncestorContainer = node;
}

function createRange(document) {
    if ($.browser.msie && $.browser.version < 9) {
        return new W3CRange(document);
    }
    
    return document.createRange();
}


function RangeIterator(range) {
    $.extend(this, {
        range: range,
        _current: null,
        _next: null,
        _end: null
    });

    if (range.collapsed)
        return;

    var root = range.commonAncestorContainer;

    this._next = range.startContainer == root && !isDataNode(range.startContainer) ?
    range.startContainer.childNodes[range.startOffset] :
    findClosestAncestor(root, range.startContainer);

    this._end = range.endContainer == root && !isDataNode(range.endContainer) ?
    range.endContainer.childNodes[range.endOffset] :
    findClosestAncestor(root, range.endContainer).nextSibling;
}

RangeIterator.prototype = {
    hasNext: function () {
        return !!this._next;
    },

    next: function () {
        var current = this._current = this._next;
        this._next = this._current && this._current.nextSibling != this._end ?
        this._current.nextSibling : null;

        if (isDataNode(this._current)) {
            if (this.range.endContainer == this._current)
                (current = current.cloneNode(true)).deleteData(this.range.endOffset, current.length - this.range.endOffset);

            if (this.range.startContainer == this._current)
                (current = current.cloneNode(true)).deleteData(0, this.range.startOffset);
        }

        return current;
    },

    traverse: function (callback) {
        function next() {
            this._current = this._next;
            this._next = this._current && this._current.nextSibling != this._end ? this._current.nextSibling : null;
            return this._current;
        }

        var current;

        while (current = next.call(this)) {
            if (this.hasPartialSubtree())
                this.getSubtreeIterator().traverse(callback);
            else
                callback(current)
        }

        return current;
    },

    remove: function (originalRange) {
        var inStartContainer = this.range.startContainer == this._current;
        var inEndContainer = this.range.endContainer == this._current;

        if (isDataNode(this._current) && (inStartContainer || inEndContainer)) {
            var start = inStartContainer ? this.range.startOffset : 0;
            var end = inEndContainer ? this.range.endOffset : this._current.length;
            var delta = end - start;

            if (originalRange && (inStartContainer || inEndContainer)) {
                if (this._current == originalRange.startContainer && start <= originalRange.startOffset)
                    originalRange.startOffset -= delta;

                if (this._current == originalRange.endContainer && end <= originalRange.endOffset)
                    originalRange.endOffset -= delta;
            }

            this._current.deleteData(start, delta);
        } else {
            var parent = this._current.parentNode;

            if (originalRange && (this.range.startContainer == parent || this.range.endContainer == parent)) {
                var nodeIndex = findNodeIndex(this._current);

                if (parent == originalRange.startContainer && nodeIndex <= originalRange.startOffset)
                    originalRange.startOffset -= 1;

                if (parent == originalRange.endContainer && nodeIndex < originalRange.endOffset)
                    originalRange.endOffset -= 1;
            }

            dom.remove(this._current);
        }
    },

    hasPartialSubtree: function () {
        return !isDataNode(this._current) &&
        (isAncestorOrSelf(this._current, this.range.startContainer) ||
            isAncestorOrSelf(this._current, this.range.endContainer));
    },

    getSubtreeIterator: function () {
        var subRange = this.range.cloneRange();
        subRange.selectNodeContents(this._current);

        if (isAncestorOrSelf(this._current, this.range.startContainer))
            subRange.setStart(this.range.startContainer, this.range.startOffset);
        if (isAncestorOrSelf(this._current, this.range.endContainer))
            subRange.setEnd(this.range.endContainer, this.range.endOffset);

        return new RangeIterator(subRange);
    }
};

function W3CSelection(doc) {
    this.ownerDocument = doc;
    this.rangeCount = 1;
};

W3CSelection.prototype = {
    addRange: function (range) {
        var textRange = this.ownerDocument.body.createTextRange();

        // end container should be adopted first in order to prevent selection with negative length
        adoptContainer(textRange, range, false);
        adoptContainer(textRange, range, true);

        textRange.select();
    },

    removeAllRanges: function () {
        this.ownerDocument.selection.empty();
    },

    getRangeAt: function () {
        var textRange, range = new W3CRange(this.ownerDocument), selection = this.ownerDocument.selection, element;
        
        try {
            textRange = selection.createRange();
            element = textRange.item ? textRange.item(0) : textRange.parentElement();
			if (element.ownerDocument != this.ownerDocument) {
				return range;
            }
        } catch (ex) {
            return range;
        }

        if (selection.type == 'Control') {
            range.selectNode(textRange.item(0));
        } else {
            adoptEndPoint(textRange, range, true);
            adoptEndPoint(textRange, range, false);

            if (range.startContainer.nodeType == 9)
                range.setStart(range.endContainer, range.startOffset);
                
            if (range.endContainer.nodeType == 9)
                range.setEnd(range.startContainer, range.endOffset);

            if (textRange.compareEndPoints('StartToEnd', textRange) == 0)
                range.collapse(false);
                
            var startContainer = range.startContainer,
                endContainer = range.endContainer,
                body = this.ownerDocument.body;
                
            if (!range.collapsed && range.startOffset == 0 && range.endOffset == getNodeLength(range.endContainer) // check for full body selection
            && !(startContainer == endContainer && isDataNode(startContainer) && startContainer.parentNode == body)) { // but not when single textnode is selected
                var movedStart = false,
                    movedEnd = false;

                while (findNodeIndex(startContainer) == 0 && startContainer == startContainer.parentNode.firstChild && startContainer != body) {
                    startContainer = startContainer.parentNode;
                    movedStart = true;
                }

                while (findNodeIndex(endContainer) == getNodeLength(endContainer.parentNode) - 1 && endContainer == endContainer.parentNode.lastChild && endContainer != body) {
                    endContainer = endContainer.parentNode;
                    movedEnd = true;
                }

                if (startContainer == body && endContainer == body && movedStart && movedEnd) {
                    range.setStart(startContainer, 0);
                    range.setEnd(endContainer, getNodeLength(body));
                }
            }
        }
        return range;
    }
}

function adoptContainer(textRange, range, start) {
    // find anchor node and offset
    var container = range[start ? 'startContainer' : 'endContainer'];
    var offset = range[start ? 'startOffset' : 'endOffset'], textOffset = 0;
    var anchorNode = isDataNode(container) ? container : container.childNodes[offset] || null;
    var anchorParent = isDataNode(container) ? container.parentNode : container;
    // visible data nodes need a text offset
    if (container.nodeType == 3 || container.nodeType == 4)
        textOffset = offset;

    // create a cursor element node to position range (since we can't select text nodes)
    var cursorNode = anchorParent.insertBefore(dom.create(range.ownerDocument, 'a'), anchorNode);

    var cursor = range.ownerDocument.body.createTextRange();
    cursor.moveToElementText(cursorNode);
    dom.remove(cursorNode);
    cursor[start ? 'moveStart' : 'moveEnd']('character', textOffset);
    cursor.collapse(false);
    textRange.setEndPoint(start ? 'StartToStart' : 'EndToStart', cursor);
}

function adoptEndPoint(textRange, range, start) {
    var cursorNode = dom.create(range.ownerDocument, 'a'), cursor = textRange.duplicate();
    cursor.collapse(start);
    var parent = cursor.parentElement();
    do {
        parent.insertBefore(cursorNode, cursorNode.previousSibling);
        cursor.moveToElementText(cursorNode);
    } while (cursor.compareEndPoints(start ? 'StartToStart' : 'StartToEnd', textRange) > 0 && cursorNode.previousSibling);

    cursor.setEndPoint(start ? 'EndToStart' : 'EndToEnd', textRange);

    var target = cursorNode.nextSibling;

    if (!target) {
        // at end of text node
        target = cursorNode.previousSibling;

        if (target && isDataNode(target)) { // in case of collapsed range in empty tag
            range.setEnd(target, target.nodeValue.length);
            dom.remove(cursorNode);
        } else {
            range.selectNodeContents(parent);
            dom.remove(cursorNode);
            range.endOffset -= 1; // cursorNode was in parent
        }

        return;
    }

    dom.remove(cursorNode);

    if (isDataNode(target))
        range[start ? 'setStart' : 'setEnd'](target, cursor.text.length);
    else
        range[start ? 'setStartBefore' : 'setEndBefore'](target);
}

 function RangeEnumerator(range) {
    this.enumerate = function () {
        var nodes = [];

        function visit(node) {
            if (dom.is(node, 'img') || (node.nodeType == 3 && !dom.isWhitespace(node))) {
                nodes.push(node);
            } else {
                node = node.firstChild;
                while (node) {
                    visit(node);
                    node = node.nextSibling;
                }
            }
        }

        new RangeIterator(range).traverse(visit);

        return nodes;
    }
}

function textNodes(range) {
    return new RangeEnumerator(range).enumerate();
}

function blockParents(nodes) {
    var blocks = [];

    for (var i = 0, len = nodes.length; i < len; i++) {
        var block = dom.parentOfType(nodes[i], blockElements);
        if (block && $.inArray(block, blocks) < 0)
            blocks.push(block);
    }

    return blocks;
}

function getMarkers(range) {
    var markers = [];

    new RangeIterator(range).traverse(function (node) {
        if (node.className == 't-marker')
            markers.push(node);
    });

    return markers;
}

function RestorePoint(range) {
    var rootNode = documentFromRange(range);

    this.body = rootNode.body;

    this.html = this.body.innerHTML;
        
    function index(node) {
        var result = 0, lastType = node.nodeType;

        while (node = node.previousSibling) {
            var nodeType = node.nodeType;
                
            if (nodeType != 3 || lastType != nodeType)
                result ++;
                
            lastType = nodeType;
        }
            
        return result;
    }

    function offset(node, value) {
        if (node.nodeType == 3) {
            while ((node = node.previousSibling) && node.nodeType == 3)
                value += node.nodeValue.length;
        }
        return value;
    }

    function nodeToPath(node) {
        var path = [];
            
        while (node != rootNode) {
            path.push(index(node));
            node = node.parentNode;
        }

        return path;
    }

    function toRangePoint(range, start, path, denormalizedOffset) {
        var node = rootNode, length = path.length, offset = denormalizedOffset;

        while (length--)
            node = node.childNodes[path[length]];

        while (node.nodeType == 3 && node.nodeValue.length < offset) {
            offset -= node.nodeValue.length;
            node = node.nextSibling;
        }

        range[start ? 'setStart' : 'setEnd'](node, offset);
    }

    this.startContainer = nodeToPath(range.startContainer);
    this.endContainer = nodeToPath(range.endContainer);
    this.startOffset = offset(range.startContainer, range.startOffset);
    this.endOffset = offset(range.endContainer, range.endOffset);

    this.toRange = function () {
        var result = range.cloneRange();

        toRangePoint(result, true, this.startContainer, this.startOffset);
        toRangePoint(result, false, this.endContainer, this.endOffset);

        return result;
    }
}

function Marker() {
    var caret;

    this.addCaret = function (range) {
        caret = dom.create(documentFromRange(range), 'span', { className: 't-marker' });
        range.insertNode(caret);
        range.selectNode(caret);
        return caret;
    }

    this.removeCaret = function (range) {
        var previous = caret.previousSibling;
        var startOffset = 0;
            
        if (previous)
            startOffset = isDataNode(previous) ? previous.nodeValue.length : findNodeIndex(previous);

        var container = caret.parentNode;
        var containerIndex = previous ? findNodeIndex(previous) : 0;

        dom.remove(caret);
        normalize(container);

        var node = container.childNodes[containerIndex];
            
        if (isDataNode(node))
            range.setStart(node, startOffset);
        else if (node) {
            var textNode = dom.lastTextNode(node);
            if (textNode)
                range.setStart(textNode, textNode.nodeValue.length);
            else
                range[previous ? 'setStartAfter' : 'setStartBefore'](node);
        } else {
            if (!$.browser.msie && container.innerHTML == '')
                container.innerHTML = '<br _moz_dirty="" />';
                
            range.selectNodeContents(container);
        }
        range.collapse(true);
    }

    this.add = function (range, expand) {
        if (expand && range.collapsed) {
            this.addCaret(range);
            range = RangeUtils.expand(range);
        }

        var rangeBoundary = range.cloneRange();

        rangeBoundary.collapse(false);
        this.end = dom.create(documentFromRange(range), 'span', { className: 't-marker' });
        rangeBoundary.insertNode(this.end);

        rangeBoundary = range.cloneRange();
        rangeBoundary.collapse(true);
        this.start = this.end.cloneNode(true);
        rangeBoundary.insertNode(this.start);

        range.setStartBefore(this.start);
        range.setEndAfter(this.end);

        normalize(range.commonAncestorContainer);

        return range;
    }

    this.remove = function (range) {
        var start = this.start, end = this.end;

        normalize(range.commonAncestorContainer);

        while (!start.nextSibling && start.parentNode) start = start.parentNode;
        while (!end.previousSibling && end.parentNode) end = end.parentNode;

        var shouldNormalizeStart = (start.previousSibling && start.previousSibling.nodeType == 3)
                                && (start.nextSibling && start.nextSibling.nodeType == 3);

        var shouldNormalizeEnd = (end.previousSibling && end.previousSibling.nodeType == 3)
                                && (end.nextSibling && end.nextSibling.nodeType == 3);

        start = start.nextSibling;
        end = end.previousSibling;

        var collapsed = false;
        var collapsedToStart = false;
        // collapsed range
        if (start == this.end) {
            collapsedToStart = !!this.start.previousSibling;
            start = end = this.start.previousSibling || this.end.nextSibling;
            collapsed = true;
        }

        dom.remove(this.start);
        dom.remove(this.end);

        if (start == null || end == null) {
            range.selectNodeContents(range.commonAncestorContainer);
            range.collapse(true);
            return;
        }

        var startOffset = collapsed ? isDataNode(start) ? start.nodeValue.length : start.childNodes.length : 0;
        var endOffset = isDataNode(end) ? end.nodeValue.length : end.childNodes.length;

        if (start.nodeType == 3)
            while (start.previousSibling && start.previousSibling.nodeType == 3) {
                start = start.previousSibling;
                startOffset += start.nodeValue.length;
            }

        if (end.nodeType == 3)
            while (end.previousSibling && end.previousSibling.nodeType == 3) {
                end = end.previousSibling;
                endOffset += end.nodeValue.length;
            }
        var startIndex = findNodeIndex(start), startParent = start.parentNode;
        var endIndex = findNodeIndex(end), endParent = end.parentNode;

        for (var startPointer = start; startPointer.previousSibling; startPointer = startPointer.previousSibling)
            if (startPointer.nodeType == 3 && startPointer.previousSibling.nodeType == 3) startIndex--;

        for (var endPointer = end; endPointer.previousSibling; endPointer = endPointer.previousSibling)
            if (endPointer.nodeType == 3 && endPointer.previousSibling.nodeType == 3) endIndex--;

        normalize(startParent);

        if (start.nodeType == 3)
            start = startParent.childNodes[startIndex];

        normalize(endParent);
        if (end.nodeType == 3)
            end = endParent.childNodes[endIndex];

        if (collapsed) {
            if (start.nodeType == 3)
                range.setStart(start, startOffset);
            else
                range[collapsedToStart ? 'setStartAfter' : 'setStartBefore'](start);
                
            range.collapse(true);

        } else {
            if (start.nodeType == 3)
                range.setStart(start, startOffset);
            else
                range.setStartBefore(start);

            if (end.nodeType == 3)
                range.setEnd(end, endOffset);
            else
                range.setEndAfter(end);
        }
        if (caret)
            this.removeCaret(range);
    }
}

var boundary = /[\u0009-\u000d]|\u0020|\u00a0|\ufeff|\.|,|;|:|!|\(|\)|\?/;

var RangeUtils = {
    nodes: function(range) {
        var nodes = textNodes(range);
        if (!nodes.length) {
            range.selectNodeContents(range.commonAncestorContainer);
            nodes = textNodes(range);
            if (!nodes.length)
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
        }
        return nodes;
    },

    image: function (range) {
        var nodes = [];

        new RangeIterator(range).traverse(function (node) {
            if (dom.is(node, 'img'))
                nodes.push(node);
        });

        if (nodes.length == 1)
            return nodes[0];
    },

    expand: function (range) {
        var result = range.cloneRange();

        var startContainer = result.startContainer.childNodes[result.startOffset == 0 ? 0 : result.startOffset - 1];
        var endContainer = result.endContainer.childNodes[result.endOffset];

        if (!isDataNode(startContainer) || !isDataNode(endContainer))
            return result;

        var beforeCaret = startContainer.nodeValue;
        var afterCaret = endContainer.nodeValue;

        if (beforeCaret == '' || afterCaret == '')
            return result;

        var startOffset = beforeCaret.split('').reverse().join('').search(boundary);
        var endOffset = afterCaret.search(boundary);

        if (startOffset == 0 || endOffset == 0)
            return result;

        endOffset = endOffset == -1 ? afterCaret.length : endOffset;
        startOffset = startOffset == -1 ? 0 : beforeCaret.length - startOffset;

        result.setStart(startContainer, startOffset);
        result.setEnd(endContainer, endOffset);

        return result;
    },

    isExpandable: function (range) {
        var node = range.startContainer;
        var document = documentFromRange(range);

        if (node == document || node == document.body)
            return false;

        var result = range.cloneRange();

        var value = node.nodeValue;
        if (!value)
            return false;

        var beforeCaret = value.substring(0, result.startOffset);
        var afterCaret = value.substring(result.startOffset);

        var startOffset = 0, endOffset = 0;

        if (beforeCaret != '')
            startOffset = beforeCaret.split('').reverse().join('').search(boundary);

        if (afterCaret != '')
            endOffset = afterCaret.search(boundary);

        return startOffset != 0 && endOffset != 0;
    }
};