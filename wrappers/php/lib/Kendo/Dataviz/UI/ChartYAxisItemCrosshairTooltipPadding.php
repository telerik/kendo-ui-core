<?php

namespace Kendo\Dataviz\UI;

class ChartYAxisItemCrosshairTooltipPadding extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom padding of the crosshair tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemCrosshairTooltipPadding
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left padding of the crosshair tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemCrosshairTooltipPadding
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right padding of the crosshair tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemCrosshairTooltipPadding
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top padding of the crosshair tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemCrosshairTooltipPadding
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
