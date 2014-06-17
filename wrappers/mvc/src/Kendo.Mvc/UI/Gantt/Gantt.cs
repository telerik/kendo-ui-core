namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class Gantt<T> : WidgetBase where T : class, IGanttTask
    {
        private readonly IUrlGenerator urlGenerator;

        public Gantt(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Messages = new GanttMessagesSettings();
                
            Views = new List<GanttView>();
                
        //<< Initialization
        }

//>> Fields
        
        public bool? AutoBind { get; set; }
        
        public bool? Editable { get; set; }
        
        public DateTime? WorkDayStart { get; set; }
        
        public DateTime? WorkDayEnd { get; set; }
        
        public double? WorkWeekStart { get; set; }
        
        public double? WorkWeekEnd { get; set; }
        
        public double? HourSpan { get; set; }
        
        public bool? Snap { get; set; }
        
        public double? Height { get; set; }
        
        public string ListWidth { get; set; }
        
        public GanttMessagesSettings Messages
        {
            get;
            set;
        }
        
        public bool? Selectable { get; set; }
        
        public bool? ShowWorkDays { get; set; }
        
        public bool? ShowWorkHours { get; set; }
        
        public List<GanttView> Views
        {
            get;
            set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (Editable.HasValue)
            {
                json["editable"] = Editable;
            }
                
            if (WorkDayStart.HasValue)
            {
                json["workDayStart"] = WorkDayStart;
            }
                
            if (WorkDayEnd.HasValue)
            {
                json["workDayEnd"] = WorkDayEnd;
            }
                
            if (WorkWeekStart.HasValue)
            {
                json["workWeekStart"] = WorkWeekStart;
            }
                
            if (WorkWeekEnd.HasValue)
            {
                json["workWeekEnd"] = WorkWeekEnd;
            }
                
            if (HourSpan.HasValue)
            {
                json["hourSpan"] = HourSpan;
            }
                
            if (Snap.HasValue)
            {
                json["snap"] = Snap;
            }
                
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            if (ListWidth.HasValue())
            {
                json["listWidth"] = ListWidth;
            }
            
            var messages = Messages.ToJson();
            if (messages.Any())
            {
                json["messages"] = messages;
            }
                
            if (Selectable.HasValue)
            {
                json["selectable"] = Selectable;
            }
                
            if (ShowWorkDays.HasValue)
            {
                json["showWorkDays"] = ShowWorkDays;
            }
                
            if (ShowWorkHours.HasValue)
            {
                json["showWorkHours"] = ShowWorkHours;
            }
                
            var views = Views.ToJson();
            if (views.Any())
            {
                json["views"] = views;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "Gantt", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new GanttHtmlBuilder<T>(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

