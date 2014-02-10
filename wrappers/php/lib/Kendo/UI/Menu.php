<?php

namespace Kendo\UI;

class Menu extends \Kendo\UI\Widget {
    protected $ignore = array('items');

    protected function name() {
        return 'Menu';
    }

    protected function createElement() {
        $items = $this->getProperty('items');

        if ($items) {
            $element = new \Kendo\Html\Element('ul');
            foreach ($items as $item) {
                $element->append($item->createElement());
            }
        } else {
            $element = new \Kendo\Html\Element('div');
        }

        return $element;
    }

//>> Properties

    /**
    * A collection of Animation objects, used to change default animations. A value of false will disable all animations in the widget.Available animations for the Menu are listed below.  Each animation has a reverse options which is used for the close effect by default, but can be over-ridden
by setting the close animation.  Each animation also has a direction which can be set off the animation (i.e. slideIn:Down).
    * @param \Kendo\UI\MenuAnimation|array $value
    * @return \Kendo\UI\Menu
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Specifies that sub menus should close after item selection (provided they won't navigate).
    * @param boolean $value
    * @return \Kendo\UI\Menu
    */
    public function closeOnClick($value) {
        return $this->setProperty('closeOnClick', $value);
    }

    /**
    * The data source of the widget which is used to render its items. Can be a JSON object/Array that contains an item or an Array of items to be rendered.
Refer to the example below for a list of the supported properties.
    * @param |array $value
    * @return \Kendo\UI\Menu
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Specifies Menu opening direction. Can be "top", "bottom", "left", "right".
You can also specify different direction for root and sub menu items, separating them with space. The example below will initialize the root menu to open upwards and
its sub menus to the left.
    * @param string $value
    * @return \Kendo\UI\Menu
    */
    public function direction($value) {
        return $this->setProperty('direction', $value);
    }

    /**
    * Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.
    * @param float $value
    * @return \Kendo\UI\Menu
    */
    public function hoverDelay($value) {
        return $this->setProperty('hoverDelay', $value);
    }

    /**
    * Specifies that the root sub menus will be opened on item click.
    * @param boolean $value
    * @return \Kendo\UI\Menu
    */
    public function openOnClick($value) {
        return $this->setProperty('openOnClick', $value);
    }

    /**
    * Root menu orientation. Could be horizontal or vertical.
    * @param string $value
    * @return \Kendo\UI\Menu
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    /**
    * Specifies how Menu should adjust to screen boundaries. By default the strategy is "fit" for a sub menu with a horizontal parent,
meaning it will move to fit in screen boundaries in all directions, and "fit flip" for a sub menu with vertical parent, meaning it will fit vertically and flip over
its parent horizontally. You can also switch off the screen boundary detection completely if you set the popupCollision to false.
    * @param string $value
    * @return \Kendo\UI\Menu
    */
    public function popupCollision($value) {
        return $this->setProperty('popupCollision', $value);
    }

    /**
    * Adds MenuItem to the Menu.
    * @param \Kendo\UI\MenuItem|array,... $value one or more MenuItem to add.
    * @return \Kendo\UI\Menu
    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }

    /**
    * Sets the close event of the Menu.
    * Fires before a sub menu gets closed. You can cancel this event to prevent closure.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Menu
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the open event of the Menu.
    * Fires before a sub menu gets opened. You can cancel this event to prevent opening the sub menu.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Menu
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the activate event of the Menu.
    * Fires when a sub menu gets opened and its animation finished.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Menu
    */
    public function activate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('activate', $value);
    }

    /**
    * Sets the deactivate event of the Menu.
    * Fires when a sub menu gets closed and its animation finished.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Menu
    */
    public function deactivate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('deactivate', $value);
    }

    /**
    * Sets the select event of the Menu.
    * Fires when a menu item gets selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Menu
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
