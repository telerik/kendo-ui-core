<?php

namespace Kendo\UI;

class TreeViewCheckboxes extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function checkChildren($value) {
        return $this->setProperty('checkChildren', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
