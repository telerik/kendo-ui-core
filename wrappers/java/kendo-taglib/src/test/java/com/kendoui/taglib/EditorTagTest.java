package com.kendoui.taglib;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.spy;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class EditorTagTest {
    private EditorTag tag;
    
    @Before
    public void setUp() throws IOException {
        tag = spy(new EditorTag());

        tag.initialize();
        tag.setName("foo");
    }
    
    @Test
    public void createElementCreatesTextarea() throws IOException {
        assertEquals("<textarea id=\"foo\" name=\"foo\"></textarea>", tag.html().outerHtml());         
    }
}