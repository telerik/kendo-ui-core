<?php

namespace Kendo\Dataviz\UI;

class BarcodeText extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the text. Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\BarcodeText
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font of the text.
    * @param string $value
    * @return \Kendo\Dataviz\UI\BarcodeText
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The margin of the text
    * @param \Kendo\Dataviz\UI\BarcodeTextMargin|array $value
    * @return \Kendo\Dataviz\UI\BarcodeText
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * If set to false the barcode will not display the value as a text below the barcode lines.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\BarcodeText
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
