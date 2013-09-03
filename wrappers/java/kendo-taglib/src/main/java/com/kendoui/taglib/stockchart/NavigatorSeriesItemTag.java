
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorSeriesItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        NavigatorSeriesTag parent = (NavigatorSeriesTag)findParentWithClass(NavigatorSeriesTag.class);

        parent.addSeriesItem(this);

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
        return "stockChart-navigator-seriesItem";
    }

    public void setBorder(com.kendoui.taglib.stockchart.NavigatorSeriesItemBorderTag value) {
        setProperty("border", value);
    }

    public void setHighlight(com.kendoui.taglib.stockchart.NavigatorSeriesItemHighlightTag value) {
        setProperty("highlight", value);
    }

    public void setLabels(com.kendoui.taglib.stockchart.NavigatorSeriesItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(com.kendoui.taglib.stockchart.NavigatorSeriesItemLineTag value) {
        setProperty("line", value);
    }

    public void setMarkers(com.kendoui.taglib.stockchart.NavigatorSeriesItemMarkersTag value) {
        setProperty("markers", value);
    }

    public void setOverlay(com.kendoui.taglib.stockchart.NavigatorSeriesItemOverlayTag value) {
        setProperty("overlay", value);
    }

    public void setTooltip(com.kendoui.taglib.stockchart.NavigatorSeriesItemTooltipTag value) {
        setProperty("tooltip", value);
    }

    public java.lang.String getAggregate() {
        return (java.lang.String)getProperty("aggregate");
    }

    public void setAggregate(java.lang.String value) {
        setProperty("aggregate", value);
    }

    public java.lang.String getAxis() {
        return (java.lang.String)getProperty("axis");
    }

    public void setAxis(java.lang.String value) {
        setProperty("axis", value);
    }

    public java.lang.String getCategoryField() {
        return (java.lang.String)getProperty("categoryField");
    }

    public void setCategoryField(java.lang.String value) {
        setProperty("categoryField", value);
    }

    public java.lang.String getCloseField() {
        return (java.lang.String)getProperty("closeField");
    }

    public void setCloseField(java.lang.String value) {
        setProperty("closeField", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getColorField() {
        return (java.lang.String)getProperty("colorField");
    }

    public void setColorField(java.lang.String value) {
        setProperty("colorField", value);
    }

    public java.lang.String getDashType() {
        return (java.lang.String)getProperty("dashType");
    }

    public void setDashType(java.lang.String value) {
        setProperty("dashType", value);
    }

    public java.lang.Object getData() {
        return (java.lang.Object)getProperty("data");
    }

    public void setData(java.lang.Object value) {
        setProperty("data", value);
    }

    public java.lang.String getDownColor() {
        return (java.lang.String)getProperty("downColor");
    }

    public void setDownColor(java.lang.String value) {
        setProperty("downColor", value);
    }

    public java.lang.String getDownColorField() {
        return (java.lang.String)getProperty("downColorField");
    }

    public void setDownColorField(java.lang.String value) {
        setProperty("downColorField", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

    public float getGap() {
        return (float)getProperty("gap");
    }

    public void setGap(float value) {
        setProperty("gap", value);
    }

    public java.lang.String getHighField() {
        return (java.lang.String)getProperty("highField");
    }

    public void setHighField(java.lang.String value) {
        setProperty("highField", value);
    }

    public java.lang.String getLine() {
        return (java.lang.String)getProperty("line");
    }

    public void setLine(java.lang.String value) {
        setProperty("line", value);
    }

    public java.lang.String getLowField() {
        return (java.lang.String)getProperty("lowField");
    }

    public void setLowField(java.lang.String value) {
        setProperty("lowField", value);
    }

    public java.lang.String getMissingValues() {
        return (java.lang.String)getProperty("missingValues");
    }

    public void setMissingValues(java.lang.String value) {
        setProperty("missingValues", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public java.lang.String getOpenField() {
        return (java.lang.String)getProperty("openField");
    }

    public void setOpenField(java.lang.String value) {
        setProperty("openField", value);
    }

    public float getSpacing() {
        return (float)getProperty("spacing");
    }

    public void setSpacing(float value) {
        setProperty("spacing", value);
    }

    public java.lang.Object getStack() {
        return (java.lang.Object)getProperty("stack");
    }

    public void setStack(java.lang.Object value) {
        setProperty("stack", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
