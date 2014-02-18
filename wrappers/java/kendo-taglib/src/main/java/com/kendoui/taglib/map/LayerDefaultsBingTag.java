
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerDefaultsBingTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayerDefaultsTag parent = (LayerDefaultsTag)findParentWithClass(LayerDefaultsTag.class);


        parent.setBing(this);

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
        return "map-layerDefaults-bing";
    }

    public java.lang.String getAttribution() {
        return (java.lang.String)getProperty("attribution");
    }

    public void setAttribution(java.lang.String value) {
        setProperty("attribution", value);
    }

    public java.lang.String getKey() {
        return (java.lang.String)getProperty("key");
    }

    public void setKey(java.lang.String value) {
        setProperty("key", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

//<< Attributes

}
