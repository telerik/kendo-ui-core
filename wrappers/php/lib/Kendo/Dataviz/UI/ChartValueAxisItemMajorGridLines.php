<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemMajorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the major grid lines. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the major grid lines.The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The type of grid lines to draw for radar charts:The default type is "line" except for "radarColumn" charts.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * If set to true the chart will display the major grid lines. By default the major grid lines are visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the value axis major grid lines in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the value axis major grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the value axis major grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
