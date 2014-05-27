package com.kendoui.spring.controllers.financial;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.Intraday;
import com.kendoui.spring.models.IntradayDao;

@Controller("dataviz-financial-virtualization-controller")
@RequestMapping(value="/financial/")
public class VirtualizationController {
    @Autowired 
    private IntradayDao intraday;

    @RequestMapping(value = "/virtualization", method = RequestMethod.GET)
    public String index(Model model) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        Date from = (Date)formatter.parse("2009/02/05");
        Date to = (Date)formatter.parse("2011/10/07");
        model.addAttribute("from", from);
        model.addAttribute("to", to);
        return "/financial/virtualization";
    }
    
    @RequestMapping(value = "/virtualization/read", method = RequestMethod.POST)
    public @ResponseBody List<Intraday> read(@RequestBody DataSourceRequest request) {
        return intraday.getList(request);        
    }
}