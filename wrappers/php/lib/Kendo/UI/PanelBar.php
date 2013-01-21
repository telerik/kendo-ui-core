<?php

namespace Kendo\UI;

class PanelBar extends \Kendo\UI\Widget {
    public function name() {
        return 'PanelBar';
    }
//>> Properties

    public function animation(\Kendo\UI\PanelBarAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function expandMode($value) {
        $this->setProperty('expandMode', $value);

        return $this;
    }

    public function addItem(\Kendo\UI\PanelBarItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function activate($value) {
        $this->setProperty('activate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function collapse($value) {
        $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function contentLoad($value) {
        $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function error($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function expand($value) {
        $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
