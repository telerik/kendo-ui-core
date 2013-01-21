<?php

namespace Kendo\UI;

class SliderTooltip extends \Kendo\SerializableObject {
//>> Properties

    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    public function format($value) {
        return $this->setProperty('format', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
