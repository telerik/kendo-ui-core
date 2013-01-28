<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemTooltip extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the tooltip. The default is determined from the series color.
    * @param string $value
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border configuration options.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemTooltipBorder $value
    */
    public function border(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemTooltipBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the tooltip. The default is the same as the series labels color.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The tooltip font.
    * @param string $value
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The tooltip format. Format variables depend on the series type:
    * @param string $value
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The padding of the tooltip.
    * @param float|Object $value
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The tooltip template.
Template variables:
    * @param string|\kendo\JavaScriptFunction $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * A value indicating if the tooltip should be displayed.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
