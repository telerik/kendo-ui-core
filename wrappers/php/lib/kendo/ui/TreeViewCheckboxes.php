<?php

namespace kendo\ui;

class TreeViewCheckboxes extends \kendo\SerializableObject {
//>> Properties

    public function setName($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function setCheckChildren($value) {
        $this->setProperty('checkChildren', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

//<< Properties
}

?>
