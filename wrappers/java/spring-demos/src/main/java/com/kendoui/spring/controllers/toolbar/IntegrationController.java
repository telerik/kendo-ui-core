package com.kendoui.spring.controllers.toolbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("toolbar-integration-controller")
@RequestMapping(value="/toolbar/")
public class IntegrationController {
    
    @RequestMapping(value = {"/", "/integration"}, method = RequestMethod.GET)
    public String index() {      
        return "toolbar/integration";
    }
}