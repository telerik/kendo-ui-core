
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.EditorTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setMessages(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "editor-messages";
    }

    public java.lang.String getAddColumnLeft() {
        return (java.lang.String)getProperty("addColumnLeft");
    }

    public void setAddColumnLeft(java.lang.String value) {
        setProperty("addColumnLeft", value);
    }

    public java.lang.String getAddColumnRight() {
        return (java.lang.String)getProperty("addColumnRight");
    }

    public void setAddColumnRight(java.lang.String value) {
        setProperty("addColumnRight", value);
    }

    public java.lang.String getAddRowAbove() {
        return (java.lang.String)getProperty("addRowAbove");
    }

    public void setAddRowAbove(java.lang.String value) {
        setProperty("addRowAbove", value);
    }

    public java.lang.String getAddRowBelow() {
        return (java.lang.String)getProperty("addRowBelow");
    }

    public void setAddRowBelow(java.lang.String value) {
        setProperty("addRowBelow", value);
    }

    public java.lang.String getBackColor() {
        return (java.lang.String)getProperty("backColor");
    }

    public void setBackColor(java.lang.String value) {
        setProperty("backColor", value);
    }

    public java.lang.String getBold() {
        return (java.lang.String)getProperty("bold");
    }

    public void setBold(java.lang.String value) {
        setProperty("bold", value);
    }

    public java.lang.String getCreateLink() {
        return (java.lang.String)getProperty("createLink");
    }

    public void setCreateLink(java.lang.String value) {
        setProperty("createLink", value);
    }

    public java.lang.String getCreateTable() {
        return (java.lang.String)getProperty("createTable");
    }

    public void setCreateTable(java.lang.String value) {
        setProperty("createTable", value);
    }

    public java.lang.String getCreateTableHint() {
        return (java.lang.String)getProperty("createTableHint");
    }

    public void setCreateTableHint(java.lang.String value) {
        setProperty("createTableHint", value);
    }

    public java.lang.String getDeleteColumn() {
        return (java.lang.String)getProperty("deleteColumn");
    }

    public void setDeleteColumn(java.lang.String value) {
        setProperty("deleteColumn", value);
    }

    public java.lang.String getDeleteFile() {
        return (java.lang.String)getProperty("deleteFile");
    }

    public void setDeleteFile(java.lang.String value) {
        setProperty("deleteFile", value);
    }

    public java.lang.String getDeleteRow() {
        return (java.lang.String)getProperty("deleteRow");
    }

    public void setDeleteRow(java.lang.String value) {
        setProperty("deleteRow", value);
    }

    public java.lang.String getDialogCancel() {
        return (java.lang.String)getProperty("dialogCancel");
    }

    public void setDialogCancel(java.lang.String value) {
        setProperty("dialogCancel", value);
    }

    public java.lang.String getDialogInsert() {
        return (java.lang.String)getProperty("dialogInsert");
    }

    public void setDialogInsert(java.lang.String value) {
        setProperty("dialogInsert", value);
    }

    public java.lang.String getDialogUpdate() {
        return (java.lang.String)getProperty("dialogUpdate");
    }

    public void setDialogUpdate(java.lang.String value) {
        setProperty("dialogUpdate", value);
    }

    public java.lang.String getDirectoryNotFound() {
        return (java.lang.String)getProperty("directoryNotFound");
    }

    public void setDirectoryNotFound(java.lang.String value) {
        setProperty("directoryNotFound", value);
    }

    public java.lang.String getEmptyFolder() {
        return (java.lang.String)getProperty("emptyFolder");
    }

    public void setEmptyFolder(java.lang.String value) {
        setProperty("emptyFolder", value);
    }

    public java.lang.String getFileTitle() {
        return (java.lang.String)getProperty("fileTitle");
    }

    public void setFileTitle(java.lang.String value) {
        setProperty("fileTitle", value);
    }

    public java.lang.String getFileWebAddress() {
        return (java.lang.String)getProperty("fileWebAddress");
    }

    public void setFileWebAddress(java.lang.String value) {
        setProperty("fileWebAddress", value);
    }

    public java.lang.String getFontName() {
        return (java.lang.String)getProperty("fontName");
    }

    public void setFontName(java.lang.String value) {
        setProperty("fontName", value);
    }

    public java.lang.String getFontNameInherit() {
        return (java.lang.String)getProperty("fontNameInherit");
    }

    public void setFontNameInherit(java.lang.String value) {
        setProperty("fontNameInherit", value);
    }

    public java.lang.String getFontSize() {
        return (java.lang.String)getProperty("fontSize");
    }

    public void setFontSize(java.lang.String value) {
        setProperty("fontSize", value);
    }

    public java.lang.String getFontSizeInherit() {
        return (java.lang.String)getProperty("fontSizeInherit");
    }

    public void setFontSizeInherit(java.lang.String value) {
        setProperty("fontSizeInherit", value);
    }

    public java.lang.String getForeColor() {
        return (java.lang.String)getProperty("foreColor");
    }

    public void setForeColor(java.lang.String value) {
        setProperty("foreColor", value);
    }

    public java.lang.String getFormatBlock() {
        return (java.lang.String)getProperty("formatBlock");
    }

    public void setFormatBlock(java.lang.String value) {
        setProperty("formatBlock", value);
    }

    public java.lang.String getFormatting() {
        return (java.lang.String)getProperty("formatting");
    }

    public void setFormatting(java.lang.String value) {
        setProperty("formatting", value);
    }

    public java.lang.String getImageAltText() {
        return (java.lang.String)getProperty("imageAltText");
    }

    public void setImageAltText(java.lang.String value) {
        setProperty("imageAltText", value);
    }

    public java.lang.String getImageHeight() {
        return (java.lang.String)getProperty("imageHeight");
    }

    public void setImageHeight(java.lang.String value) {
        setProperty("imageHeight", value);
    }

    public java.lang.String getImageWebAddress() {
        return (java.lang.String)getProperty("imageWebAddress");
    }

    public void setImageWebAddress(java.lang.String value) {
        setProperty("imageWebAddress", value);
    }

    public java.lang.String getImageWidth() {
        return (java.lang.String)getProperty("imageWidth");
    }

    public void setImageWidth(java.lang.String value) {
        setProperty("imageWidth", value);
    }

    public java.lang.String getIndent() {
        return (java.lang.String)getProperty("indent");
    }

    public void setIndent(java.lang.String value) {
        setProperty("indent", value);
    }

    public java.lang.String getInsertFile() {
        return (java.lang.String)getProperty("insertFile");
    }

    public void setInsertFile(java.lang.String value) {
        setProperty("insertFile", value);
    }

    public java.lang.String getInsertHtml() {
        return (java.lang.String)getProperty("insertHtml");
    }

    public void setInsertHtml(java.lang.String value) {
        setProperty("insertHtml", value);
    }

    public java.lang.String getInsertImage() {
        return (java.lang.String)getProperty("insertImage");
    }

    public void setInsertImage(java.lang.String value) {
        setProperty("insertImage", value);
    }

    public java.lang.String getInsertOrderedList() {
        return (java.lang.String)getProperty("insertOrderedList");
    }

    public void setInsertOrderedList(java.lang.String value) {
        setProperty("insertOrderedList", value);
    }

    public java.lang.String getInsertUnorderedList() {
        return (java.lang.String)getProperty("insertUnorderedList");
    }

    public void setInsertUnorderedList(java.lang.String value) {
        setProperty("insertUnorderedList", value);
    }

    public java.lang.String getInvalidFileType() {
        return (java.lang.String)getProperty("invalidFileType");
    }

    public void setInvalidFileType(java.lang.String value) {
        setProperty("invalidFileType", value);
    }

    public java.lang.String getItalic() {
        return (java.lang.String)getProperty("italic");
    }

    public void setItalic(java.lang.String value) {
        setProperty("italic", value);
    }

    public java.lang.String getJustifyCenter() {
        return (java.lang.String)getProperty("justifyCenter");
    }

    public void setJustifyCenter(java.lang.String value) {
        setProperty("justifyCenter", value);
    }

    public java.lang.String getJustifyFull() {
        return (java.lang.String)getProperty("justifyFull");
    }

    public void setJustifyFull(java.lang.String value) {
        setProperty("justifyFull", value);
    }

    public java.lang.String getJustifyLeft() {
        return (java.lang.String)getProperty("justifyLeft");
    }

    public void setJustifyLeft(java.lang.String value) {
        setProperty("justifyLeft", value);
    }

    public java.lang.String getJustifyRight() {
        return (java.lang.String)getProperty("justifyRight");
    }

    public void setJustifyRight(java.lang.String value) {
        setProperty("justifyRight", value);
    }

    public java.lang.String getLinkOpenInNewWindow() {
        return (java.lang.String)getProperty("linkOpenInNewWindow");
    }

    public void setLinkOpenInNewWindow(java.lang.String value) {
        setProperty("linkOpenInNewWindow", value);
    }

    public java.lang.String getLinkText() {
        return (java.lang.String)getProperty("linkText");
    }

    public void setLinkText(java.lang.String value) {
        setProperty("linkText", value);
    }

    public java.lang.String getLinkToolTip() {
        return (java.lang.String)getProperty("linkToolTip");
    }

    public void setLinkToolTip(java.lang.String value) {
        setProperty("linkToolTip", value);
    }

    public java.lang.String getLinkWebAddress() {
        return (java.lang.String)getProperty("linkWebAddress");
    }

    public void setLinkWebAddress(java.lang.String value) {
        setProperty("linkWebAddress", value);
    }

    public java.lang.String getOrderBy() {
        return (java.lang.String)getProperty("orderBy");
    }

    public void setOrderBy(java.lang.String value) {
        setProperty("orderBy", value);
    }

    public java.lang.String getOrderByName() {
        return (java.lang.String)getProperty("orderByName");
    }

    public void setOrderByName(java.lang.String value) {
        setProperty("orderByName", value);
    }

    public java.lang.String getOrderBySize() {
        return (java.lang.String)getProperty("orderBySize");
    }

    public void setOrderBySize(java.lang.String value) {
        setProperty("orderBySize", value);
    }

    public java.lang.String getOutdent() {
        return (java.lang.String)getProperty("outdent");
    }

    public void setOutdent(java.lang.String value) {
        setProperty("outdent", value);
    }

    public java.lang.String getOverwriteFile() {
        return (java.lang.String)getProperty("overwriteFile");
    }

    public void setOverwriteFile(java.lang.String value) {
        setProperty("overwriteFile", value);
    }

    public java.lang.String getStrikethrough() {
        return (java.lang.String)getProperty("strikethrough");
    }

    public void setStrikethrough(java.lang.String value) {
        setProperty("strikethrough", value);
    }

    public java.lang.String getStyle() {
        return (java.lang.String)getProperty("style");
    }

    public void setStyle(java.lang.String value) {
        setProperty("style", value);
    }

    public java.lang.String getSubscript() {
        return (java.lang.String)getProperty("subscript");
    }

    public void setSubscript(java.lang.String value) {
        setProperty("subscript", value);
    }

    public java.lang.String getSuperscript() {
        return (java.lang.String)getProperty("superscript");
    }

    public void setSuperscript(java.lang.String value) {
        setProperty("superscript", value);
    }

    public java.lang.String getUnderline() {
        return (java.lang.String)getProperty("underline");
    }

    public void setUnderline(java.lang.String value) {
        setProperty("underline", value);
    }

    public java.lang.String getUnlink() {
        return (java.lang.String)getProperty("unlink");
    }

    public void setUnlink(java.lang.String value) {
        setProperty("unlink", value);
    }

    public java.lang.String getUploadFile() {
        return (java.lang.String)getProperty("uploadFile");
    }

    public void setUploadFile(java.lang.String value) {
        setProperty("uploadFile", value);
    }

    public java.lang.String getViewHtml() {
        return (java.lang.String)getProperty("viewHtml");
    }

    public void setViewHtml(java.lang.String value) {
        setProperty("viewHtml", value);
    }

//<< Attributes

}
