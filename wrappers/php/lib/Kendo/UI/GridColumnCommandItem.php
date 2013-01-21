<?php

namespace Kendo\UI;

class GridColumnCommandItem extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function text($value) {
        return $this->setProperty('text', $value);
    }

    public function className($value) {
        return $this->setProperty('className', $value);
    }

    public function click($value) {
        return $this->setProperty('click', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
