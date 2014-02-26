
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeDefaultsConnectorTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ShapeDefaultsConnectorsTag parent = (ShapeDefaultsConnectorsTag)findParentWithClass(ShapeDefaultsConnectorsTag.class);

        parent.addConnector(this);

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
        return "diagram-shapeDefaults-connector";
    }

    public java.lang.String getDescription() {
        return (java.lang.String)getProperty("description");
    }

    public void setDescription(java.lang.String value) {
        setProperty("description", value);
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
    }

//<< Attributes

}
