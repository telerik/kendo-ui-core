<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemTitle extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the title. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the title.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemTitleBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the title. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The margin of the title. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartValueAxisItemTitleMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the title. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartValueAxisItemTitlePadding|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The position of the title.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The rotation angle of the title. By default the title is not rotated.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

    /**
    * The text of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * If set to true the chart will display the value axis title. By default the value axis title is visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemTitle
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
