<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemTooltip extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border configuration options.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemTooltipBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The tooltip font.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels. Uses kendo.format.Format placeholders:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The padding of the tooltip. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartSeriesItemTooltipPadding|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemTooltip.
    * The template which renders the tooltip.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemTooltip.
    * The template which renders the tooltip.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * If set to true the chart will display the series tooltip. By default the series tooltip is not displayed.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTooltip
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
