<?php

namespace Kendo\UI;

class ColorPicker extends \Kendo\UI\Widget {
    public function name() {
        return 'ColorPicker';
    }
//>> Properties

    public function buttons($value) {
        $this->setProperty('buttons', $value);

        return $this;
    }

    public function columns($value) {
        $this->setProperty('columns', $value);

        return $this;
    }

    public function messages($value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function palette($value) {
        $this->setProperty('palette', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function preview($value) {
        $this->setProperty('preview', $value);

        return $this;
    }

    public function toolIcon($value) {
        $this->setProperty('toolIcon', $value);

        return $this;
    }

    public function value($value) {
        $this->setProperty('value', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
