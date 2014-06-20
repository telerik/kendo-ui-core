<?php

namespace Kendo\UI;

class ToolBar extends \Kendo\UI\Widget {
    public function name() {
        return 'ToolBar';
    }
//>> Properties

    /**
    * If resizable is set to true the widget will detect changes in the viewport width and hides the overflowing controls in the command overflow popup.
    * @param boolean $value
    * @return \Kendo\UI\ToolBar
    */
    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    /**
    * Adds ToolBarItem to the ToolBar.
    * @param \Kendo\UI\ToolBarItem|array,... $value one or more ToolBarItem to add.
    * @return \Kendo\UI\ToolBar
    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }

    /**
    * Sets the click event of the ToolBar.
    * Fires when the user clicks a command button.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBar
    */
    public function click($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('click', $value);
    }

    /**
    * Sets the close event of the ToolBar.
    * Fires when the SplitButton's popup closes.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBar
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the open event of the ToolBar.
    * Fires when the Split Button's popup opens.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBar
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the toggle event of the ToolBar.
    * Fires when the user changes the checked state of a toggle button.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBar
    */
    public function toggle($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('toggle', $value);
    }

    /**
    * Sets the overflowClose event of the ToolBar.
    * Fires when the overflow popup container is about to close.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBar
    */
    public function overflowClose($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('overflowClose', $value);
    }

    /**
    * Sets the overflowOpen event of the ToolBar.
    * Fires when the overflow popup container is about to open.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBar
    */
    public function overflowOpen($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('overflowOpen', $value);
    }


//<< Properties
}

?>
