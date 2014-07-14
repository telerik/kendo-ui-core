<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The label alignment when series.type is set to "donut", "funnel" or "pie".The supported values  for "donut" and "pie" are:The supported values for "funnel" are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

    /**
    * The background color of the labels. Accepts a valid CSS color string, including hex and rgb.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemLabelsBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels. Accepts a valid CSS color string, including hex and rgb.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The distance of the labels when series.type is set to "donut" or "pie".
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function distance($value) {
        return $this->setProperty('distance', $value);
    }

    /**
    * The font style of the labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels. Uses kendo.format.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartSeriesItemLabelsMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the labels. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartSeriesItemLabelsPadding|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The position of the labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemLabels.
    * The template which renders the chart series label.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemLabels.
    * The template which renders the chart series label.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * If set to true the chart will display the series labels. By default chart series labels are not displayed.
    * @param boolean|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The chart series from label configuration.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function from($value) {
        return $this->setProperty('from', $value);
    }

    /**
    * The chart series to label configuration.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemLabelsTo|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function to($value) {
        return $this->setProperty('to', $value);
    }

//<< Properties
}

?>
