<?php

namespace Kendo\UI;

class SliderTooltip extends \Kendo\SerializableObject {
//>> Properties

    public function setEnabled($value) {
        $this->setProperty('enabled', $value);

        return $this;
    }

    public function setFormat($value) {
        $this->setProperty('format', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

//<< Properties
}

?>
