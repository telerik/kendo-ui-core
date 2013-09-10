<?php

namespace Kendo\UI;

class FlatColorPicker extends \Kendo\UI\Widget {
    public function name() {
        return 'FlatColorPicker';
    }
//>> Properties

    /**
    * Specifies whether we should display the opacity slider to allow
selection of transparency.
    * @param boolean $value
    * @return \Kendo\UI\FlatColorPicker
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * Specifies whether the widget should display the Apply / Cancel buttons.
    * @param boolean $value
    * @return \Kendo\UI\FlatColorPicker
    */
    public function buttons($value) {
        return $this->setProperty('buttons', $value);
    }

    /**
    * Specifies the initially selected color.
    * @param string $value
    * @return \Kendo\UI\FlatColorPicker
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Specifies whether we should display the preview bar which displays the
current color and the input field.
    * @param boolean $value
    * @return \Kendo\UI\FlatColorPicker
    */
    public function preview($value) {
        return $this->setProperty('preview', $value);
    }

    /**
    * Specifies whether the UI should be updated while the user is typing in
the input field, whenever a valid color can be parsed.  If you pass
false for this, the widget will update only when ENTER is pressed.
    * @param boolean $value
    * @return \Kendo\UI\FlatColorPicker
    */
    public function autoupdate($value) {
        return $this->setProperty('autoupdate', $value);
    }

    /**
    * Allows customization of "Apply" / "Cancel" labels.
    * @param  $value
    * @return \Kendo\UI\FlatColorPicker
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * Sets the change event of the FlatColorPicker.
    * Triggers when a new color has been selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\FlatColorPicker
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
