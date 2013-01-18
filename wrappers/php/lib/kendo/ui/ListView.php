<?php

namespace kendo\ui;

class ListView extends \kendo\ui\Widget {
    public function name() {
        return 'ListView';
    }
//>> Properties

    public function setAutoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function setDataSource(\kendo\data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setNavigatable($value) {
        $this->setProperty('navigatable', $value);

        return $this;
    }

    public function setSelectable($value) {
        $this->setProperty('selectable', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function setEditTemplate($value) {
        $this->setProperty('editTemplate', $value);

        return $this;
    }

    public function setAltTemplate($value) {
        $this->setProperty('altTemplate', $value);

        return $this;
    }

    public function setPageable($value) {
        $this->setProperty('pageable', $value);

        return $this;
    }

    public function setTagName($value) {
        $this->setProperty('tagName', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBinding($value) {
        $this->setProperty('dataBinding', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setEdit($value) {
        $this->setProperty('edit', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRemove($value) {
        $this->setProperty('remove', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
