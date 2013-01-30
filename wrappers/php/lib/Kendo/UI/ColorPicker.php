<?php

namespace Kendo\UI;

class ColorPicker extends \Kendo\UI\Widget {
    protected function name() {
        return 'ColorPicker';
    }
//>> Properties

    /**
    * Applicable only for the HSV selector (that is, when pallete is
null).  This specifies whether the "Apply" / "Cancel" buttons are to
be displayed in the drop-down HSV picker.
    * @param boolean $value
    * @return \Kendo\UI\ColorPicker
    */
    public function buttons($value) {
        return $this->setProperty('buttons', $value);
    }

    /**
    * The number of columns to show in the simple color dropdown.  For the
"basic" and "websafe" palettes this is automatically initialized; if
you pass a custom palette then you can set this to some value that
makes sense for your colors.
    * @param float $value
    * @return \Kendo\UI\ColorPicker
    */
    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    /**
    * The size (width and height) of a color cell for the Palette picker.
    * @param float $value
    * @return \Kendo\UI\ColorPicker
    */
    public function size($value) {
        return $this->setProperty('size', $value);
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
a simple color picker.  The following are supported:If palette is missing or null, the widget will display the HSV
selector.
    * @param string $value
    * @return \Kendo\UI\ColorPicker
    */
    public function palette($value) {
        return $this->setProperty('palette', $value);
    }

    /**
    * Only for the HSV selector.  If true, the widget will display the
opacity slider.  Note that currently in HTML5 the <input
type="color"> does not support opacity.
    * @param boolean $value
    * @return \Kendo\UI\ColorPicker
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * Only for the HSV selector.  Displays the color preview element, along
with an input field where the end user can paste a color in a
CSS-supported notation.
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
    * The initially selected color.  This can be a string supported by
parseColor or a Color object.  Note that when initializing the
widget from an <input> element, the initial color will be decided by the
field instead.
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

//<< Properties
}

?>
