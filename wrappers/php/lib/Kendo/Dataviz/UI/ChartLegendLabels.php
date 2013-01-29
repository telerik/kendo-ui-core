<?php

namespace Kendo\Dataviz\UI;

class ChartLegendLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the labels.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The template of the labels.
Template variables:
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
