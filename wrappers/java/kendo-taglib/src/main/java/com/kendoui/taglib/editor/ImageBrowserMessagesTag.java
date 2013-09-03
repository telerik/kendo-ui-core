
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImageBrowserMessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImageBrowserTag parent = (ImageBrowserTag)findParentWithClass(ImageBrowserTag.class);


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
        return "editor-imageBrowser-messages";
    }

    public java.lang.String getDeleteFile() {
        return (java.lang.String)getProperty("deleteFile");
    }

    public void setDeleteFile(java.lang.String value) {
        setProperty("deleteFile", value);
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

    public java.lang.String getInvalidFileType() {
        return (java.lang.String)getProperty("invalidFileType");
    }

    public void setInvalidFileType(java.lang.String value) {
        setProperty("invalidFileType", value);
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

    public java.lang.String getOverwriteFile() {
        return (java.lang.String)getProperty("overwriteFile");
    }

    public void setOverwriteFile(java.lang.String value) {
        setProperty("overwriteFile", value);
    }

    public java.lang.String getSearch() {
        return (java.lang.String)getProperty("search");
    }

    public void setSearch(java.lang.String value) {
        setProperty("search", value);
    }

    public java.lang.String getUploadFile() {
        return (java.lang.String)getProperty("uploadFile");
    }

    public void setUploadFile(java.lang.String value) {
        setProperty("uploadFile", value);
    }

//<< Attributes

}
