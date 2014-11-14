<?php

namespace Kendo\UI;

class TreeListMessagesCommands extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the text of "Edit" button that shows the editable fields for the row.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function edit($value) {
        return $this->setProperty('edit', $value);
    }

    /**
    * Defines the text of "Update" button that applies the changes during editing.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

    /**
    * Defines the text of "Cancel" button that discards the changes during editing.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function canceledit($value) {
        return $this->setProperty('canceledit', $value);
    }

    /**
    * Defines the text of "Add new record" button that adds new data rows.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

    /**
    * Defines the text of "Add child record" button that adds new child data rows.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function createchild($value) {
        return $this->setProperty('createchild', $value);
    }

    /**
    * Defines the text of "Delete" button that deletes a data row.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Defines the text of "Export to Excel" button that exports the widget data in spreadsheet format.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function excel($value) {
        return $this->setProperty('excel', $value);
    }

    /**
    * Defines the text of "Export to PDF" button that exports the widget data in PDF format.
    * @param string $value
    * @return \Kendo\UI\TreeListMessagesCommands
    */
    public function pdf($value) {
        return $this->setProperty('pdf', $value);
    }

//<< Properties
}

?>
