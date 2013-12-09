(function(){

var undoRedoStack;

module("editor undo redo stack", {
    setup: function() {
        undoRedoStack = new kendo.ui.editor.UndoRedoStack();
    }
});

test("stack is initially empty", function() {
    ok(!undoRedoStack.canUndo());
    ok(!undoRedoStack.canRedo());
});

test("canUndo returns true after command is pushed in stack", function() {
    undoRedoStack.push({});

    ok(undoRedoStack.canUndo());
    ok(!undoRedoStack.canRedo());
});

test("canRedo returns true after undo", function() {
    undoRedoStack.push({ undo: function() {} });
    undoRedoStack.undo();

    ok(undoRedoStack.canRedo());
});

test("canUndo returns false when at the bottom of the stack", function() {
    undoRedoStack.push({ undo: function() {} });
    undoRedoStack.undo();

    ok(!undoRedoStack.canUndo());
});

test("canRedo returns false when a new command is pushed", function() {
    undoRedoStack.push({ undo: function() {} });
    undoRedoStack.undo();
    undoRedoStack.push({ undo: function() {} });

    ok(!undoRedoStack.canRedo());
    ok(undoRedoStack.canUndo());
});

test("undo delegates undo to current command", function() {
    var called = false;

    undoRedoStack.push({ undo: function() { called = true; } });
    undoRedoStack.undo();

    ok(called);
});

test("redo delegates to exec to current command", function() {
    var called = false;

    undoRedoStack.push({ undo: function() { }, redo: function() { called = true; } });
    undoRedoStack.undo();
    undoRedoStack.redo();

    ok(called);
    ok(!undoRedoStack.canRedo());
    ok(undoRedoStack.canUndo());
});

test("redo does not delegate to exec when at top of stack", function() {
    var called = false;

    undoRedoStack.push({ undo: function() { }, redo: function() { called = true; } });
    undoRedoStack.redo();

    ok(!called);
});

test("canUndo is true after undoing the second command", function() {
    undoRedoStack.push({ undo: function() { } });
    undoRedoStack.push({ undo: function() { } });
    undoRedoStack.undo();

    ok(undoRedoStack.canUndo());

});

}());
