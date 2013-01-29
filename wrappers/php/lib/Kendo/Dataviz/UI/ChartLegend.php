<?php

namespace Kendo\Dataviz\UI;

class ChartLegend extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the legend. Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the legend.
    * @param \Kendo\Dataviz\UI\ChartLegendBorder $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function border(\Kendo\Dataviz\UI\ChartLegendBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * Configures the legend labels.
    * @param \Kendo\Dataviz\UI\ChartLegendLabels $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function labels(\Kendo\Dataviz\UI\ChartLegendLabels $value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The margin of the legend.
    * @param float|Object $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The X offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of it's initial position.  A negative value will move the legend
to the left of the current position.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function offsetX($value) {
        return $this->setProperty('offsetX', $value);
    }

    /**
    * The Y offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from it's initial position.  A negative value will move the legend
upwards from the current position.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function offsetY($value) {
        return $this->setProperty('offsetY', $value);
    }

    /**
    * The padding of the legend.
    * @param float|Object $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The positions of the legend.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The visibility of the legend.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartLegend
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
