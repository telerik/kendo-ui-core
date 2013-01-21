<?php

namespace Kendo\UI;

class Menu extends \Kendo\UI\Widget {
    public function name() {
        return 'Menu';
    }
//>> Properties

    public function animation(\Kendo\UI\MenuAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function closeOnClick($value) {
        $this->setProperty('closeOnClick', $value);

        return $this;
    }

    public function direction($value) {
        $this->setProperty('direction', $value);

        return $this;
    }

    public function hoverDelay($value) {
        $this->setProperty('hoverDelay', $value);

        return $this;
    }

    public function openOnClick($value) {
        $this->setProperty('openOnClick', $value);

        return $this;
    }

    public function orientation($value) {
        $this->setProperty('orientation', $value);

        return $this;
    }

    public function popupCollision($value) {
        $this->setProperty('popupCollision', $value);

        return $this;
    }

    public function addItem(\Kendo\UI\MenuItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function close($value) {
        $this->setProperty('close', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function open($value) {
        $this->setProperty('open', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
