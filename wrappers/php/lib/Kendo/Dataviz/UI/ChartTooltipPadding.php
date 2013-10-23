<?php

namespace Kendo\Dataviz\UI;

class ChartTooltipPadding extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom padding of the tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartTooltipPadding
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left padding of the tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartTooltipPadding
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right padding of the tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartTooltipPadding
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top padding of the tooltip.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartTooltipPadding
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
