
package com.kendoui.taglib.sparkline;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        CategoryAxisTag parent = (CategoryAxisTag)findParentWithClass(CategoryAxisTag.class);

        parent.addCategoryAxisItem(this);

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
        return "sparkline-categoryAxisItem";
    }

    public void setCrosshair(com.kendoui.taglib.sparkline.CategoryAxisItemCrosshairTag value) {
        setProperty("crosshair", value);
    }

    public void setLabels(com.kendoui.taglib.sparkline.CategoryAxisItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(com.kendoui.taglib.sparkline.CategoryAxisItemLineTag value) {
        setProperty("line", value);
    }

    public void setMajorGridLines(com.kendoui.taglib.sparkline.CategoryAxisItemMajorGridLinesTag value) {
        setProperty("majorGridLines", value);
    }

    public void setMajorTicks(com.kendoui.taglib.sparkline.CategoryAxisItemMajorTicksTag value) {
        setProperty("majorTicks", value);
    }

    public void setMinorGridLines(com.kendoui.taglib.sparkline.CategoryAxisItemMinorGridLinesTag value) {
        setProperty("minorGridLines", value);
    }

    public void setMinorTicks(com.kendoui.taglib.sparkline.CategoryAxisItemMinorTicksTag value) {
        setProperty("minorTicks", value);
    }

    public void setNotes(com.kendoui.taglib.sparkline.CategoryAxisItemNotesTag value) {
        setProperty("notes", value);
    }

    public void setPlotBands(CategoryAxisItemPlotBandsTag value) {

        setProperty("plotBands", value.plotBands());

    }

    public void setTitle(com.kendoui.taglib.sparkline.CategoryAxisItemTitleTag value) {
        setProperty("title", value);
    }

    public java.lang.Object getAutoBaseUnitSteps() {
        return (java.lang.Object)getProperty("autoBaseUnitSteps");
    }

    public void setAutoBaseUnitSteps(java.lang.Object value) {
        setProperty("autoBaseUnitSteps", value);
    }

    public java.lang.Object getAxisCrossingValue() {
        return (java.lang.Object)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(java.lang.Object value) {
        setProperty("axisCrossingValue", value);
    }

    public java.lang.String getBaseUnit() {
        return (java.lang.String)getProperty("baseUnit");
    }

    public void setBaseUnit(java.lang.String value) {
        setProperty("baseUnit", value);
    }

    public java.lang.Object getBaseUnitStep() {
        return (java.lang.Object)getProperty("baseUnitStep");
    }

    public void setBaseUnitStep(java.lang.Object value) {
        setProperty("baseUnitStep", value);
    }

    public java.lang.Object getCategories() {
        return (java.lang.Object)getProperty("categories");
    }

    public void setCategories(java.lang.Object value) {
        setProperty("categories", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

    public boolean getJustified() {
        return (boolean)getProperty("justified");
    }

    public void setJustified(boolean value) {
        setProperty("justified", value);
    }

    public java.lang.Object getMax() {
        return (java.lang.Object)getProperty("max");
    }

    public void setMax(java.lang.Object value) {
        setProperty("max", value);
    }

    public float getMaxDateGroups() {
        return (float)getProperty("maxDateGroups");
    }

    public void setMaxDateGroups(float value) {
        setProperty("maxDateGroups", value);
    }

    public java.lang.Object getMin() {
        return (java.lang.Object)getProperty("min");
    }

    public void setMin(java.lang.Object value) {
        setProperty("min", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public boolean getRoundToBaseUnit() {
        return (boolean)getProperty("roundToBaseUnit");
    }

    public void setRoundToBaseUnit(boolean value) {
        setProperty("roundToBaseUnit", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

    public float getWeekStartDay() {
        return (float)getProperty("weekStartDay");
    }

    public void setWeekStartDay(float value) {
        setProperty("weekStartDay", value);
    }

//<< Attributes

}
