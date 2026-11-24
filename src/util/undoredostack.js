import "../kendo.core.js";

(function(kendo) {
    var UndoRedoStack = kendo.Observable.extend({
        init: function(options) {
            kendo.Observable.fn.init.call(this, options);
            this.clear();
        },
        events: [ "undo", "redo" ],
        push: function (command) {
            this.stack = this.stack.slice(0, this.currentCommandIndex + 1);
            this.currentCommandIndex = this.stack.push(command) - 1;
        },
        undo: function () {
            if (this.canUndo()) {
                var command = this.stack[this.currentCommandIndex--];
                command.undo();
                this.trigger("undo", { command: command });
            }
        },
        redo: function () {
            if (this.canRedo()) {
                var command = this.stack[++this.currentCommandIndex];
                command.redo();
                this.trigger("redo", { command: command });
            }
        },
        clear: function() {
            this.stack = [];
            this.currentCommandIndex = -1;
        },
        canUndo: function () {
            return this.currentCommandIndex >= 0;
        },
        canRedo: function () {
            return this.currentCommandIndex != this.stack.length - 1;
        }
    });

    kendo.deepExtend(kendo, {
        util: {
            UndoRedoStack: UndoRedoStack
        }
    });
})(kendo);
