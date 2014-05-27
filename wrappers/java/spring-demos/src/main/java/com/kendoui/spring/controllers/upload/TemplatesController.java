package com.kendoui.spring.controllers.upload;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("upload-templates-controller")
@RequestMapping(value="/upload/")
public class TemplatesController {
    
    @RequestMapping(value = "/templates", method = RequestMethod.GET)
    public String index(){
        
        return "upload/templates";
    }
}
