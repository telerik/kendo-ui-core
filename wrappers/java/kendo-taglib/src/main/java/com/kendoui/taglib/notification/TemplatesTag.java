
package com.kendoui.taglib.notification;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.NotificationTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TemplatesTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        NotificationTag parent = (NotificationTag)findParentWithClass(NotificationTag.class);

        parent.setTemplates(this);
        
        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        templates = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> templates;

    public List<Map<String, Object>> templates() {
        return templates;
    }

    public static String tagName() {
        return "notification-templates";
    }

    public void addTemplate(TemplateTag value) {
        templates.add(value.properties());
    }

//<< Attributes

}
