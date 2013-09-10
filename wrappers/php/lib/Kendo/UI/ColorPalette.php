<?php

namespace Kendo\UI;

class ColorPalette extends \Kendo\UI\Widget {
    public function name() {
        return 'ColorPalette';
    }
//>> Properties

    /**
    * Specifies the color palette to display.
It can be a string with comma-separated colors in hex representation, an array of kendo.Color object objects or of strings that parseColor understands.  As a shortcut, you can pass "basic" to get the simple palette (this is the default) or "websafe" to get the Web-safe palette.
    * @param string|array $value
    * @return \Kendo\UI\ColorPalette
    */
    public function palette($value) {
        return $this->setProperty('palette', $value);
    }

    /**
    * The number of columns to display.  When you use the "websafe" palette, this will automatically default to 18.
    * @param float $value
    * @return \Kendo\UI\ColorPalette
    */
    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    /**
    * The size of a color cell.
    * @param float|\Kendo\UI\ColorPaletteTileSize|array $value
    * @return \Kendo\UI\ColorPalette
    */
    public function tileSize($value) {
        return $this->setProperty('tileSize', $value);
    }

    /**
    * Specifies the initially selected color.
    * @param string $value
    * @return \Kendo\UI\ColorPalette
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the ColorPalette.
    * Triggers when a new color has been changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ColorPalette
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }


//<< Properties
}

?>
