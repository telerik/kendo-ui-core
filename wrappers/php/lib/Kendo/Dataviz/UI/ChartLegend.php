<?php

namespace Kendo\Dataviz\UI;

class ChartLegend extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the legend. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the legend.
    * @param \Kendo\Dataviz\UI\ChartLegendBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The chart inactive legend items configuration.
    * @param \Kendo\Dataviz\UI\ChartLegendInactiveItems|array $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function inactiveItems($value) {
        return $this->setProperty('inactiveItems', $value);
    }

    /**
    * The chart legend label configuration.
    * @param \Kendo\Dataviz\UI\ChartLegendLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The margin of the chart legend. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartLegendMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The X offset of the chart legend. The offset is relative to the default position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of its initial position.
A negative value will move the legend to the left of its current position.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function offsetX($value) {
        return $this->setProperty('offsetX', $value);
    }

    /**
    * The Y offset of the chart legend.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from its initial position.
A negative value will move the legend upwards from its current position.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function offsetY($value) {
        return $this->setProperty('offsetY', $value);
    }

    /**
    * The positions of the chart legend.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * If set to true the chart will display the legend. By default the chart legend is visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
