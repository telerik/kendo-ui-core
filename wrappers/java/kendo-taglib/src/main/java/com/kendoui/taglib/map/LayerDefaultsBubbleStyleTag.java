
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerDefaultsBubbleStyleTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayerDefaultsBubbleTag parent = (LayerDefaultsBubbleTag)findParentWithClass(LayerDefaultsBubbleTag.class);


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
        return "map-layerDefaults-bubble-style";
    }

    public void setFill(com.kendoui.taglib.map.LayerDefaultsBubbleStyleFillTag value) {
        setProperty("fill", value);
    }

    public void setStroke(com.kendoui.taglib.map.LayerDefaultsBubbleStyleStrokeTag value) {
        setProperty("stroke", value);
    }

//<< Attributes

}
