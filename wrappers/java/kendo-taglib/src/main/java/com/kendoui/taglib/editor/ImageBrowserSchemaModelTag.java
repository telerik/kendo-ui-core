
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImageBrowserSchemaModelTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImageBrowserSchemaTag parent = (ImageBrowserSchemaTag)findParentWithClass(ImageBrowserSchemaTag.class);


        parent.setModel(this);

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
        return "editor-imageBrowser-schema-model";
    }

    public void setFields(com.kendoui.taglib.editor.ImageBrowserSchemaModelFieldsTag value) {
        setProperty("fields", value);
    }

    public String getId() {
        return (String)getProperty("id");
    }

    public void setId(String value) {
        setProperty("id", value);
    }

//<< Attributes

}
