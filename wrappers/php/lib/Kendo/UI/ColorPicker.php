<?php

namespace Kendo\UI;

class ColorPicker extends \Kendo\UI\Widget {
    protected function name() {
        return 'ColorPicker';
    }

    protected function createElement() {
        $input = new \Kendo\Html\Element('input', true);

        $value = $this->getProperty('value');

        $input->attr('type', 'color');

        if (isset($value)) {
            $input->attr('value', $value);
        }

        return $input;
    }
//>> Properties

    /**
    * Specifies whether the widget should display the Apply / Cancel buttons.Applicable only for the HSV selector, when a pallete is not specified.
    * @param boolean $value
    * @return \Kendo\UI\ColorPicker
    */
    public function buttons($value) {
        return $this->setProperty('buttons', $value);
    }

    /**
    * The number of columns to show in the color dropdown when a pallete is specified.
This is automatically initialized for the "basic" and "websafe" palettes.
If you use a custom palette then you can set this to some value that makes sense for your colors.
    * @param float $value
    * @return \Kendo\UI\ColorPicker
    */
    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    /**
    * The size of a color cell.
    * @param float|\Kendo\UI\ColorPickerTileSize|array $value
    * @return \Kendo\UI\ColorPicker
    */
    public function tileSize($value) {
        return $this->setProperty('tileSize', $value);
    }

    /**
    * Allows customization of "Apply" / "Cancel" labels.
    * @param  $value
    * @return \Kendo\UI\ColorPicker
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * When a non-null palette argument is supplied, the drop-down will be
a simple color picker that lists the colors. The following are supported:If palette is missing or null, the widget will display the HSV
selector.
    * @param string|array $value
    * @return \Kendo\UI\ColorPicker
    */
    public function palette($value) {
        return $this->setProperty('palette', $value);
    }

    /**
    * Only for the HSV selector.  If true, the widget will display the opacity slider.
Note that currently in HTML5 the <input type="color"> does not support opacity.
    * @param boolean $value
    * @return \Kendo\UI\ColorPicker
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * Only applicable for the HSV selector.Displays the color preview element, along with an input field where the end user can paste a color in a CSS-supported notation.
    * @param boolean $value
    * @return \Kendo\UI\ColorPicker
    */
    public function preview($value) {
        return $this->setProperty('preview', $value);
    }

    /**
    * A CSS class name to display an icon in the color picker button.  If
specified, the HTML for the element will look like this:
    * @param string $value
    * @return \Kendo\UI\ColorPicker
    */
    public function toolIcon($value) {
        return $this->setProperty('toolIcon', $value);
    }

    /**
    * The initially selected color.
Note that when initializing the widget from an <input> element, the initial color will be decided by the field instead.
    * @param string $value
    * @return \Kendo\UI\ColorPicker
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the ColorPicker.
    * Fires when a color was selected, either by clicking on it (in the
simple picker), by clicking ENTER or by pressing "Apply" in the HSV
picker.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ColorPicker
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the select event of the ColorPicker.
    * Fires as a new color is displayed in the drop-down picker.  This is
not necessarily the "final" value; for example this event triggers
when the sliders in the HSV selector are dragged, but then pressing
ESC would cancel the selection and the color will revert to the
original value.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ColorPicker
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the open event of the ColorPicker.
    * Fires when the picker popup is opening.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ColorPicker
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the close event of the ColorPicker.
    * Fires when the picker popup is closing.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ColorPicker
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }


//<< Properties
}

?>
