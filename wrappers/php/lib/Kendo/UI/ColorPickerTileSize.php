<?php

namespace Kendo\UI;

class ColorPickerTileSize extends \kendo\SerializableObject {
//>> Properties

    /**
    * The width of the color cell.
    * @param float $value
    * @return \Kendo\UI\ColorPickerTileSize
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The height of the color cell.
    * @param float $value
    * @return \Kendo\UI\ColorPickerTileSize
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

//<< Properties
}

?>
