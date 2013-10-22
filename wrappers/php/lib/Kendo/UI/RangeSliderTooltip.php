<?php

namespace Kendo\UI;

class RangeSliderTooltip extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Disables (false) or enables (true) the tooltip of the RangeSlider.
    * @param boolean $value
    * @return \Kendo\UI\RangeSliderTooltip
    */
    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    /**
    * Format string for the text of the tooltip. Note: The applied format will also influence the appearance of
the RangeSlider tick labels.
    * @param string $value
    * @return \Kendo\UI\RangeSliderTooltip
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Sets the template option of the RangeSliderTooltip.
    * Template of the tooltip.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\RangeSliderTooltip
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the RangeSliderTooltip.
    * Template of the tooltip.
    * @param string $value The template content.
    * @return \Kendo\UI\RangeSliderTooltip
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
