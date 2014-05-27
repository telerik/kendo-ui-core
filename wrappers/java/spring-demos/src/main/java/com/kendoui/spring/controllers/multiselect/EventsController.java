package com.kendoui.spring.controllers.multiselect;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("multiselect-events-controller")
@RequestMapping(value="/multiselect/")
public class EventsController {
    
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("items", new DropDownListItem[] {
                new DropDownListItem("Africa", "1"),
                new DropDownListItem("Europe", "2"),
                new DropDownListItem("Asia", "3"),
                new DropDownListItem("North America", "4"),
                new DropDownListItem("South America", "5"),
                new DropDownListItem("Antractica", "6"),
                new DropDownListItem("Australia", "7")
        });
        
        return "multiselect/events";
    }
}