<?php

namespace Kendo\UI;

class MaskedTextBox extends \Kendo\UI\Widget {
    protected function name() {
        return 'MaskedTextBox';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('input', true);
    }
//>> Properties

    /**
    * Specifies whether the widget will replace the prompt characters with spaces on blur. Prompt chars will be shown again on focus.
    * @param boolean $value
    * @return \Kendo\UI\MaskedTextBox
    */
    public function clearPromptChar($value) {
        return $this->setProperty('clearPromptChar', $value);
    }

    /**
    * Specifies the culture info used by the widget.
    * @param string $value
    * @return \Kendo\UI\MaskedTextBox
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Specifies the input mask. The following mask rules are supported:
    * @param string $value
    * @return \Kendo\UI\MaskedTextBox
    */
    public function mask($value) {
        return $this->setProperty('mask', $value);
    }

    /**
    * Specifies the character used to represent the absence of user input in the widget
    * @param string $value
    * @return \Kendo\UI\MaskedTextBox
    */
    public function promptChar($value) {
        return $this->setProperty('promptChar', $value);
    }

    /**
    * Defines an object of custom mask rules.
    * @param  $value
    * @return \Kendo\UI\MaskedTextBox
    */
    public function rules($value) {
        return $this->setProperty('rules', $value);
    }

    /**
    * Specifies the value of the MaskedTextBox widget.
    * @param string $value
    * @return \Kendo\UI\MaskedTextBox
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the MaskedTextBox.
    * Fires when the value is changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\MaskedTextBox
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
