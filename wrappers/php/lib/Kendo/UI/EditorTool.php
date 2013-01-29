<?php

namespace Kendo\UI;

class EditorTool extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The mandatory name of the tool. The built-in tools are "bold", "italic", "underline", "strikethrough", "fontName", "fontSize", "foreColor", "backColor", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "formatBlock", "createLink", "unlink", "insertImage", "insertHtml", "viewHtml".
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

//<< Properties
}

?>
