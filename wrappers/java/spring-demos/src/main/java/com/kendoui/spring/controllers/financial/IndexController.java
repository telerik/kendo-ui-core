package com.kendoui.spring.controllers.financial;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.StockDataPoint;

@Controller("dataviz-financial-index-controller")
@RequestMapping(value="/financial/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) throws ParseException {      
        DateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        Date from = (Date)formatter.parse("2009/02/05");
        Date to = (Date)formatter.parse("2011/10/07");
        model.addAttribute("from", from);
        model.addAttribute("to", to);
        return "/financial/index";
    }
    
    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
    public @ResponseBody List<StockDataPoint> read() {
        return ChartDataRepository.BoeingStockData();
    }
}
