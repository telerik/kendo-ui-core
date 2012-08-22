package com.kendoui.taglib.html;

import static org.junit.Assert.*;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.junit.Before;
import org.junit.Test;

public class ElementTest {

    private ElementTestDouble element;
    
    @Before
    public void setUp() {
        element = new ElementTestDouble("div");
    }
    
    @Test
    public void writePrintsOpenAndClosingTagNameToWriter() throws IOException {
        Writer out = new StringWriter();
        
        element.write(out);
        
        assertEquals("<div></div>", out.toString());
    }
    
    @Test
    public void outerHtmlReturnsTheHtmlContentsOfTheElement() throws IOException {
        assertEquals("<div></div>", element.outerHtml());
    }
    
    @Test
    public void selfClosingElementsDoNotEmitClosingTag() throws IOException {
        element = new ElementTestDouble("img", true);
        
        assertEquals("<img />", element.outerHtml());
    }
        
    @Test
    public void appendReturnsSelf() {
        assertEquals(element, element.append(new ElementTestDouble("span")));
    }
    
    @Test
    public void outerHtmlIncludesTheChildren() throws IOException {
        ElementTestDouble child = new ElementTestDouble("span");
        
        element.append(child);
        
        assertEquals("<div><span></span></div>", element.outerHtml());
    }
    
    @Test
    public void textSetsTheTextContentOfTheElement() throws IOException {
        element.text("foo");
        
        assertEquals("<div>foo</div>", element.outerHtml());
    }
    
    @Test
    public void textReturnsSelf() {
        assertEquals(element, element.text("foo"));
    }
 
    @Test
    public void textOverridesChildren() throws IOException {
        element.append(new ElementTestDouble("span"));
        
        element.text("foo");
        
        assertEquals("<div>foo</div>", element.outerHtml());
    }
    
    @Test
    public void textEncodesEntities() throws IOException {
        element.text("<a>&");
    
        assertEquals("<div>&lt;a&gt;&amp;</div>", element.outerHtml());
    }
    
    @Test
    public void htmlSetsTheHtmlContentOfTheElement() throws IOException {
        element.html("<span>foo</span>");
        
        assertEquals("<div><span>foo</span></div>", element.outerHtml());
    }
    
    @Test
    public void htmlReturnsSelf() {
        assertEquals(element, element.html("foo"));
    }
    
    @Test
    public void htmlOverridesChildren() throws IOException {
        element.append(new ElementTestDouble("span"));
        
        element.html("foo");
        
        assertEquals("<div>foo</div>", element.outerHtml());
    } 
}
