
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImagebrowserSchemaTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImagebrowserTag parent = (ImagebrowserTag)findParentWithClass(ImagebrowserTag.class);


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
        return "editor-imagebrowser-schema";
    }

    public void setModel(ImagebrowserSchemaModelTag value) {
        setProperty("model", value);
    }

//<< Attributes

}
