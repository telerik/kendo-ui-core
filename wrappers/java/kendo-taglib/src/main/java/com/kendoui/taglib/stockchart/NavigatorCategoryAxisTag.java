
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorCategoryAxisTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        categoryAxis = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> categoryAxis;

    public List<Map<String, Object>> categoryAxis() {
        return categoryAxis;
    }

    public static String tagName() {
        return "stockChart-navigator-categoryAxis";
    }

    public void addCategoryAxisItem(NavigatorCategoryAxisItemTag value) {
        categoryAxis.add(value.properties());
    }

//<< Attributes

}
