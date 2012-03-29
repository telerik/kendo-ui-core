(function () {

    /** @name kendo.ui.Editor.Description
    * @section
    *  <p>
    *       The Editor allows users to create rich text content by means of a WYSIWYG interfance. The generated widget value is an XHTML markup.
    *  </p>
    *  <h3>Getting Started</h3>
    *  @exampleTitle Creating an <b>Editor</b> from existing HTML element
    *  @example
    *   <textarea id="editor" rows="10" cols="30"></textarea>
    *  @exampleTitle Initialize the Kendo Editor
    *  @example
    *   $(document).ready(function(){
    *       $("#editor").kendoEditor();
    *   });
    *
    *  @section <h3>Configuring the Editor</h3>
    *  If no specific tools are defined, the Editor will create its default set of tools for text formatting.
    *
    *  @exampleTitle Specifying a set of Editor tools
    *  @example
    *    $(document).ready(function(){
    *       $("#editor").kendoEditor({
    *          tools: [
    *              "bold",
    *              "italic",
    *              "underline",
    *              "foreColor"
    *          ]
    *       });
    *   });
    *  @section <h3>Specifying custom tools</h3>
    *
    *  The Editor functionality can be extended through custom tools, defined in the <code>tools</code> array.
    *
    *  @exampleTitle Adding a custom tool button
    *  @example
    *    $("#editor").kendoEditor({
    *        tools: [
    *            {
    *                name: "toolName",
    *                tooltip: "Custom editor tool",
    *                exec: function(e) {
    *                    var editor = $(this).data("kendoEditor");
    *
    *                    // execute command
    *                }
    *            }
    *        ]
    *    });
    *
    *  @section
    *
    *  The custom buttons get a <strong>k-toolName</strong> CSS class to allow styling. (where <code>toolName</code> is the name specified in the custom tool configuration)
    */
    var EditorDocs = /** @lends kendo.ui.Editor.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [encoded] <true> Indicates whether the Editor should submit encoded HTML tags.
         * _example
         *  $("#editor").kendoEditor({
         *      encoded: false
         *  });
         * @option {Array} [tools] A collection of tools that should render a button, combobox, etc, to interact with the Editor
         * _example
         *  $("#editor").kendoEditor({
         *      tools: [
         *          "bold",
         *          "italic",
         *          "underline",
         *          "foreColor",
         *          "insertUnorderedList",
         *          "insertOrderedList",
         *          "createLink",
         *          "unlink",
         *          "insertImage"
         *      ]
         *  });
         * @option {Array} [stylesheets] Allows custom stylesheets to be included within the editing area.
         * _example
         *  $("#editor").kendoEditor({
         *      stylesheets: [
         *          "common-styles.css",
         *          "green-theme.css",
         *      ]
         *  });
         */
        init: function() {
            /**
             * Fires when Editor is blurred and its content has changed.
             * @name kendo.ui.Editor#change
             * @event
             * @param {Event} e
             * @example
             * function onChange(e) {
             *     // handle event
             * }
             */

            /**
             * Fires when the Editor selection has changed.
             * @name kendo.ui.Editor#select
             * @event
             * @param {Event} e
             * @example
             *  $("#editor").kendoEditor({
             *      select: function(e) {
             *          // handle event
             *      }
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the Editor
             *  var editor = $("#editor").data("kendoEditor");
             *  // bind to the select event
             *  editor.bind("select", function(e) {
             *      // handle event
             *  }
             */

            /**
             * Fires when an Editor command is executed.
             * @name kendo.ui.Editor#execute
             * @event
             * @param {Event} e
             * @param {String} e.name The name of the command
             * @param {Object} e.command The command instance
             * @example
             *  $("#editor").kendoEditor({
             *      execute: function(e) {
             *          // handle event
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the Editor
             *  var editor = $("#editor").data("kendoEditor");
             *  // bind to the select event
             *  editor.bind("execute", function(e) {
             *      // handle event
             *  }
             */

            /**
             * Fires before when content is pasted in the Editor.
             * @name kendo.ui.Editor#paste
             * @event
             * @param {Event} e
             * @param {Object} e.html The pasted content
             * @example
             *  $("#editor").kendoEditor({
             *      paste: function(e) {
             *          // handle event
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the Editor
             *  var editor = $("#editor").data("kendoEditor");
             *  // bind to the select event
             *  editor.bind("paste", function(e) {
             *      // handle event
             *  }
             */
        },

        /**
         * Gets or sets the Editor value.
         * @param {String} value The value to set.
         * @returns {String} The value of the Editor as HTML string.
         * @example
         * var editor = $("#editor").data("kendoEditor");
         *
         * // set value
         * editor.value(htmlString);
         *
         * // get value
         * var htmlValue = editor.value();
         */
        value: function() { },

        /**
         * Focuses the Editor editable area.
         * @example
         * var editor = $("#editor").data("kendoEditor");
         *
         * editor.focus();
         */
        focus: function() { }
    }

})();