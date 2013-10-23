<?php

namespace Kendo\Dataviz\UI;

class ChartPlotAreaMargin extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom margin of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaMargin
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left margin of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaMargin
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right margin of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaMargin
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top margin of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaMargin
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
