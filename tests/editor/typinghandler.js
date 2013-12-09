(function(){

var editor;

var TypingHandler = kendo.ui.editor.TypingHandler;
var oldEditorKeyboard;

editor_module("editor typing handler", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.focus();
        oldEditorKeyboard = editor.keyboard;
    },
    teardown: function() {
        editor.keyboard = oldEditorKeyboard;
    }
});

test('typing handler keydown creates start restore point if typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () {},
        isTypingInProgress: function() { return false; }
    };

    var handler = new TypingHandler(editor);

    handler.keydown();

    ok(undefined !== handler.startRestorePoint);
});

test('typing handler keydown calls startTyping', function() {
    var callback;

    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () { callback = arguments[0]; },
        isTypingInProgress: function() { return false; }
    };

    var handler = new TypingHandler(editor);
    handler.keydown();
    ok(undefined !== callback);
});

test('typing handler keydown returns true', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () {},
        isTypingInProgress: function() { return false; }
    };

    var handler = new TypingHandler(editor);
    ok(handler.keydown());
});

test('typing handler keydown returns false if typing is in progress', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () {},
        isTypingInProgress: function() { return true; }
    };

    var handler = new TypingHandler(editor);
    ok(!handler.keydown());
});

test('typing handler keydown returns false if not typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return false; },
        startTyping: function () {},
        isTypingInProgress: function() { return true; }
    };

    var handler = new TypingHandler(editor);
    ok(!handler.keydown());
});

test('typing handler keyup creates end restore point if typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var handler = new TypingHandler(editor);

    handler.keydown();

    editor.keyboard.isTypingInProgress = function() { return true; };

    handler.keyup();

    ok(undefined !== handler.endRestorePoint);
});

test('typing handler keyup creates undo command', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var command;
    editor.undoRedoStack.push = function(){ command = arguments[0]; };

    var handler = new TypingHandler(editor);

    handler.keydown();

    editor.keyboard.isTypingInProgress = function() { return true; };

    handler.keyup();

    ok(undefined !== command);
});

test('typing handler keyup returns true when typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var command;
    editor.undoRedoStack.push = function(){ command = arguments[0]; };

    var handler = new TypingHandler(editor);

    handler.keydown();

    editor.keyboard.isTypingInProgress = function() { return true; };

    ok(handler.keyup());
});

test('typing handler keyup returns false when not typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var command;
    editor.undoRedoStack.push = function(){ command = arguments[0]; };

    var handler = new TypingHandler(editor);

    handler.keydown();

    ok(!handler.keyup());
});

}());
