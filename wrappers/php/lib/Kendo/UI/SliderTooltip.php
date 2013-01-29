<?php

namespace Kendo\UI;

class SliderTooltip extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Disables (false) or enables (true) the tooltip of
the Slider.
    * @param boolean $value
    * @return \Kendo\UI\SliderTooltip
    */
    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    /**
    * Format string for the text of the tooltip. Note: The applied
format will also influence the appearance of the Slider
tick labels.
    * @param string $value
    * @return \Kendo\UI\SliderTooltip
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Template of the tooltip.
    * @param string $value
    * @return \Kendo\UI\SliderTooltip
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
