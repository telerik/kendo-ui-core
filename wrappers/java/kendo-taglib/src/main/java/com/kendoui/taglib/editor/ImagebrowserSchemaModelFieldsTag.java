
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImagebrowserSchemaModelFieldsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ImagebrowserSchemaModelTag parent = (ImagebrowserSchemaModelTag)findParentWithClass(ImagebrowserSchemaModelTag.class);


        parent.setFields(this);

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
        return "editor-imagebrowser-schema-model-fields";
    }

    public void setName(ImagebrowserSchemaModelFieldsNameTag value) {
        setProperty("name", value);
    }

    public void setSize(ImagebrowserSchemaModelFieldsSizeTag value) {
        setProperty("size", value);
    }

    public void setType(ImagebrowserSchemaModelFieldsTypeTag value) {
        setProperty("type", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public String getSize() {
        return (String)getProperty("size");
    }

    public void setSize(String value) {
        setProperty("size", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

//<< Attributes

}
