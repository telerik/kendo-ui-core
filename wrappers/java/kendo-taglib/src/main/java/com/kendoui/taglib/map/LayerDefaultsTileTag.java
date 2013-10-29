
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerDefaultsTileTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayerDefaultsTag parent = (LayerDefaultsTag)findParentWithClass(LayerDefaultsTag.class);


        parent.setTile(this);

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
        return "map-layerDefaults-tile";
    }

    public java.lang.String getCopyright() {
        return (java.lang.String)getProperty("copyright");
    }

    public void setCopyright(java.lang.String value) {
        setProperty("copyright", value);
    }

    public java.lang.String getUrlTemplate() {
        return (java.lang.String)getProperty("urlTemplate");
    }

    public void setUrlTemplate(java.lang.String value) {
        setProperty("urlTemplate", value);
    }

//<< Attributes

}
