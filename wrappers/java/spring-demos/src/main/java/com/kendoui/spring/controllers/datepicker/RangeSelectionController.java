package com.kendoui.spring.controllers.datepicker;

import java.util.Calendar;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datepicker-rangeselection-controller")
@RequestMapping(value="/datepicker/")
public class RangeSelectionController {
    
    @RequestMapping(value = {"/rangeselection"}, method = RequestMethod.GET)
    public String index(Model model) {
        Calendar cal = Calendar.getInstance();
        cal.set(2011,9,10);
        model.addAttribute("start", cal.getTime());
        cal.set(2012,9,10);
        model.addAttribute("end", cal.getTime());        
        
        return "datepicker/rangeselection";
    }
}