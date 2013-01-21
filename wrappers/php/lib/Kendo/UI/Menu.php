<?php

namespace Kendo\UI;

class Menu extends \Kendo\UI\Widget {
    public function name() {
        return 'Menu';
    }
//>> Properties

    public function setAnimation(\Kendo\UI\MenuAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setCloseOnClick($value) {
        $this->setProperty('closeOnClick', $value);

        return $this;
    }

    public function setDirection($value) {
        $this->setProperty('direction', $value);

        return $this;
    }

    public function setHoverDelay($value) {
        $this->setProperty('hoverDelay', $value);

        return $this;
    }

    public function setOpenOnClick($value) {
        $this->setProperty('openOnClick', $value);

        return $this;
    }

    public function setOrientation($value) {
        $this->setProperty('orientation', $value);

        return $this;
    }

    public function setPopupCollision($value) {
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

    public function setClose($value) {
        $this->setProperty('close', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setOpen($value) {
        $this->setProperty('open', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
