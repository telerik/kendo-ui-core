<?php

namespace Kendo\UI;

class ComboBox extends \Kendo\UI\Widget {
    public function name() {
        return 'ComboBox';
    }
//>> Properties

    public function animation(\Kendo\UI\ComboBoxAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    public function cascadeFrom($value) {
        return $this->setProperty('cascadeFrom', $value);
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

    public function delay($value) {
        return $this->setProperty('delay', $value);
    }

    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    public function height($value) {
        return $this->setProperty('height', $value);
    }

    public function highlightFirst($value) {
        return $this->setProperty('highlightFirst', $value);
    }

    public function ignoreCase($value) {
        return $this->setProperty('ignoreCase', $value);
    }

    public function index($value) {
        return $this->setProperty('index', $value);
    }

    public function minLength($value) {
        return $this->setProperty('minLength', $value);
    }

    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    public function suggest($value) {
        return $this->setProperty('suggest', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function text($value) {
        return $this->setProperty('text', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function close($value) {
        return $this->setProperty('close', new \Kendo\JavaScriptFunction($value));
    }

    public function dataBound($value) {
        return $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));
    }

    public function open($value) {
        return $this->setProperty('open', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

    public function cascade($value) {
        return $this->setProperty('cascade', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
