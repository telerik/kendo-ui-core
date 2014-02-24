<?php

namespace Kendo\Dataviz\UI;

class Barcode extends \Kendo\UI\Widget {
    public function name() {
        return 'Barcode';
    }
//>> Properties

    /**
    * Sets the preferred rendering engine.
If it is not supported by the browser, the Barcode will switch to the first available mode.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function renderAs($value) {
        return $this->setProperty('renderAs', $value);
    }

    /**
    * The background of the barcode area.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the barcode area.
    * @param \Kendo\Dataviz\UI\BarcodeBorder|array $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * If set to true the barcode will not display the checksum digit next to the value in the text area.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function checksum($value) {
        return $this->setProperty('checksum', $value);
    }

    /**
    * The color of the bar elements.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The height of the barcode in pixels.  By default the height is 100.
    * @param float $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The padding of the barcode.
    * @param \Kendo\Dataviz\UI\BarcodePadding|array $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Can be set to a JavaScript object which represents the text configuration.
    * @param \Kendo\Dataviz\UI\BarcodeText|array $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The symbology (encoding) the barcode will use.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The initial value of the Barcode
    * @param string $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The width of the barcode in pixels.  By default the width is 300.
    * @param float $value
    * @return \Kendo\Dataviz\UI\Barcode
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }


//<< Properties
}

?>
