
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImagebrowserMessagesTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImagebrowserTag parent = (ImagebrowserTag)findParentWithClass(ImagebrowserTag.class);


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
        return "editor-imagebrowser-messages";
    }

    public String getUploadFile() {
        return (String)getProperty("uploadFile");
    }

    public void setUploadFile(String value) {
        setProperty("uploadFile", value);
    }

    public String getOrderBy() {
        return (String)getProperty("orderBy");
    }

    public void setOrderBy(String value) {
        setProperty("orderBy", value);
    }

    public String getOrderByName() {
        return (String)getProperty("orderByName");
    }

    public void setOrderByName(String value) {
        setProperty("orderByName", value);
    }

    public String getOrderBySize() {
        return (String)getProperty("orderBySize");
    }

    public void setOrderBySize(String value) {
        setProperty("orderBySize", value);
    }

    public String getDirectoryNotFound() {
        return (String)getProperty("directoryNotFound");
    }

    public void setDirectoryNotFound(String value) {
        setProperty("directoryNotFound", value);
    }

    public String getEmptyFolder() {
        return (String)getProperty("emptyFolder");
    }

    public void setEmptyFolder(String value) {
        setProperty("emptyFolder", value);
    }

    public String getDeleteFile() {
        return (String)getProperty("deleteFile");
    }

    public void setDeleteFile(String value) {
        setProperty("deleteFile", value);
    }

    public String getInvalidFileType() {
        return (String)getProperty("invalidFileType");
    }

    public void setInvalidFileType(String value) {
        setProperty("invalidFileType", value);
    }

    public String getOverwriteFile() {
        return (String)getProperty("overwriteFile");
    }

    public void setOverwriteFile(String value) {
        setProperty("overwriteFile", value);
    }

//<< Attributes

}
