<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemMinorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the minor grid lines.The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * If set to true the chart will display the minor grid lines. By default the minor grid lines are visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the category axis minor grid lines in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the category axis minor grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the category axis minor grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
