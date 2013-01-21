<?php

namespace Kendo\UI;

class GridToolbarItem extends \Kendo\SerializableObject {
//>> Properties

    public function setName($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function setText($value) {
        $this->setProperty('text', $value);

        return $this;
    }

//<< Properties
}

?>
