<?php

namespace Kendo\Dataviz\UI;

/**
* PHP wrapper for the chartArea option of Chart.
*/
/**
*/
class ChartArea extends \kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the chart area.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartArea
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The background opacity of the chart area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartArea
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The border of the chart area.
    * @param \Kendo\Dataviz\UI\ChartAreaBorder $value
    * @return \Kendo\Dataviz\UI\ChartArea
    */
    public function border(\Kendo\Dataviz\UI\ChartAreaBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The height of the chart area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartArea
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The margin of the chart area.
    * @param float|Object $value
    * @return \Kendo\Dataviz\UI\ChartArea
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The width of the chart area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartArea
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
