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
    * Template of the tooltip.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SliderTooltip
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the SliderTooltip.
    * Template of the tooltip.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\SliderTooltip
    */
    public function template($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
