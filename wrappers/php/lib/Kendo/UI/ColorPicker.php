<?php

namespace Kendo\UI;

class ColorPicker extends \Kendo\UI\Widget {
    public function name() {
        return 'ColorPicker';
    }
//>> Properties

    public function buttons($value) {
        return $this->setProperty('buttons', $value);
    }

    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    public function palette($value) {
        return $this->setProperty('palette', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function preview($value) {
        return $this->setProperty('preview', $value);
    }

    public function toolIcon($value) {
        return $this->setProperty('toolIcon', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
