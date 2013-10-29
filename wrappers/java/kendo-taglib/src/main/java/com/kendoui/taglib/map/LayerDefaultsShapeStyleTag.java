
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerDefaultsShapeStyleTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayerDefaultsShapeTag parent = (LayerDefaultsShapeTag)findParentWithClass(LayerDefaultsShapeTag.class);


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
        return "map-layerDefaults-shape-style";
    }

    public void setFill(com.kendoui.taglib.map.LayerDefaultsShapeStyleFillTag value) {
        setProperty("fill", value);
    }

    public void setStroke(com.kendoui.taglib.map.LayerDefaultsShapeStyleStrokeTag value) {
        setProperty("stroke", value);
    }

//<< Attributes

}
