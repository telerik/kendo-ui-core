package com.kendoui.spring.controllers.tabstrip;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tabstrip-animation-controller")
@RequestMapping(value="/web/tabstrip/")
public class AnimationController {
    
    @RequestMapping(value = {"/animation"}, method = RequestMethod.GET)
    public String index() {       
        return "web/tabstrip/animation";
    }    
}