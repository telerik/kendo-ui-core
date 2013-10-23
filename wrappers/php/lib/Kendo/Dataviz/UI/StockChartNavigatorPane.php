<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorPane extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the pane. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPane
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the navigator pane.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorPaneBorder|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPane
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The navigator pane height in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPane
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The margin of the pane. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\StockChartNavigatorPaneMargin|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPane
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The unique name of the navigator pane.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPane
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The padding of the pane. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\StockChartNavigatorPanePadding|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPane
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The title configuration of the navigator pane.
    * @param string|\Kendo\Dataviz\UI\StockChartNavigatorPaneTitle|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorPane
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

//<< Properties
}

?>
