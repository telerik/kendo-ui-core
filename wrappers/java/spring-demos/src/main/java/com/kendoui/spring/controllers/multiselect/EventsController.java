package com.kendoui.spring.controllers.multiselect;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("multiselect-events-controller")
@RequestMapping(value="/web/multiselect/")
public class EventsController {
    
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("items", new DropDownListItem[] {
                new DropDownListItem("Item 1", "1"),
                new DropDownListItem("Item 2", "2"),
                new DropDownListItem("Item 3", "3")
        });
        
        return "web/multiselect/events";
    }
}