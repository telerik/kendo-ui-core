
package com.kendoui.taglib.lineargauge;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ScaleRangesTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ScaleTag parent = (ScaleTag)findParentWithClass(ScaleTag.class);


        parent.setRanges(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        ranges = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        ranges = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> ranges;

    public List<Map<String, Object>> ranges() {
        return ranges;
    }

    public static String tagName() {
        return "linearGauge-scale-ranges";
    }

    public void addRange(RangeTag value) {
        ranges.add(value.properties());
    }

//<< Attributes

}
