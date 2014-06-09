<?php

namespace Kendo\Dataviz\UI;

class ChartLegendPadding extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom padding of the chart legend.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegendPadding
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left padding of the chart legend.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegendPadding
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right padding of the chart legend.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegendPadding
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top padding of the chart legend.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegendPadding
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
