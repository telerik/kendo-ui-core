<?php

namespace Kendo\UI;

class Pager extends \Kendo\UI\Widget {
    public function name() {
        return 'Pager';
    }
//>> Properties

    public function autoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function buttonCount($value) {
        $this->setProperty('buttonCount', $value);

        return $this;
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function selectTemplate($value) {
        $this->setProperty('selectTemplate', $value);

        return $this;
    }

    public function linkTemplate($value) {
        $this->setProperty('linkTemplate', $value);

        return $this;
    }

    public function info($value) {
        $this->setProperty('info', $value);

        return $this;
    }

    public function input($value) {
        $this->setProperty('input', $value);

        return $this;
    }

    public function numeric($value) {
        $this->setProperty('numeric', $value);

        return $this;
    }

    public function pageSizes($value) {
        $this->setProperty('pageSizes', $value);

        return $this;
    }

    public function previousNext($value) {
        $this->setProperty('previousNext', $value);

        return $this;
    }

    public function refresh($value) {
        $this->setProperty('refresh', $value);

        return $this;
    }

    public function messages(\Kendo\UI\PagerMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
