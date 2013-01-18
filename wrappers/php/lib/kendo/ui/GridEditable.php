<?php

namespace kendo\ui;

class GridEditable extends \kendo\SerializableObject {
//>> Properties

    public function setConfirmation($value) {
        $this->setProperty('confirmation', $value);

        return $this;
    }

    public function setDestroy($value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function setMode($value) {
        $this->setProperty('mode', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function setUpdate($value) {
        $this->setProperty('update', $value);

        return $this;
    }

//<< Properties
}

?>
