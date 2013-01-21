<?php

namespace Kendo\UI;

class TreeViewCheckboxes extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function checkChildren($value) {
        $this->setProperty('checkChildren', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

//<< Properties
}

?>
