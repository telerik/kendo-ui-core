<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemHighlightBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the border. By default the border is opaque.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
