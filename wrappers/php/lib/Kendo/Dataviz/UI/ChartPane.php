<?php

namespace Kendo\Dataviz\UI;

class ChartPane extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the chart pane. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the chart pane.
    * @param \Kendo\Dataviz\UI\ChartPaneBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * Specifies whether the charts in the pane should be clipped. By default all charts except radar, polar and 100% stacked charts are clipped.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function clip($value) {
        return $this->setProperty('clip', $value);
    }

    /**
    * The chart pane height in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The margin of the pane. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartPaneMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The unique name of the chart pane.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The padding of the pane. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartPanePadding|array $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The title configuration of the chart pane.
    * @param string|\Kendo\Dataviz\UI\ChartPaneTitle|array $value
    * @return \Kendo\Dataviz\UI\ChartPane
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

//<< Properties
}

?>
