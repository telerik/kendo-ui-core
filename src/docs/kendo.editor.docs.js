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
         * @param {Element} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [encoded] <true> Indicates whether the Editor should submit encoded HTML tags.
         * _example
         *  $("#editor").kendoEditor({
         *      encoded: false
         *  });
         * @option {Array} [tools] A collection of tools that should render a button, combobox, etc, to interact with the Editor. Custom tools are defined
         * as a collection of required properties, while the insertHtml  tool requires a collection of text-value pairs
         * _example
         *  $("#editor").kendoEditor({
         *      tools: [
         *      "bold",
         *      "italic",
         *      "underline",
         *      "strikethrough",
         *      "fontName",
         *      "fontSize",
         *      "foreColor",
         *      "backColor",
         *      "justifyLeft",
         *      "justifyCenter",
         *      "justifyRight",
         *      "justifyFull",
         *      "insertUnorderedList",
         *      "insertOrderedList",
         *      "indent",
         *      "outdent",
         *      "formatBlock",
         *      "createLink",
         *      "unlink",
         *      "insertImage",
         *      "insertHtml",
         *      "viewHtml",
         *      {
         *          name: "customTool",
         *          tooltip: "Custom Tool",
         *          exec: function(e) {
         *              var editor = $(this).data("kendoEditor");
         *              // ...
         *          }
         *      }
         *      ],
         *      insertHtml: [
         *          { text: "label 1", value: "<p>snippet 1</p>" },
         *          { text: "label 2", value: "<p>snippet 2</p>" }
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
         * editor.value("<p>new content</p>");
         *
         * // get value
         * var htmlValue = editor.value();
         */
        value: function (html) {},

        /**
         * Focuses the editable area.
         */
        focus: function() {},

        /**
         * Serializes the current state of the editable area to the <textarea> element.
         * This method should be called after modifying the editor content through the DOM.
         */
        update: function () {},

        /**
         * Gets the HTML encoded value of the editor.
         */
        encodedValue: function () {},

        /**
         * Creates a W3C-compatible <strong>Range</strong> object.
         * @param {Document} document The document that the range is associated with. If ommited, the document of the editor editing area will be used.
         * @returns {Range} The created <strong>Range</strong> object.
         * @example
         * var editor = $("#editor").data("kendoEditor");
         *
         * var range = editor.createRange();
         */
        createRange: function (document) {},

        /**
         * Gets a W3C-compatible <strong>Selection</strong> object form the editable area.
         */
        getSelection: function () {},

        /**
         * Gets a <strong>Range</strong> object form the editable area.
         * @returns {Range} A W3C-compatible <strong>Range</strong> object that represents the currently selected text in the editor area.
         * @example
         * var editor = $("#editor").data("kendoEditor");
         *
         * var range = editor.getRange();
         */
        getRange: function () {},

        /**
         * Focuses the editable area and selects the range described by the range parameter.
         * @param {Range} range The <strong>Range</strong> object that describes the new selection.
         * @example
         * var editor = $("#editor").data("kendoEditor"),
         *     range = editor.createRange();
         *
         * range.selectNodeContents(editor.body);
         *
         * editor.selectRange(range);
         */
        selectRange: function (range) {},

        /**
         * Serializes the currently selected text to a XHTML string.
         * @returns {String} The selectied text as valid XHTML.
         */
        selectedHtml: function () {},

        /**
         * Pastes HTML into the editable area.
         * @param {String} html The HTML to be pasted.
         * @example
         * var editor = $("#editor").data("kendoEditor");
         *
         * editor.paste("<p>new content</p>");
         */
        paste: function (html) {},

        /**
         * Executes an editor command on the currently selected text.
         * @param {String} name The name of the command to be executed.
         * @param {String} params The parameters for the executed command.
         * @example
         * var editor = $("#editor").data("kendoEditor");
         *
         * editor.exec("bold");
         *
         * editor.exec("undo");
         *
         * editor.exec("foreColor", { value: "#ff0000" });
         */
        exec: function (name, params) {}
    }

})();
