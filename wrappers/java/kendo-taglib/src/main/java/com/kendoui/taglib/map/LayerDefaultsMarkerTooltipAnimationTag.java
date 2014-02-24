
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerDefaultsMarkerTooltipAnimationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayerDefaultsMarkerTooltipTag parent = (LayerDefaultsMarkerTooltipTag)findParentWithClass(LayerDefaultsMarkerTooltipTag.class);


        parent.setAnimation(this);

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
        return "map-layerDefaults-marker-tooltip-animation";
    }

    public void setClose(com.kendoui.taglib.map.LayerDefaultsMarkerTooltipAnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.map.LayerDefaultsMarkerTooltipAnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
