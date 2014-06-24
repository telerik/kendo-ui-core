
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FileBrowserTransportTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FileBrowserTag parent = (FileBrowserTag)findParentWithClass(FileBrowserTag.class);


        parent.setTransport(this);

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
        return "editor-fileBrowser-transport";
    }

    public void setCreate(com.kendoui.taglib.editor.FileBrowserTransportCreateTag value) {
        setProperty("create", value);
    }

    public void setDestroy(com.kendoui.taglib.editor.FileBrowserTransportDestroyTag value) {
        setProperty("destroy", value);
    }

    public void setRead(com.kendoui.taglib.editor.FileBrowserTransportReadTag value) {
        setProperty("read", value);
    }

    public void setFileUrl(FileBrowserTransportFileUrlFunctionTag value) {
        setEvent("fileUrl", value.getBody());
    }

    public java.lang.String getCreate() {
        return (java.lang.String)getProperty("create");
    }

    public void setCreate(java.lang.String value) {
        setProperty("create", value);
    }

    public java.lang.String getDestroy() {
        return (java.lang.String)getProperty("destroy");
    }

    public void setDestroy(java.lang.String value) {
        setProperty("destroy", value);
    }

    public java.lang.String getFileUrl() {
        return (java.lang.String)getProperty("fileUrl");
    }

    public void setFileUrl(java.lang.String value) {
        setProperty("fileUrl", value);
    }

    public java.lang.String getRead() {
        return (java.lang.String)getProperty("read");
    }

    public void setRead(java.lang.String value) {
        setProperty("read", value);
    }

    public java.lang.String getUploadUrl() {
        return (java.lang.String)getProperty("uploadUrl");
    }

    public void setUploadUrl(java.lang.String value) {
        setProperty("uploadUrl", value);
    }

//<< Attributes

}
