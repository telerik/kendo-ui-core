<?php

namespace Kendo\UI;

class Menu extends \Kendo\UI\Widget {
    public function name() {
        return 'Menu';
    }
//>> Properties

    public function animation(\Kendo\UI\MenuAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    public function closeOnClick($value) {
        return $this->setProperty('closeOnClick', $value);
    }

    public function direction($value) {
        return $this->setProperty('direction', $value);
    }

    public function hoverDelay($value) {
        return $this->setProperty('hoverDelay', $value);
    }

    public function openOnClick($value) {
        return $this->setProperty('openOnClick', $value);
    }

    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    public function popupCollision($value) {
        return $this->setProperty('popupCollision', $value);
    }

    public function addItem(\Kendo\UI\MenuItem $value) {
        return $this->add('items', $value);
    }

    public function close($value) {
        return $this->setProperty('close', new \Kendo\JavaScriptFunction($value));
    }

    public function open($value) {
        return $this->setProperty('open', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
