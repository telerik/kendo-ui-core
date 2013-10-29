<?php

namespace Kendo\UI;

class EditorTool extends \Kendo\SerializableObject {
//>> Properties

    /**
    * When specifying a tool as an object, a tool name is required. Please note that "undo" and "redo" are reserved tool names.
    * @param string $value
    * @return \Kendo\UI\EditorTool
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The text which will be displayed when the end-user hovers the tool button with the mouse.
    * @param string $value
    * @return \Kendo\UI\EditorTool
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * Sets the exec option of the EditorTool.
    * The JavaScript function which will be executed when the end-user clicks the tool button.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\EditorTool
    */
    public function exec($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('exec', $value);
    }

    /**
    * Adds EditorToolItem to the EditorTool.
    * @param \Kendo\UI\EditorToolItem|array,... $value one or more EditorToolItem to add.
    * @return \Kendo\UI\EditorTool
    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }

    /**
    * Sets the template option of the EditorTool.
    * The kendo template that will be used for rendering the given tool.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\EditorTool
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the EditorTool.
    * The kendo template that will be used for rendering the given tool.
    * @param string $value The template content.
    * @return \Kendo\UI\EditorTool
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
