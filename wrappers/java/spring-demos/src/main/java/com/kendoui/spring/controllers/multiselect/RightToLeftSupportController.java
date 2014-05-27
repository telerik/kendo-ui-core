package com.kendoui.spring.controllers.multiselect;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("multiselect-rtl-controller")
@RequestMapping(value="/multiselect/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = {"/right-to-left-support"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("continents", new DropDownListItem[] {
                new DropDownListItem("Africa", "1"),
                new DropDownListItem("Europe", "1"),
                new DropDownListItem("Asia", "1"),
                new DropDownListItem("North America", "1"),
                new DropDownListItem("South America", "1"),
                new DropDownListItem("Antarctica", "1"),
                new DropDownListItem("Australia", "1")
        });       
        return "multiselect/right-to-left-support";
    }    
}