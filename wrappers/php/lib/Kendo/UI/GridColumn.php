<?php

namespace Kendo\UI;

class GridColumn extends \Kendo\SerializableObject {
//>> Properties

    public function attributes($value) {
        $this->setProperty('attributes', $value);

        return $this;
    }

    public function command($value) {
        $this->setProperty('command', $value);

        return $this;
    }

    public function addCommandItem(\Kendo\UI\GridColumnCommandItem $value) {
        $values = $this->getProperty('command');

        if ($values == null) {
            $values = array();
            $this->setProperty('command', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function editor($value) {
        $this->setProperty('editor', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function encoded($value) {
        $this->setProperty('encoded', $value);

        return $this;
    }

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function filterable($value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function filterable(\Kendo\UI\GridColumnFilterable $value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function format($value) {
        $this->setProperty('format', $value);

        return $this;
    }

    public function headerAttributes($value) {
        $this->setProperty('headerAttributes', $value);

        return $this;
    }

    public function headerTemplate($value) {
        $this->setProperty('headerTemplate', $value);

        return $this;
    }

    public function hidden($value) {
        $this->setProperty('hidden', $value);

        return $this;
    }

    public function sortable($value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function aggregates($value) {
        $this->setProperty('aggregates', $value);

        return $this;
    }

    public function groupHeaderTemplate($value) {
        $this->setProperty('groupHeaderTemplate', $value);

        return $this;
    }

    public function groupFooterTemplate($value) {
        $this->setProperty('groupFooterTemplate', $value);

        return $this;
    }

    public function footerTemplate($value) {
        $this->setProperty('footerTemplate', $value);

        return $this;
    }

    public function title($value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function width($value) {
        $this->setProperty('width', $value);

        return $this;
    }

    public function menu($value) {
        $this->setProperty('menu', $value);

        return $this;
    }

//<< Properties
}

?>
