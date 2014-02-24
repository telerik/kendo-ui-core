<?php

namespace Kendo\Dataviz\UI;

class BarcodeTextMargin extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom margin of the text.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodeTextMargin
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left margin of the text.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodeTextMargin
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right margin of the text.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodeTextMargin
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top margin of the text.
    * @param float $value
    * @return \Kendo\Dataviz\UI\BarcodeTextMargin
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
