<?php

namespace Kendo\Dataviz\UI;

class ChartPlotArea extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the plot area.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The background opacity of the plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The border of the plot area.
    * @param \Kendo\Dataviz\UI\ChartPlotAreaBorder $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function border(\Kendo\Dataviz\UI\ChartPlotAreaBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The margin of the plot area.
    * @param float|Object $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

//<< Properties
}

?>
