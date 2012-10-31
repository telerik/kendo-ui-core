
package com.kendoui.taglib.grid;

import java.io.IOException;
import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.html.Script;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

@SuppressWarnings("serial")
public class DetailTemplateFunctionTag extends BaseTag {    
    private String id;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    @Override
    public int doEndTag() throws JspException {
        JspWriter out = pageContext.getOut();
        
        Script script = new Script();
        script.attr("type", "text/x-kendo-template");
        script.attr("id", getId());
        script.html(body().replaceAll("</script>", "<\\\\/script>").replaceAll("jQuery\\(\"#", "jQuery(\"\\\\#"));
       
        try {                                   
          script.write(out);            
        } catch (IOException exception) {
            throw new JspException(exception);
        }
        
        return super.doEndTag();
    }
    
    public static String tagName() {
        return "grid-detailTemplate";
    }
}
