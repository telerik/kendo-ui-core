<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of the highlighted chart series. The color is computed automatically from the base point color.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The highlight color. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line of the highlighted chart series. The color is computed automatically from the base point color.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemHighlightLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The opacity of the highlighted points.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * If set to true the chart will highlight the series when the user hovers it with the mouse.
By default chart series highlighting is enabled.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
