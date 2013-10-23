<?php

namespace Kendo\Dataviz\UI;

class SparklineCategoryAxisItemMinorTicks extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMinorTicks
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the minor ticks.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMinorTicks
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMinorTicks
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The width of the minor ticks in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMinorTicks
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the category axis minor ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMinorTicks
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the category axis minor ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMinorTicks
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
