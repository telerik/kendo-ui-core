<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    /**
    * A value indicating if the series points should be highlighted.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The border of highlighted points. The color is computed automatically from the base point color.** Applicable to bubble, pie, candlestick and ohlc series. **
    * @param \Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The highlight color.** Available only for pie series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Line options for highlighted points. The color is computed automatically from the base point color.** Available only for candlestick series **
    * @param \Kendo\Dataviz\UI\ChartSeriesItemHighlightLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The opacity of the highlighted points.** Applicable to bubble, pie, candlestick and ohlc series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemHighlight
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
