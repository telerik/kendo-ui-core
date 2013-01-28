<?php

namespace Kendo\UI;

class RangeSliderTooltip extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Disables (false) or enables (true) the tooltip of the RangeSlider.
    * @param boolean $value
    */
    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    /**
    * Format string for the text of the tooltip. Note: The applied format will also influence the appearance of
the RangeSlider tick labels.
    * @param string $value
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Template of the tooltip.
    * @param string $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
