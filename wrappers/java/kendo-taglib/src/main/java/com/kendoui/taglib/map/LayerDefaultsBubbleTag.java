
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerDefaultsBubbleTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayerDefaultsTag parent = (LayerDefaultsTag)findParentWithClass(LayerDefaultsTag.class);


        parent.setBubble(this);

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
        return "map-layerDefaults-bubble";
    }

    public void setStyle(com.kendoui.taglib.map.LayerDefaultsBubbleStyleTag value) {
        setProperty("style", value);
    }

    public java.lang.String getAttribution() {
        return (java.lang.String)getProperty("attribution");
    }

    public void setAttribution(java.lang.String value) {
        setProperty("attribution", value);
    }

    public float getMaxSize() {
        return (float)getProperty("maxSize");
    }

    public void setMaxSize(float value) {
        setProperty("maxSize", value);
    }

    public float getMinSize() {
        return (float)getProperty("minSize");
    }

    public void setMinSize(float value) {
        setProperty("minSize", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public java.lang.String getSymbol() {
        return (java.lang.String)getProperty("symbol");
    }

    public void setSymbol(java.lang.String value) {
        setProperty("symbol", value);
    }

//<< Attributes

}
