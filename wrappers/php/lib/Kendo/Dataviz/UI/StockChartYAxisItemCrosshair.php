<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItemCrosshair extends \kendo\SerializableObject {
//>> Properties

    /**
    * The color of the crosshair.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemCrosshair
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The width of the crosshair.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemCrosshair
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The opacity of the crosshair.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemCrosshair
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The dash type of the crosshair.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemCrosshair
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The dash type of the crosshair.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemCrosshair
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The crosshar tooltip configuration options.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemCrosshairTooltip|array $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemCrosshair
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

//<< Properties
}

?>
