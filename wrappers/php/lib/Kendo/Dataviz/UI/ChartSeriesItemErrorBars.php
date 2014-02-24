<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemErrorBars extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The error bars value.The following value types are supported:
    * @param string|float|array|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBars
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The xAxis error bars value. See the series.errorBars.value option for a list of the supported value types.
    * @param string|float|array|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBars
    */
    public function xValue($value) {
        return $this->setProperty('xValue', $value);
    }

    /**
    * The yAxis error bars value. See the series.errorBars.value option for a list of the supported value types.
    * @param string|float|array|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBars
    */
    public function yValue($value) {
        return $this->setProperty('yValue', $value);
    }

    /**
    * If set to false, the error bars caps will not be displayed. By default the caps are visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBars
    */
    public function endCaps($value) {
        return $this->setProperty('endCaps', $value);
    }

    /**
    * The color of the error bars. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBars
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The error bars line options.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemErrorBarsLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBars
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
