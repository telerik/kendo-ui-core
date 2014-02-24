<?php

namespace Kendo\Dataviz\UI;

class ChartPaneBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartPaneBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the border.The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartPaneBorder
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartPaneBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
