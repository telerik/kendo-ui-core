<?php

namespace kendo\ui;

class EditorTool extends \kendo\SerializableObject {
//>> Properties

    public function setName($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function setTooltip($value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function setExec($value) {
        $this->setProperty('exec', $value);

        return $this;
    }

//<< Properties
}

?>
