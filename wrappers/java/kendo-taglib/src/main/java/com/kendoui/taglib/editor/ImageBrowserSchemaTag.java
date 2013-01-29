
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImageBrowserSchemaTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImageBrowserTag parent = (ImageBrowserTag)findParentWithClass(ImageBrowserTag.class);


        parent.setSchema(this);

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
        return "editor-imageBrowser-schema";
    }

    public void setModel(com.kendoui.taglib.editor.ImageBrowserSchemaModelTag value) {
        setProperty("model", value);
    }

//<< Attributes

}
