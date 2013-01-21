<?php

namespace Kendo\UI;

class GridToolbarItem extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function text($value) {
        $this->setProperty('text', $value);

        return $this;
    }

//<< Properties
}

?>
