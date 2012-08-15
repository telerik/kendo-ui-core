package com.kendoui.taglib;

import static org.junit.Assert.*;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTag;

import org.junit.Before;
import org.junit.Test;

import com.kendoui.taglib.AutoCompleteTag;

public class AutoCompleteTest {
	private AutoCompleteTag tag;
	
	@Before
	public void setUp() {
		tag = new AutoCompleteTag();
	}
	
	@Test
	public void doStartTagReturnsEvalBodyBuffered() throws JspException {
		assertEquals(tag.doStartTag(), BodyTag.EVAL_BODY_BUFFERED);
	}
}
