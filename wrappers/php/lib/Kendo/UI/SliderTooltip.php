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
    * Sets the template option of the SliderTooltip.
    * Template of the tooltip. The following variables are passed by the Slider and are ready to be used inside the template:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SliderTooltip
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the SliderTooltip.
    * Template of the tooltip. The following variables are passed by the Slider and are ready to be used inside the template:
    * @param string $value The template content.
    * @return \Kendo\UI\SliderTooltip
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
