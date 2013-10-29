
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.MapTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerDefaultsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MapTag parent = (MapTag)findParentWithClass(MapTag.class);


        parent.setLayerDefaults(this);

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
        return "map-layerDefaults";
    }

    public void setShape(com.kendoui.taglib.map.LayerDefaultsShapeTag value) {
        setProperty("shape", value);
    }

    public void setTile(com.kendoui.taglib.map.LayerDefaultsTileTag value) {
        setProperty("tile", value);
    }

//<< Attributes

}
