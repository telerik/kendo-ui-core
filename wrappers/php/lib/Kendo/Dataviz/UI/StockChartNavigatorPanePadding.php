<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorPanePadding extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom padding of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPanePadding
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left padding of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPanePadding
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right padding of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPanePadding
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top padding of the navigator pane.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPanePadding
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
