<?php

namespace kendo\ui;

class ColorPicker extends \kendo\ui\Widget {
    public function name() {
        return 'ColorPicker';
    }
//>> Properties

    public function setButtons($value) {
        $this->setProperty('buttons', $value);

        return $this;
    }

    public function setColumns($value) {
        $this->setProperty('columns', $value);

        return $this;
    }

    public function setMessages($value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function setPalette($value) {
        $this->setProperty('palette', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function setPreview($value) {
        $this->setProperty('preview', $value);

        return $this;
    }

    public function setToolIcon($value) {
        $this->setProperty('toolIcon', $value);

        return $this;
    }

    public function setValue($value) {
        $this->setProperty('value', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
