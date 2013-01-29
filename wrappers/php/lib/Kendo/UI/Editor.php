<?php

namespace Kendo\UI;

class Editor extends \Kendo\UI\Widget {
    protected function name() {
        return 'Editor';
    }
//>> Properties

    /**
    * Indicates whether the Editor should submit encoded HTML tags.
    * @param boolean $value
    * @returns \Kendo\UI\Editor
    */
    public function encoded($value) {
        return $this->setProperty('encoded', $value);
    }

    /**
    * Defines the text of the labels that are shown within the editor. Used primarily for localization.
    * @param Object $value
    * @returns \Kendo\UI\Editor
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * Allows custom stylesheets to be included within the editing area.
    * @param array $value
    * @returns \Kendo\UI\Editor
    */
    public function stylesheets($value) {
        return $this->setProperty('stylesheets', $value);
    }

    /**
    * Adds EditorTool to the Editor.
    * @param \Kendo\UI\EditorTool,... $value one or more EditorTool to add.
    * @returns \Kendo\UI\Editor
    */
    public function addTool(\Kendo\UI\EditorTool $value) {
        return $this->add('tools', func_get_args());
    }

    /**
    * Configuration for image browser dialog.
    * @param \Kendo\UI\EditorImagebrowser $value
    * @returns \Kendo\UI\Editor
    */
    public function imagebrowser(\Kendo\UI\EditorImagebrowser $value) {
        return $this->setProperty('imagebrowser', $value);
    }

    /**
    * Sets the change event of the Editor.
    * Fires when Editor is blurred and its content has changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\Editor
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the execute event of the Editor.
    * Fires when an Editor command is executed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\Editor
    */
    public function execute($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('execute', $value);
    }

    /**
    * Sets the keydown event of the Editor.
    * Fires when the user depresses a keyboard key. Triggered multiple times if the user holds the key down.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\Editor
    */
    public function keydown($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('keydown', $value);
    }

    /**
    * Sets the keyup event of the Editor.
    * Fires when the user releases a keyboard key.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\Editor
    */
    public function keyup($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('keyup', $value);
    }

    /**
    * Sets the paste event of the Editor.
    * Fires before when content is pasted in the Editor.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\Editor
    */
    public function paste($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('paste', $value);
    }

    /**
    * Sets the select event of the Editor.
    * Fires when the Editor selection has changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\Editor
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

//<< Properties
}

?>
