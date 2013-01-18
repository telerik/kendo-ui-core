<?php

namespace kendo\ui;

class Grid extends \kendo\ui\Widget {
    public function name() {
        return 'Grid';
    }
//>> Properties

    public function setAutoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function addColumn(\kendo\ui\GridColumn $value) {
        $values = $this->getProperty('columns');

        if ($values == null) {
            $values = array();
            $this->setProperty('columns', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setColumnMenu($value) {
        $this->setProperty('columnMenu', $value);

        return $this;
    }

    public function setColumnMenu(\kendo\ui\GridColumnMenu $value) {
        $this->setProperty('columnMenu', $value);

        return $this;
    }

    public function setDataSource(\kendo\data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setEditable($value) {
        $this->setProperty('editable', $value);

        return $this;
    }

    public function setEditable(\kendo\ui\GridEditable $value) {
        $this->setProperty('editable', $value);

        return $this;
    }

    public function setFilterable($value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function setFilterable(\kendo\ui\GridFilterable $value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function setReorderable($value) {
        $this->setProperty('reorderable', $value);

        return $this;
    }

    public function setResizable($value) {
        $this->setProperty('resizable', $value);

        return $this;
    }

    public function setGroupable($value) {
        $this->setProperty('groupable', $value);

        return $this;
    }

    public function setGroupable(\kendo\ui\GridGroupable $value) {
        $this->setProperty('groupable', $value);

        return $this;
    }

    public function setHeight($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function setNavigatable($value) {
        $this->setProperty('navigatable', $value);

        return $this;
    }

    public function setPageable($value) {
        $this->setProperty('pageable', $value);

        return $this;
    }

    public function setPageable(\kendo\ui\GridPageable $value) {
        $this->setProperty('pageable', $value);

        return $this;
    }

    public function setScrollable($value) {
        $this->setProperty('scrollable', $value);

        return $this;
    }

    public function setScrollable(\kendo\ui\GridScrollable $value) {
        $this->setProperty('scrollable', $value);

        return $this;
    }

    public function setSelectable($value) {
        $this->setProperty('selectable', $value);

        return $this;
    }

    public function setSortable($value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function setSortable(\kendo\ui\GridSortable $value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function addToolbarItem(\kendo\ui\GridToolbarItem $value) {
        $values = $this->getProperty('toolbar');

        if ($values == null) {
            $values = array();
            $this->setProperty('toolbar', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setDetailTemplate($value) {
        $this->setProperty('detailTemplate', $value);

        return $this;
    }

    public function setRowTemplate($value) {
        $this->setProperty('rowTemplate', $value);

        return $this;
    }

    public function setAltRowTemplate($value) {
        $this->setProperty('altRowTemplate', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnHide($value) {
        $this->setProperty('columnHide', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnReorder($value) {
        $this->setProperty('columnReorder', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnResize($value) {
        $this->setProperty('columnResize', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnShow($value) {
        $this->setProperty('columnShow', new \kendo\JavaScriptFunction($value));

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

    public function setDetailCollapse($value) {
        $this->setProperty('detailCollapse', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDetailExpand($value) {
        $this->setProperty('detailExpand', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDetailInit($value) {
        $this->setProperty('detailInit', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setEdit($value) {
        $this->setProperty('edit', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setFilterMenuInit($value) {
        $this->setProperty('filterMenuInit', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnMenuInit($value) {
        $this->setProperty('columnMenuInit', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRemove($value) {
        $this->setProperty('remove', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSave($value) {
        $this->setProperty('save', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSaveChanges($value) {
        $this->setProperty('saveChanges', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
