
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.EditorTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImageBrowserTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setImageBrowser(this);

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
        return "editor-imageBrowser";
    }

    public void setMessages(com.kendoui.taglib.editor.ImageBrowserMessagesTag value) {
        setProperty("messages", value);
    }

    public void setSchema(com.kendoui.taglib.editor.ImageBrowserSchemaTag value) {
        setProperty("schema", value);
    }

    public void setTransport(com.kendoui.taglib.editor.ImageBrowserTransportTag value) {
        setProperty("transport", value);
    }

    public String getFileTypes() {
        return (String)getProperty("fileTypes");
    }

    public void setFileTypes(String value) {
        setProperty("fileTypes", value);
    }

    public String getPath() {
        return (String)getProperty("path");
    }

    public void setPath(String value) {
        setProperty("path", value);
    }

//<< Attributes

}
