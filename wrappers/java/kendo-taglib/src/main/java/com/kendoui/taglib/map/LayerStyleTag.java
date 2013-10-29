
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerStyleTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayerTag parent = (LayerTag)findParentWithClass(LayerTag.class);


        parent.setStyle(this);

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
        return "map-layer-style";
    }

    public void setFill(com.kendoui.taglib.map.LayerStyleFillTag value) {
        setProperty("fill", value);
    }

    public void setStroke(com.kendoui.taglib.map.LayerStyleStrokeTag value) {
        setProperty("stroke", value);
    }

//<< Attributes

}
