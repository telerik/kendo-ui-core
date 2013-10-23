<?php

namespace Kendo\UI;

class ProgressBar extends \Kendo\UI\Widget {
    public function name() {
        return 'ProgressBar';
    }
//>> Properties

    /**
    * Configures the progress animation. Currently only the duration of the animation could be set.
    * @param \Kendo\UI\ProgressBarAnimation|array $value
    * @return \Kendo\UI\ProgressBar
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Specifies the number of chunks.
    * @param float $value
    * @return \Kendo\UI\ProgressBar
    */
    public function chunkCount($value) {
        return $this->setProperty('chunkCount', $value);
    }

    /**
    * If set to false the widget will be disabled. It will still allow changing the value. The widget is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\ProgressBar
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * The maximum value of the ProgressBar.
    * @param float $value
    * @return \Kendo\UI\ProgressBar
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the ProgressBar.
    * @param float $value
    * @return \Kendo\UI\ProgressBar
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The orientation of the ProgressBar. Possible values are horizontal and vertical.
    * @param string $value
    * @return \Kendo\UI\ProgressBar
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    /**
    * Specifies if the progress direction will be reversed.
    * @param boolean $value
    * @return \Kendo\UI\ProgressBar
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * Specifies if the progress status will be shown.
    * @param boolean $value
    * @return \Kendo\UI\ProgressBar
    */
    public function showStatus($value) {
        return $this->setProperty('showStatus', $value);
    }

    /**
    * Specifies the type of the ProgressBar. The supported types are value, percent and chunk.
    * @param string $value
    * @return \Kendo\UI\ProgressBar
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The underlying value of the ProgressBar.
    * @param float $value
    * @return \Kendo\UI\ProgressBar
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the ProgressBar.
    * Fired when the value of the ProgressBar has changed. If the progress animation is enabled, the event will be fired after the animation has completed (does not applies to chunk ProgressBar).
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ProgressBar
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the complete event of the ProgressBar.
    * Fired when the value of the ProgressBar reaches the maximum value.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ProgressBar
    */
    public function complete($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('complete', $value);
    }


//<< Properties
}

?>
