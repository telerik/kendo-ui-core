<?php

namespace Kendo\Dataviz\UI;

class SparklineCategoryAxisItemMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the major ticks.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The width of the major ticks in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the category axis major ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the category axis major ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
