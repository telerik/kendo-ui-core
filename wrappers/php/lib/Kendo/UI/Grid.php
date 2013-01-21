<?php

namespace Kendo\UI;

class Grid extends \Kendo\UI\Widget {
    public function name() {
        return 'Grid';
    }
//>> Properties

    public function autoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function addColumn(\Kendo\UI\GridColumn $value) {
        $values = $this->getProperty('columns');

        if ($values == null) {
            $values = array();
            $this->setProperty('columns', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function columnMenu(\Kendo\UI\GridColumnMenu $value) {
        $this->setProperty('columnMenu', $value);

        return $this;
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function editable(\Kendo\UI\GridEditable $value) {
        $this->setProperty('editable', $value);

        return $this;
    }

    public function filterable(\Kendo\UI\GridFilterable $value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function reorderable($value) {
        $this->setProperty('reorderable', $value);

        return $this;
    }

    public function resizable($value) {
        $this->setProperty('resizable', $value);

        return $this;
    }

    public function groupable(\Kendo\UI\GridGroupable $value) {
        $this->setProperty('groupable', $value);

        return $this;
    }

    public function height($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function navigatable($value) {
        $this->setProperty('navigatable', $value);

        return $this;
    }

    public function pageable(\Kendo\UI\GridPageable $value) {
        $this->setProperty('pageable', $value);

        return $this;
    }

    public function scrollable(\Kendo\UI\GridScrollable $value) {
        $this->setProperty('scrollable', $value);

        return $this;
    }

    public function selectable($value) {
        $this->setProperty('selectable', $value);

        return $this;
    }

    public function sortable(\Kendo\UI\GridSortable $value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function addToolbarItem(\Kendo\UI\GridToolbarItem $value) {
        $values = $this->getProperty('toolbar');

        if ($values == null) {
            $values = array();
            $this->setProperty('toolbar', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function detailTemplate($value) {
        $this->setProperty('detailTemplate', $value);

        return $this;
    }

    public function rowTemplate($value) {
        $this->setProperty('rowTemplate', $value);

        return $this;
    }

    public function altRowTemplate($value) {
        $this->setProperty('altRowTemplate', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function columnHide($value) {
        $this->setProperty('columnHide', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function columnReorder($value) {
        $this->setProperty('columnReorder', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function columnResize($value) {
        $this->setProperty('columnResize', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function columnShow($value) {
        $this->setProperty('columnShow', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dataBinding($value) {
        $this->setProperty('dataBinding', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function detailCollapse($value) {
        $this->setProperty('detailCollapse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function detailExpand($value) {
        $this->setProperty('detailExpand', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function detailInit($value) {
        $this->setProperty('detailInit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function edit($value) {
        $this->setProperty('edit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function filterMenuInit($value) {
        $this->setProperty('filterMenuInit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function columnMenuInit($value) {
        $this->setProperty('columnMenuInit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function remove($value) {
        $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function save($value) {
        $this->setProperty('save', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function saveChanges($value) {
        $this->setProperty('saveChanges', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
