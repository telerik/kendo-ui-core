package com.kendoui.spring.navigation;

import java.io.BufferedReader;
import java.io.FileReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SourceCodeInterceptor extends HandlerInterceptorAdapter  {
    @Override
    public void postHandle(HttpServletRequest request, 
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        
        if (modelAndView != null) {
           
            HandlerMethod handlerMethod = (HandlerMethod)handler;
            Class<?> controller = handlerMethod.getBeanType();
            //String filename = controller.getName().replaceAll("\\.", "/") + ".java";
            
            String filename = modelAndView.getViewName() + ".jsp";
            
            String realPath = request.getSession().getServletContext().getRealPath("/WEB-INF/views/" + filename);
            
            System.out.println(realPath);
            
            BufferedReader input = new BufferedReader(new FileReader(realPath));
            
            StringBuilder content = new StringBuilder();
            String line = input.readLine();
            
            while (line != null) {
                content.append(line);
                line = input.readLine();
            }
            
            input.close();
            
            System.out.println(content.toString());
        }
    }
}
