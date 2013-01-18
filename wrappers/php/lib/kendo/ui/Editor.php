<?php

namespace kendo\ui;

class Editor extends \kendo\ui\Widget {
    public function name() {
        return 'Editor';
    }
//>> Properties

    public function setEncoded($value) {
        $this->setProperty('encoded', $value);

        return $this;
    }

    public function setMessages($value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function setStylesheets($value) {
        $this->setProperty('stylesheets', $value);

        return $this;
    }

    public function addTool(\kendo\ui\EditorTool $value) {
        $values = $this->getProperty('tools');

        if ($values == null) {
            $values = array();
            $this->setProperty('tools', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setImagebrowser(\kendo\ui\EditorImagebrowser $value) {
        $this->setProperty('imagebrowser', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setExecute($value) {
        $this->setProperty('execute', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setKeydown($value) {
        $this->setProperty('keydown', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setKeyup($value) {
        $this->setProperty('keyup', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setPaste($value) {
        $this->setProperty('paste', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
