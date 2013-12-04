(function(){

var editor;
var SystemHandler = kendo.ui.editor.SystemHandler;
var alwaysTrue = function() { return true; };
var alwaysFalse = function() { return false; };
var noop = $.noop;

editor_module("editor system handler", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.focus();
    }
});

test('keydown calls endTyping if typing in progress', function() {
    var force = false;
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        endTyping: function () { force = arguments[0]; },
        startTyping: noop,
        isTypingInProgress: alwaysTrue
    };
    var handler = new SystemHandler(editor);
    handler.keydown();

    ok(force);
});

test('keydown does not call endTyping if not modifier key', function() {
    var called = false;
    editor.keyboard = {
        isModifierKey: alwaysFalse,
        isSystem:alwaysFalse,
        endTyping: alwaysTrue,
        startTyping: noop,
        isTypingInProgress: alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.keydown();

    ok(!called);
});

test('keydown does not call endTyping if typing not in progress', function() {
    var called = false;
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        endTyping: function () { called = true; },
        startTyping: noop,
        isTypingInProgress: alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.keydown();

    ok(called);
});


test('keydown if modifier key creates start restore point', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse
    };

    var handler = new SystemHandler(editor);
    handler.keydown();

    ok(undefined !== handler.startRestorePoint);
});

test('keydown returns true if modifier key', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse
    };

    var handler = new SystemHandler(editor);
    ok(handler.keydown());
});

test('keydown if system command and changed creates end restore point', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse,
        isSystem:alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.changed = alwaysTrue;

    handler.keydown();
    editor.keyboard.isModifierKey = alwaysFalse;
    handler.keydown();

    ok(undefined !== handler.endRestorePoint);
});

test('keydown if system command and changed sets start restore point to end restore point', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse,
        isSystem: alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.changed = alwaysTrue;

    handler.keydown();
    editor.keyboard.isModifierKey = alwaysFalse;
    handler.keydown();

    equal(handler.startRestorePoint, handler.endRestorePoint);
});
test('keydown returns true if system command and changed', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse,
        isSystem: alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.changed = alwaysTrue;
    handler.keydown();
    editor.keyboard.isModifierKey = alwaysFalse;
    ok(handler.keydown());
});

test('keydown creates undo command if system command and changed', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse,
        isSystem: alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.changed = alwaysFalse;
    var command;

    editor.undoRedoStack.push = function() {
        command = arguments[0];
    };
    handler.keydown();
    editor.keyboard.isModifierKey = alwaysFalse;
    handler.changed = alwaysTrue;
    handler.keydown();

    ok(undefined !== command);
});

test('changed returns false if editor contents remain the same', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse
    };

    var handler = new SystemHandler(editor);
    handler.keydown();

    ok(!handler.changed());
});

test('changed returns false if editor contents changed', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse
    };

    var handler = new SystemHandler(editor);
    handler.keydown();
    editor.body.innerHTML = 'foo';
    ok(handler.changed());
});


test('keyup creates undo command if system command and changed', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse,
        isSystem: alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.changed = alwaysFalse;
    var command;

    editor.undoRedoStack.push = function() {
        command = arguments[0];
    };

    handler.keydown();
    editor.keyboard.isModifierKey = alwaysFalse;
    handler.keydown();
    handler.changed = alwaysTrue;

    handler.keyup();

    ok(undefined !== command);
});


test('keyup does not create undo command if system command and changed', function() {
    editor.keyboard = {
        isModifierKey: alwaysTrue,
        isTypingInProgress: alwaysFalse,
        isSystem: alwaysTrue
    };

    var handler = new SystemHandler(editor);
    handler.changed = alwaysTrue;
    var command;

    editor.undoRedoStack.push = function() {
        command = arguments[0];
    };

    handler.keyup();

    ok(undefined === command);
});

}());
