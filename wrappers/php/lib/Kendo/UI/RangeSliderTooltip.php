<?php

namespace Kendo\UI;

class RangeSliderTooltip extends \Kendo\SerializableObject {
//>> Properties

    public function enabled($value) {
        $this->setProperty('enabled', $value);

        return $this;
    }

    public function format($value) {
        $this->setProperty('format', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

//<< Properties
}

?>
