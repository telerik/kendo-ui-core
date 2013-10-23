<?php

namespace Kendo\Dataviz\UI;

class ChartPlotAreaPadding extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom padding of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaPadding
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left padding of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaPadding
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right padding of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaPadding
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top padding of the chart plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotAreaPadding
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
