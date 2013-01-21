<?php

namespace Kendo\UI;

class Editor extends \Kendo\UI\Widget {
    public function name() {
        return 'Editor';
    }
//>> Properties

    public function encoded($value) {
        return $this->setProperty('encoded', $value);
    }

    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    public function stylesheets($value) {
        return $this->setProperty('stylesheets', $value);
    }

    public function addTool(\Kendo\UI\EditorTool $value) {
        return $this->add('tools', $value);
    }

    public function imagebrowser(\Kendo\UI\EditorImagebrowser $value) {
        return $this->setProperty('imagebrowser', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function execute($value) {
        return $this->setProperty('execute', new \Kendo\JavaScriptFunction($value));
    }

    public function keydown($value) {
        return $this->setProperty('keydown', new \Kendo\JavaScriptFunction($value));
    }

    public function keyup($value) {
        return $this->setProperty('keyup', new \Kendo\JavaScriptFunction($value));
    }

    public function paste($value) {
        return $this->setProperty('paste', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
