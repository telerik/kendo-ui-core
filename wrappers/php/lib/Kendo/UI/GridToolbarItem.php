<?php

namespace Kendo\UI;

class GridToolbarItem extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
