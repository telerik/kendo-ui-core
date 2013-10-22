<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The length of the tick line in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * If set to true the chart will display the category axis major ticks. By default the category axis major ticks are visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the major ticks in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the category axis major ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the category axis major ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
