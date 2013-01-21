<?php

namespace Kendo\UI;

class GridColumn extends \Kendo\SerializableObject {
//>> Properties

    public function attributes($value) {
        return $this->setProperty('attributes', $value);
    }

    public function command($value) {
        return $this->setProperty('command', $value);
    }

    public function editor($value) {
        return $this->setProperty('editor', new \Kendo\JavaScriptFunction($value));
    }

    public function encoded($value) {
        return $this->setProperty('encoded', $value);
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    public function format($value) {
        return $this->setProperty('format', $value);
    }

    public function headerAttributes($value) {
        return $this->setProperty('headerAttributes', $value);
    }

    public function headerTemplate($value) {
        return $this->setProperty('headerTemplate', $value);
    }

    public function hidden($value) {
        return $this->setProperty('hidden', $value);
    }

    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function aggregates($value) {
        return $this->setProperty('aggregates', $value);
    }

    public function groupHeaderTemplate($value) {
        return $this->setProperty('groupHeaderTemplate', $value);
    }

    public function groupFooterTemplate($value) {
        return $this->setProperty('groupFooterTemplate', $value);
    }

    public function footerTemplate($value) {
        return $this->setProperty('footerTemplate', $value);
    }

    public function title($value) {
        return $this->setProperty('title', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

    public function menu($value) {
        return $this->setProperty('menu', $value);
    }

//<< Properties
}

?>
