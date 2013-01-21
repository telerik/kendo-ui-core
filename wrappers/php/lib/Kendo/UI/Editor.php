<?php

namespace Kendo\UI;

class Editor extends \Kendo\UI\Widget {
    public function name() {
        return 'Editor';
    }
//>> Properties

    public function encoded($value) {
        $this->setProperty('encoded', $value);

        return $this;
    }

    public function messages($value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function stylesheets($value) {
        $this->setProperty('stylesheets', $value);

        return $this;
    }

    public function addTool(\Kendo\UI\EditorTool $value) {
        $values = $this->getProperty('tools');

        if ($values == null) {
            $values = array();
            $this->setProperty('tools', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function imagebrowser(\Kendo\UI\EditorImagebrowser $value) {
        $this->setProperty('imagebrowser', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function execute($value) {
        $this->setProperty('execute', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function keydown($value) {
        $this->setProperty('keydown', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function keyup($value) {
        $this->setProperty('keyup', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function paste($value) {
        $this->setProperty('paste', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
