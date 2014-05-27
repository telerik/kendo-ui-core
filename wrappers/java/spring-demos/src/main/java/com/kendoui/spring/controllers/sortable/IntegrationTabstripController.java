package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("sortable-integration-tabstrip-controller")
@RequestMapping(value="/sortable/")
public class IntegrationTabstripController {    
    
    @RequestMapping(value = {"/", "/integration-tabstrip"}, method = RequestMethod.GET)
    public String index() {
        return "sortable/integration-tabstrip";
    }
    
}