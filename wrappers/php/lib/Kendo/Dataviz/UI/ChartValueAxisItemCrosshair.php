<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemCrosshair extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemCrosshair
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the crosshair. By default the crosshair is opaque.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemCrosshair
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The crosshar tooltip options.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemCrosshairTooltip|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemCrosshair
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * If set to true the chart will display the value axis crosshair. By default the value axis crosshair is not visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemCrosshair
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the crosshair in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemCrosshair
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
