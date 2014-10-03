<?php

namespace Kendo\UI;

class EditorMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The title of the tool that makes text bold.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function bold($value) {
        return $this->setProperty('bold', $value);
    }

    /**
    * The title of the tool that makes text italicized.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function italic($value) {
        return $this->setProperty('italic', $value);
    }

    /**
    * The title of the tool that underlines text.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function underline($value) {
        return $this->setProperty('underline', $value);
    }

    /**
    * The title of the tool that strikes through text.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function strikethrough($value) {
        return $this->setProperty('strikethrough', $value);
    }

    /**
    * The title of the tool that makes text superscript.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function superscript($value) {
        return $this->setProperty('superscript', $value);
    }

    /**
    * The title of the tool that makes text subscript.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function subscript($value) {
        return $this->setProperty('subscript', $value);
    }

    /**
    * The title of the tool that aligns text in the center.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function justifyCenter($value) {
        return $this->setProperty('justifyCenter', $value);
    }

    /**
    * The title of the tool that aligns text on the left.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function justifyLeft($value) {
        return $this->setProperty('justifyLeft', $value);
    }

    /**
    * The title of the tool that aligns text on the right.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function justifyRight($value) {
        return $this->setProperty('justifyRight', $value);
    }

    /**
    * The title of the tool that justifies text both left and right.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function justifyFull($value) {
        return $this->setProperty('justifyFull', $value);
    }

    /**
    * The title of the tool that inserts an unordered list.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function insertUnorderedList($value) {
        return $this->setProperty('insertUnorderedList', $value);
    }

    /**
    * The title of the tool that inserts an ordered list.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function insertOrderedList($value) {
        return $this->setProperty('insertOrderedList', $value);
    }

    /**
    * The title of the tool that indents the content.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function indent($value) {
        return $this->setProperty('indent', $value);
    }

    /**
    * The title of the tool that outdents the content.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function outdent($value) {
        return $this->setProperty('outdent', $value);
    }

    /**
    * The title of the tool that creates hyperlinks.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function createLink($value) {
        return $this->setProperty('createLink', $value);
    }

    /**
    * The title of the tool that removes hyperlinks.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function unlink($value) {
        return $this->setProperty('unlink', $value);
    }

    /**
    * The title of the tool that inserts images.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function insertImage($value) {
        return $this->setProperty('insertImage', $value);
    }

    /**
    * The title of the tool that inserts links to files.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function insertFile($value) {
        return $this->setProperty('insertFile', $value);
    }

    /**
    * The title of the tool that inserts HTML snippets.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function insertHtml($value) {
        return $this->setProperty('insertHtml', $value);
    }

    /**
    * The title of the tool that shows the editor value as HTML.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function viewHtml($value) {
        return $this->setProperty('viewHtml', $value);
    }

    /**
    * The title of the tool that changes the text font.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function fontName($value) {
        return $this->setProperty('fontName', $value);
    }

    /**
    * The text that is shown when the text font will be inherited from the surrounding page.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function fontNameInherit($value) {
        return $this->setProperty('fontNameInherit', $value);
    }

    /**
    * The title of the tool that changes the text size.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function fontSize($value) {
        return $this->setProperty('fontSize', $value);
    }

    /**
    * The text that is shown when the text size will be inherited from the surrounding page.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function fontSizeInherit($value) {
        return $this->setProperty('fontSizeInherit', $value);
    }

    /**
    * The title of the tool that lets users choose block formats. Deprecated.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function formatBlock($value) {
        return $this->setProperty('formatBlock', $value);
    }

    /**
    * The title of the tool that lets users choose block formats.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function formatting($value) {
        return $this->setProperty('formatting', $value);
    }

    /**
    * The title of the tool that changes the text color.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function foreColor($value) {
        return $this->setProperty('foreColor', $value);
    }

    /**
    * The title of the tool that changes the text background color.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function backColor($value) {
        return $this->setProperty('backColor', $value);
    }

    /**
    * The title of the tool that applies styling to elements. Deprecated.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

    /**
    * The message shown in the file- or imageBrowser when a folder is empty.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function emptyFolder($value) {
        return $this->setProperty('emptyFolder', $value);
    }

    /**
    * The caption of the upload button in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function uploadFile($value) {
        return $this->setProperty('uploadFile', $value);
    }

    /**
    * The caption of the sorting order in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function orderBy($value) {
        return $this->setProperty('orderBy', $value);
    }

    /**
    * The sorting order by size in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function orderBySize($value) {
        return $this->setProperty('orderBySize', $value);
    }

    /**
    * The sorting order by name in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function orderByName($value) {
        return $this->setProperty('orderByName', $value);
    }

    /**
    * The error message shown when an invalid file type has been selected in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function invalidFileType($value) {
        return $this->setProperty('invalidFileType', $value);
    }

    /**
    * The confirmation message shown when deleting files in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function deleteFile($value) {
        return $this->setProperty('deleteFile', $value);
    }

    /**
    * The confirmation message shown when overwriting files in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function overwriteFile($value) {
        return $this->setProperty('overwriteFile', $value);
    }

    /**
    * The error message shown when the target directory is not found in the file- or imageBrowser.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function directoryNotFound($value) {
        return $this->setProperty('directoryNotFound', $value);
    }

    /**
    * The caption for the image URL in the insertImage dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function imageWebAddress($value) {
        return $this->setProperty('imageWebAddress', $value);
    }

    /**
    * The caption for the image alternate text in the insertImage dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function imageAltText($value) {
        return $this->setProperty('imageAltText', $value);
    }

    /**
    * The caption for the image width in the insertImage dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function imageWidth($value) {
        return $this->setProperty('imageWidth', $value);
    }

    /**
    * The caption for the image height in the insertImage dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function imageHeight($value) {
        return $this->setProperty('imageHeight', $value);
    }

    /**
    * The caption for the file URL in the insertFile dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function fileWebAddress($value) {
        return $this->setProperty('fileWebAddress', $value);
    }

    /**
    * The caption for the file title in the insertFile dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function fileTitle($value) {
        return $this->setProperty('fileTitle', $value);
    }

    /**
    * The caption for the URL in the createLink dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function linkWebAddress($value) {
        return $this->setProperty('linkWebAddress', $value);
    }

    /**
    * The caption for the link text in the createLink dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function linkText($value) {
        return $this->setProperty('linkText', $value);
    }

    /**
    * The caption for the link Tooltip in the createLink dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function linkToolTip($value) {
        return $this->setProperty('linkToolTip', $value);
    }

    /**
    * The caption for the checkbox for opening the link in a new window in the createLink dialog.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function linkOpenInNewWindow($value) {
        return $this->setProperty('linkOpenInNewWindow', $value);
    }

    /**
    * The label of the update button in all editor dialogs.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function dialogUpdate($value) {
        return $this->setProperty('dialogUpdate', $value);
    }

    /**
    * The label of the insert button in all editor dialogs.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function dialogInsert($value) {
        return $this->setProperty('dialogInsert', $value);
    }

    /**
    * The label of the cancel button in all editor dialogs.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function dialogCancel($value) {
        return $this->setProperty('dialogCancel', $value);
    }

    /**
    * The title of the tool that inserts tables.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function createTable($value) {
        return $this->setProperty('createTable', $value);
    }

    /**
    * The status text of the tool that inserts tables, which indicates the dimensions of the inserted table.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function createTableHint($value) {
        return $this->setProperty('createTableHint', $value);
    }

    /**
    * The title of the tool that adds table columns on the left of the selection.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function addColumnLeft($value) {
        return $this->setProperty('addColumnLeft', $value);
    }

    /**
    * The title of the tool that adds table columns on the right of the selection.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function addColumnRight($value) {
        return $this->setProperty('addColumnRight', $value);
    }

    /**
    * The title of the tool that adds table rows above the selection.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function addRowAbove($value) {
        return $this->setProperty('addRowAbove', $value);
    }

    /**
    * The title of the tool that adds table rows below the selection.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function addRowBelow($value) {
        return $this->setProperty('addRowBelow', $value);
    }

    /**
    * The title of the tool that deletes selected table rows.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function deleteRow($value) {
        return $this->setProperty('deleteRow', $value);
    }

    /**
    * The title of the tool that deletes selected table columns.
    * @param string $value
    * @return \Kendo\UI\EditorMessages
    */
    public function deleteColumn($value) {
        return $this->setProperty('deleteColumn', $value);
    }

//<< Properties
}

?>
