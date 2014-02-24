<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorPaneMargin extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom margin of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPaneMargin
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left margin of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPaneMargin
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right margin of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPaneMargin
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top margin of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPaneMargin
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
