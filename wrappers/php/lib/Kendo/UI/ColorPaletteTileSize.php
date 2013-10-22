<?php

namespace Kendo\UI;

class ColorPaletteTileSize extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the color cell.
    * @param float $value
    * @return \Kendo\UI\ColorPaletteTileSize
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The height of the color cell.
    * @param float $value
    * @return \Kendo\UI\ColorPaletteTileSize
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

//<< Properties
}

?>
