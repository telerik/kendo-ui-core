<?php

namespace Kendo\Dataviz\UI;

class StockChartLegendLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the labels.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The template of the labels.
Template variables:
*   text - the text the legend item.
*   series - the data series.
    * @param string $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
