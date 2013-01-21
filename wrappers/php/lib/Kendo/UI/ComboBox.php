<?php

namespace Kendo\UI;

class ComboBox extends \Kendo\UI\Widget {
    public function name() {
        return 'ComboBox';
    }
//>> Properties

    public function animation(\Kendo\UI\ComboBoxAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function autoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function cascadeFrom($value) {
        $this->setProperty('cascadeFrom', $value);

        return $this;
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function dataTextField($value) {
        $this->setProperty('dataTextField', $value);

        return $this;
    }

    public function dataValueField($value) {
        $this->setProperty('dataValueField', $value);

        return $this;
    }

    public function delay($value) {
        $this->setProperty('delay', $value);

        return $this;
    }

    public function enable($value) {
        $this->setProperty('enable', $value);

        return $this;
    }

    public function filter($value) {
        $this->setProperty('filter', $value);

        return $this;
    }

    public function height($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function highlightFirst($value) {
        $this->setProperty('highlightFirst', $value);

        return $this;
    }

    public function ignoreCase($value) {
        $this->setProperty('ignoreCase', $value);

        return $this;
    }

    public function index($value) {
        $this->setProperty('index', $value);

        return $this;
    }

    public function minLength($value) {
        $this->setProperty('minLength', $value);

        return $this;
    }

    public function placeholder($value) {
        $this->setProperty('placeholder', $value);

        return $this;
    }

    public function suggest($value) {
        $this->setProperty('suggest', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function text($value) {
        $this->setProperty('text', $value);

        return $this;
    }

    public function value($value) {
        $this->setProperty('value', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function close($value) {
        $this->setProperty('close', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

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

    public function cascade($value) {
        $this->setProperty('cascade', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
