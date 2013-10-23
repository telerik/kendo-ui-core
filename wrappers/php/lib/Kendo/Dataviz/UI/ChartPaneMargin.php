<?php

namespace Kendo\Dataviz\UI;

class ChartPaneMargin extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom margin of the chart panes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPaneMargin
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left margin of the chart panes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPaneMargin
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right margin of the chart panes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPaneMargin
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top margin of the chart panes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPaneMargin
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
