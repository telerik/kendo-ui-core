<?php

namespace Kendo\UI;

class ContextMenu extends \Kendo\UI\Widget {
    protected $ignore = array('items');

    public function name() {
        return 'ContextMenu';
    }

    protected function createElement() {
        $items = $this->getProperty('items');

        $element = new \Kendo\Html\Element('ul');
        if ($items) {
            foreach ($items as $item) {
                $element->append($item->createElement());
            }
        }

        return $element;
    }

//>> Properties

    /**
    * Specifies that ContextMenu should be shown aligned to the target or the filter element if specified.
    * @param boolean $value
    * @return \Kendo\UI\ContextMenu
    */
    public function alignToAnchor($value) {
        return $this->setProperty('alignToAnchor', $value);
    }

    /**
    * A collection of Animation objects, used to change default animations. A value of false will disable all animations in the widget.Available animations for the ContextMenu are listed below.  Each animation has a reverse options which is used for the close effect by default, but can be over-ridden
by setting the close animation. Each animation also has a direction which can be set off the animation (i.e. slideIn:Down).
    * @param \Kendo\UI\ContextMenuAnimation|array $value
    * @return \Kendo\UI\ContextMenu
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Specifies that sub menus should close after item selection (provided they won't navigate).
    * @param boolean $value
    * @return \Kendo\UI\ContextMenu
    */
    public function closeOnClick($value) {
        return $this->setProperty('closeOnClick', $value);
    }

    /**
    * The data source of the widget which is used to render its items. Can be a JSON object/Array that contains an item or an Array of items to be rendered.
Refer to the example below for a list of the supported properties.
    * @param |array $value
    * @return \Kendo\UI\ContextMenu
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Specifies ContextMenu sub menu opening direction. Can be "top", "bottom", "left", "right".
The example below will initialize the sub menus to open to the left.
    * @param string $value
    * @return \Kendo\UI\ContextMenu
    */
    public function direction($value) {
        return $this->setProperty('direction', $value);
    }

    /**
    * Specifies ContextMenu filter selector - the ContextMenu will only be shown on items that satisfy the provided selector.
    * @param string $value
    * @return \Kendo\UI\ContextMenu
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * Specifies the delay in ms before the sub menus are opened/closed - used to avoid accidental closure on leaving.
    * @param float $value
    * @return \Kendo\UI\ContextMenu
    */
    public function hoverDelay($value) {
        return $this->setProperty('hoverDelay', $value);
    }

    /**
    * Root menu orientation. Could be horizontal or vertical.
    * @param string $value
    * @return \Kendo\UI\ContextMenu
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    /**
    * Specifies how ContextMenu should adjust to screen boundaries. By default the strategy is "fit" for a sub menu with a horizontal parent or the root menu,
meaning it will move to fit in screen boundaries in all directions, and "fit flip" for a sub menu with vertical parent, meaning it will fit vertically and flip over
its parent horizontally. You can also switch off the screen boundary detection completely if you set the popupCollision to false.
    * @param string $value
    * @return \Kendo\UI\ContextMenu
    */
    public function popupCollision($value) {
        return $this->setProperty('popupCollision', $value);
    }

    /**
    * Specifies the event or events on which ContextMenu should open. By default ContextMenu will show on contextmenu event on desktop and hold event on touch devices.
Could be any pointer/mouse/touch event, also several, separated by spaces.
    * @param string $value
    * @return \Kendo\UI\ContextMenu
    */
    public function showOn($value) {
        return $this->setProperty('showOn', $value);
    }

    /**
    * Specifies the element on which ContextMenu should open. The default element is the document body.
    * @param string| $value
    * @return \Kendo\UI\ContextMenu
    */
    public function target($value) {
        return $this->setProperty('target', $value);
    }

    /**
    * Adds ContextMenuItem to the ContextMenu.
    * @param \Kendo\UI\ContextMenuItem|array,... $value one or more ContextMenuItem to add.
    * @return \Kendo\UI\ContextMenu
    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }

    /**
    * Sets the close event of the ContextMenu.
    * Fires before a sub menu or the ContextMenu gets closed. You can cancel this event to prevent closure.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ContextMenu
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the open event of the ContextMenu.
    * Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ContextMenu
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the activate event of the ContextMenu.
    * Fires when a sub menu or the ContextMenu gets opened and its animation finished.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ContextMenu
    */
    public function activate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('activate', $value);
    }

    /**
    * Sets the deactivate event of the ContextMenu.
    * Fires when a sub menu or the ContextMenu gets closed and its animation finished.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ContextMenu
    */
    public function deactivate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('deactivate', $value);
    }

    /**
    * Sets the select event of the ContextMenu.
    * Fires when a menu item gets selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ContextMenu
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
