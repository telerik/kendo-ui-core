package com.kendoui.spring.controllers.grid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("grid-persist-state-controller")
@RequestMapping(value="/grid/")
public class PersistStateController {
    
    @RequestMapping(value = {"/persist-state"}, method = RequestMethod.GET)
    public String index() {
        return "grid/persist-state";
    }

}

