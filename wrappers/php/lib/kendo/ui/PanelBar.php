<?php

namespace kendo\ui;

class PanelBar extends \kendo\ui\Widget {
    public function name() {
        return 'PanelBar';
    }
//>> Properties

    public function setAnimation($value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setAnimation(\kendo\ui\PanelBarAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setExpandMode($value) {
        $this->setProperty('expandMode', $value);

        return $this;
    }

    public function addItem(\kendo\ui\PanelBarItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setActivate($value) {
        $this->setProperty('activate', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setCollapse($value) {
        $this->setProperty('collapse', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setContentLoad($value) {
        $this->setProperty('contentLoad', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setError($value) {
        $this->setProperty('error', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setExpand($value) {
        $this->setProperty('expand', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
