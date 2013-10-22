<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaultsTooltipBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsTooltipBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsTooltipBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
