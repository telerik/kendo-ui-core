
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DiagramTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayoutTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DiagramTag parent = (DiagramTag)findParentWithClass(DiagramTag.class);


        parent.setLayout(this);

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
        return "diagram-layout";
    }

    public void setGrid(com.kendoui.taglib.diagram.LayoutGridTag value) {
        setProperty("grid", value);
    }

    public float getEndRadialAngle() {
        return (float)getProperty("endRadialAngle");
    }

    public void setEndRadialAngle(float value) {
        setProperty("endRadialAngle", value);
    }

    public float getHorizontalSeparation() {
        return (float)getProperty("horizontalSeparation");
    }

    public void setHorizontalSeparation(float value) {
        setProperty("horizontalSeparation", value);
    }

    public float getIterations() {
        return (float)getProperty("iterations");
    }

    public void setIterations(float value) {
        setProperty("iterations", value);
    }

    public float getLayerSeparation() {
        return (float)getProperty("layerSeparation");
    }

    public void setLayerSeparation(float value) {
        setProperty("layerSeparation", value);
    }

    public float getNodeDistance() {
        return (float)getProperty("nodeDistance");
    }

    public void setNodeDistance(float value) {
        setProperty("nodeDistance", value);
    }

    public float getRadialFirstLevelSeparation() {
        return (float)getProperty("radialFirstLevelSeparation");
    }

    public void setRadialFirstLevelSeparation(float value) {
        setProperty("radialFirstLevelSeparation", value);
    }

    public float getRadialSeparation() {
        return (float)getProperty("radialSeparation");
    }

    public void setRadialSeparation(float value) {
        setProperty("radialSeparation", value);
    }

    public float getStartRadialAngle() {
        return (float)getProperty("startRadialAngle");
    }

    public void setStartRadialAngle(float value) {
        setProperty("startRadialAngle", value);
    }

    public java.lang.String getSubtype() {
        return (java.lang.String)getProperty("subtype");
    }

    public void setSubtype(java.lang.String value) {
        setProperty("subtype", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public float getUnderneathHorizontalOffset() {
        return (float)getProperty("underneathHorizontalOffset");
    }

    public void setUnderneathHorizontalOffset(float value) {
        setProperty("underneathHorizontalOffset", value);
    }

    public float getUnderneathVerticalSeparation() {
        return (float)getProperty("underneathVerticalSeparation");
    }

    public void setUnderneathVerticalSeparation(float value) {
        setProperty("underneathVerticalSeparation", value);
    }

    public float getUnderneathVerticalTopOffset() {
        return (float)getProperty("underneathVerticalTopOffset");
    }

    public void setUnderneathVerticalTopOffset(float value) {
        setProperty("underneathVerticalTopOffset", value);
    }

    public float getVerticalSeparation() {
        return (float)getProperty("verticalSeparation");
    }

    public void setVerticalSeparation(float value) {
        setProperty("verticalSeparation", value);
    }

//<< Attributes

}
