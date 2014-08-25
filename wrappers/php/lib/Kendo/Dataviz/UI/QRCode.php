<?php

namespace Kendo\Dataviz\UI;

class QRCode extends \Kendo\UI\Widget {
    public function name() {
        return 'QRCode';
    }

//>> Properties

    /**
    * The background color of the QR code. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the QR code.
    * @param \Kendo\Dataviz\UI\QRCodeBorder|array $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The color of the QR code. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The encoding mode used to encode the value.The possible values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function encoding($value) {
        return $this->setProperty('encoding', $value);
    }

    /**
    * The error correction level used to encode the value.The possible values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function errorCorrection($value) {
        return $this->setProperty('errorCorrection', $value);
    }

    /**
    * Sets the minimum distance in pixels that should be left between the border and the QR modules.
    * @param float $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Sets the preferred rendering engine.
If it is not supported by the browser, the QRCode will switch to the first available mode.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function renderAs($value) {
        return $this->setProperty('renderAs', $value);
    }

    /**
    * Specifies the size of a QR code in pixels (i.e. "200px"). Numeric values are treated as pixels.
If no size is specified, it will be determined from the element width and height.
In case the element has width or height of zero, a default value of 200 pixels will be used.
    * @param float|string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The value of the QRCode.
    * @param float|string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }


//<< Properties
}

?>
