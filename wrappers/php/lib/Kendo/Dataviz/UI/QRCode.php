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
    * The dark module color of the QR code. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function darkModuleColor($value) {
        return $this->setProperty('darkModuleColor', $value);
    }

    /**
    * The error correction level used to encode the value. The possible values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\QRCode
    */
    public function errorCorrectionLevel($value) {
        return $this->setProperty('errorCorrectionLevel', $value);
    }

    /**
    * Specifies the size of a QR code in pixels (i.e. "200px"). Numeric values are treated as pixels. If no size is specified, it will be determined from the element width and height. In case the element does not have width or height bigger than zero, a default value of 200 pixels will be used.
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
