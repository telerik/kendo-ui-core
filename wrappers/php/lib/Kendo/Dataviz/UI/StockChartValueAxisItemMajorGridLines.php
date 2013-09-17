<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemMajorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the lines.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMajorGridLines
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The visibility of the lines.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMajorGridLines
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMajorGridLines
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the value axis major grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMajorGridLines
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the value axis major grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMajorGridLines
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
