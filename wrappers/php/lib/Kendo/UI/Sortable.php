<?php

namespace Kendo\UI;

class Sortable extends \Kendo\UI\Widget {
    public function name() {
        return 'Sortable';
    }
//>> Properties

    /**
    * Constrains the hint movement to either the horizontal (x) or vertical (y) axis. Can be set to either "x" or "y".
    * @param string $value
    * @return \Kendo\UI\Sortable
    */
    public function axis($value) {
        return $this->setProperty('axis', $value);
    }

    /**
    * If set, specifies the offset of the hint relative to the mouse cursor/finger.
By default, the hint is initially positioned on top of the draggable source offset. The option accepts an object with two keys: top and left.
    * @param  $value
    * @return \Kendo\UI\Sortable
    */
    public function cursorOffset($value) {
        return $this->setProperty('cursorOffset', $value);
    }

    /**
    * Selector that determines which items are disabled. Disabled items cannot be dragged but are valid sort targets.
    * @param string $value
    * @return \Kendo\UI\Sortable
    */
    public function disabled($value) {
        return $this->setProperty('disabled', $value);
    }

    /**
    * Selector that determines which items are sortable. Filtered items cannot be dragged and are not valid sort targets.
    * @param string $value
    * @return \Kendo\UI\Sortable
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * Selector that determines which element will be used as a draggable handler. If a handler is defined, the user will be able to move the Sortable items only if the cursor/finger is positioned onto the handler element.
    * @param string $value
    * @return \Kendo\UI\Sortable
    */
    public function handler($value) {
        return $this->setProperty('handler', $value);
    }

    /**
    * Sets the hint option of the Sortable.
    * Provides a way for customization of the sortable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If hint function is not provided the widget will clone dragged item and use it as a hint.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Sortable
    */
    public function hint($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('hint', $value);
    }

    /**
    * Suitable for touch oriented user interface, in order to avoid collision with the touch scrolling gesture. When set to true, the item will be activated after the user taps and holds the finger on the element for a short amount of time.
The item will also be activated by pressing, holding and lifting the finger without any movement. Dragging it afterwards will initiate the drag immediately.
    * @param boolean $value
    * @return \Kendo\UI\Sortable
    */
    public function holdToDrag($value) {
        return $this->setProperty('holdToDrag', $value);
    }

    /**
    * Sets the placeholder option of the Sortable.
    * Provides a way for customization of the sortable item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Sortable
    */
    public function placeholder($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('placeholder', $value);
    }

    /**
    * Sets the start event of the Sortable.
    * Fires when sortable item drag starts.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Sortable
    */
    public function start($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('start', $value);
    }

    /**
    * Sets the move event of the Sortable.
    * Fires when Sortable's placeholder changes its position.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Sortable
    */
    public function move($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('move', $value);
    }

    /**
    * Sets the end event of the Sortable.
    * Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Sortable
    */
    public function end($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('end', $value);
    }

    /**
    * Sets the change event of the Sortable.
    * Fires when item is sorted and the item's position is changed in the DOM.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Sortable
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the cancel event of the Sortable.
    * Fires when item sorting is canceled by pressing the Escape key.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Sortable
    */
    public function cancel($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('cancel', $value);
    }


//<< Properties
}

?>
