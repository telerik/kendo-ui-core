<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The area configuration options.
The default options for all area series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function area($value) {
        return $this->setProperty('area', $value);
    }

    /**
    * The default options for all bar series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function bar($value) {
        return $this->setProperty('bar', $value);
    }

    /**
    * The border of the series.
    * @param \Kendo\Dataviz\UI\SparklineSeriesDefaultsBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The column configuration options.
The default options for all column series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function column($value) {
        return $this->setProperty('column', $value);
    }

    /**
    * The distance between category clusters.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    /**
    * Configures the series data labels.
    * @param \Kendo\Dataviz\UI\SparklineSeriesDefaultsLabels|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The line configuration options.
The default options for all line series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The effects overlay.
    * @param  $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    /**
    * The pie configuration options.
The default options for all pie series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function pie($value) {
        return $this->setProperty('pie', $value);
    }

    /**
    * Space between bars.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    /**
    * A boolean value indicating if the series should be stacked.
    * @param boolean|\Kendo\Dataviz\UI\SparklineSeriesDefaultsStack|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    /**
    * The type of the series. Available types:
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\SparklineSeriesDefaultsTooltip|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesDefaults
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

//<< Properties
}

?>
