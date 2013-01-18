<?php

namespace kendo\ui;

class Pager extends \kendo\ui\Widget {
    public function name() {
        return 'Pager';
    }
//>> Properties

    public function setAutoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function setButtonCount($value) {
        $this->setProperty('buttonCount', $value);

        return $this;
    }

    public function setDataSource(\kendo\data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setSelectTemplate($value) {
        $this->setProperty('selectTemplate', $value);

        return $this;
    }

    public function setLinkTemplate($value) {
        $this->setProperty('linkTemplate', $value);

        return $this;
    }

    public function setInfo($value) {
        $this->setProperty('info', $value);

        return $this;
    }

    public function setInput($value) {
        $this->setProperty('input', $value);

        return $this;
    }

    public function setNumeric($value) {
        $this->setProperty('numeric', $value);

        return $this;
    }

    public function setPageSizes($value) {
        $this->setProperty('pageSizes', $value);

        return $this;
    }

    public function setPreviousNext($value) {
        $this->setProperty('previousNext', $value);

        return $this;
    }

    public function setRefresh($value) {
        $this->setProperty('refresh', $value);

        return $this;
    }

    public function setMessages(\kendo\ui\PagerMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
