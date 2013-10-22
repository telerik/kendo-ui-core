<?php

namespace Kendo\Dataviz\UI;

class ChartPlotArea extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the chart plot area. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the chart plot area.
    * @param \Kendo\Dataviz\UI\ChartPlotAreaBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The margin of the chart plot area. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartPlotAreaMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The background opacity of the chart plot area. By default the background is opaque.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The padding of the chart plot area. A numeric value will set all paddings.The default padding for pie, donut, radar and polar charts is proportional of the chart size.
    * @param float|\Kendo\Dataviz\UI\ChartPlotAreaPadding|array $value
    * @return \Kendo\Dataviz\UI\ChartPlotArea
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

//<< Properties
}

?>
