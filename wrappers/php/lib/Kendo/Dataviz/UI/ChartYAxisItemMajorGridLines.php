<?php

namespace Kendo\Dataviz\UI;

class ChartYAxisItemMajorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the lines. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemMajorGridLines
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the line.The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemMajorGridLines
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * If set to true the chart will display the x major grid liness. By default the x major grid liness are visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemMajorGridLines
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart x major grid lines width
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemMajorGridLines
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the y axis major grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemMajorGridLines
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the y axis major grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemMajorGridLines
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
