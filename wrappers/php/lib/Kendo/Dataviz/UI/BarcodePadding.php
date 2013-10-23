<?php

namespace Kendo\Dataviz\UI;

class BarcodePadding extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom padding of the barcode.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodePadding
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left padding of the barcode.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodePadding
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right padding of the barcode.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodePadding
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top padding of the barcode.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodePadding
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
