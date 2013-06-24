package com.kendoui.spring.controllers.scheduler;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.Projection;


@Controller("scheduler-templates-controller")
@RequestMapping(value="/web/scheduler/")
public class TemplatesController {
    @RequestMapping(value = "/templates", method = RequestMethod.GET)
    public String templates(Locale locale, Model model) throws ParseException {
        List<Projection> projections = new ArrayList<Projection>();
        
        SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        
        Projection projection = new Projection();
        
        projection.setTitle("Fast and furious 6");
        projection.setImage("../../resources/web/scheduler/fast-and-furious.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1905041/");
        projection.setStart(format.parse("2013/6/13 17:00"));
        projection.setEnd(format.parse("2013/6/13 18:30"));
        
        projections.add(projection);
        
        projection = new Projection();
        projection.setTitle("The Internship");
        projection.setImage("../../resources/web/scheduler/the-internship.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt2234155/");
        projection.setStart(format.parse("2013/6/13 14:00"));
        projection.setEnd(format.parse("2013/6/13 15:30"));
        
        projections.add(projection);
        
        projection = new Projection();
        projection.setTitle("The Perks of Being a Wallflower");
        projection.setImage("../../resources/web/scheduler/wallflower.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1659337/");
        projection.setStart(format.parse("2013/6/13 16:00"));
        projection.setEnd(format.parse("2013/6/13 17:30"));
        
        projections.add(projection);

        projection = new Projection();
        projection.setTitle("The Help");
        projection.setImage("../../resources/web/scheduler/the-help.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1454029/");
        projection.setStart(format.parse("2013/6/13 12:00"));
        projection.setEnd(format.parse("2013/6/13 13:30"));
        
        projections.add(projection);

        projection = new Projection();
        projection.setTitle("Now You See Me");
        projection.setImage("../../resources/web/scheduler/now-you-see-me.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1670345/");
        projection.setStart(format.parse("2013/6/13 10:00"));
        projection.setEnd(format.parse("2013/6/13 11:30"));
        
        projections.add(projection);
        
        projection = new Projection();
        
        projection.setTitle("Fast and furious 6");
        projection.setImage("../../resources/web/scheduler/fast-and-furious.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1905041/");
        projection.setStart(format.parse("2013/6/13 19:00"));
        projection.setEnd(format.parse("2013/6/13 20:30"));
        
        projections.add(projection);
        
        projection = new Projection();
        projection.setTitle("The Internship");
        projection.setImage("../../resources/web/scheduler/the-internship.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt2234155/");
        projection.setStart(format.parse("2013/6/13 17:30"));
        projection.setEnd(format.parse("2013/6/13 19:00"));
        
        projections.add(projection);
        
        projection = new Projection();
        projection.setTitle("The Perks of Being a Wallflower");
        projection.setImage("../../resources/web/scheduler/wallflower.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1659337/");
        projection.setStart(format.parse("2013/6/13 17:30"));
        projection.setEnd(format.parse("2013/6/13 19:00"));
        
        projections.add(projection);
        
        projection = new Projection();
        projection.setTitle("The Help");
        projection.setImage("../../resources/web/scheduler/the-help.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1454029/");
        projection.setStart(format.parse("2013/6/13 13:30"));
        projection.setEnd(format.parse("2013/6/13 15:00"));
        
        projections.add(projection);
        
        projection = new Projection();
        projection.setTitle("Now You See Me");
        projection.setImage("../../resources/web/scheduler/now-you-see-me.jpg"); 
        projection.setImdb("http://www.imdb.com/title/tt1670345/");
        projection.setStart(format.parse("2013/6/13 12:30"));
        projection.setEnd(format.parse("2013/6/13 14:00"));
        
        projections.add(projection);
        
        model.addAttribute("projections", projections);
        
        return "web/scheduler/templates";
    }
}