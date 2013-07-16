namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// The server side wrapper for Kendo UI Scheduler
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class Scheduler<TModel> : WidgetBase, IScheduler<TModel>
        where TModel : class, ISchedulerEvent
    {
        public Scheduler(ViewContext viewContext,
                    IJavaScriptInitializer initializer,
                    IUrlGenerator urlGenerator
            )
            : base(viewContext, initializer)
        {
            DataSource = new DataSource();

            DataSource.Type = DataSourceType.Ajax;

            DataSource.Schema.Model = new SchedulerModelDescriptor(typeof(TModel));
         
            UrlGenerator = urlGenerator;

            Resources = new List<SchedulerResource<TModel>>();

            Views = new List<SchedulerViewBase>();

            AllDaySlot = true;

            Messages = new SchedulerMessages();
            Group = new SchedulerGroupSettings();
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public DateTime? Date
        {
            get;
            set;
        }

        public DateTime? StartTime
        {
            get;
            set;
        }

        public DateTime? EndTime
        {
            get;
            set;
        }

        public int? Height
        {
            get;
            set;
        }

        public string EventTemplate
        {
            get;
            set;
        }

        public string EventTemplateId
        {
            get;
            set;
        }

        public string AllDayEventTemplate
        {
            get;
            set;
        }

        public string AllDayEventTemplateId
        {
            get;
            set;
        }

        public bool AllDaySlot
        {
            get;
            set;
        }

        public bool Selectable
        {
            get;
            set;
        }

        public string DateHeaderTemplate
        {
            get;
            set;
        }

        public string DateHeaderTemplateId
        {
            get;
            set;
        }

        public int? MajorTick
        {
            get;
            set;
        }

        public string MajorTimeHeaderTemplate
        {
            get;
            set;
        }

        public string MajorTimeHeaderTemplateId
        {
            get;
            set;
        }

        public int? MinorTickCount
        {
            get;
            set;
        }

        public string MinorTimeHeaderTemplate
        {
            get;
            set;
        }

        public string MinorTimeHeaderTemplateId
        {
            get;
            set;
        }

        public string Timezone
        {
            get;
            set;
        }

        //default valiue == 0?
        public int? Width
        {
            get;
            set;
        }

        public SchedulerEditableSettings Editable
        {
            get;
            set;
        }

        public IList<SchedulerResource<TModel>> Resources
        {
            get;
            private set;
        }

        public IList<SchedulerViewBase> Views
        {
            get;
            private set;
        }

        public SchedulerMessages Messages
        {
            get;
            private set;
        }

        public SchedulerGroupSettings Group
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            writer.Write(Initializer.Initialize(Selector, "Scheduler", options));

            base.WriteInitializationScript(writer);
        }

        protected virtual IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = new Dictionary<string, object>(Events);

            var idPrefix = "#";

            if (Date != null)
            {
                options["date"] = Date;
            }

            if (StartTime != null)
            {
                options["startTime"] = StartTime;
            }

            if (EndTime != null)
            {
                options["endTime"] = EndTime;
            }

            if (Height != null)
            {
                options["height"] = Height;
            }

            if (Editable != null)
            {
                if (Editable.Enable == false)
                {
                    options["editable"] = false;
                }
                else
                {
                    IDictionary<string, object> editable = Editable.ToJson();
                    if (editable.Count > 0)
                    {
                        options["editable"] = editable;
                    }
                }
            }

            if (!string.IsNullOrEmpty(EventTemplate))
            {
                options["eventTemplate"] = EventTemplate;
            }

            if (!string.IsNullOrEmpty(EventTemplateId))
            {
                options["eventTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, EventTemplateId) };
            }

            if (!string.IsNullOrEmpty(AllDayEventTemplate))
            {
                options["allDayEventTemplate"] = AllDayEventTemplate;
            }

            if (!string.IsNullOrEmpty(AllDayEventTemplateId))
            {
                options["allDayEventTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, AllDayEventTemplateId) };
            }

            if (!AllDaySlot)
            {
                options["allDaySlot"] = AllDaySlot;
            }

            if (Selectable)
            {
                options["selectable"] = Selectable;
            }

            if (!string.IsNullOrEmpty(DateHeaderTemplate))
            {
                options["dateHeaderTemplate"] = DateHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(DateHeaderTemplateId))
            {
                options["dateHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, DateHeaderTemplateId) };
            }

            if (MajorTick != null)
            {
                options["majorTick"] = MajorTick;
            }

            if (!string.IsNullOrEmpty(MajorTimeHeaderTemplate))
            {
                options["majorTimeHeaderTemplate"] = MajorTimeHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(MajorTimeHeaderTemplateId))
            {
                options["majorTimeHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, MajorTimeHeaderTemplateId) };
            }

            if (!string.IsNullOrEmpty(MinorTimeHeaderTemplate))
            {
                options["minorTimeHeaderTemplate"] = MinorTimeHeaderTemplate;
            }

            if (!string.IsNullOrEmpty(MinorTimeHeaderTemplateId))
            {
                options["minorTimeHeaderTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, MinorTimeHeaderTemplateId) };
            }

            if (MinorTickCount != null)
            {
                options["minorTickCount"] = MinorTickCount;
            }

            if (!string.IsNullOrEmpty(Timezone))
            {
                options["timezone"] = Timezone;
            }

            if (Width != null)
            {
                options["width"] = Width;
            }

            if (Resources.Count > 0)
            {
                options["resources"] = Resources.ToJson();
            }

            if (Views.Count > 0)
            {
                options["views"] = Views.ToJson();
            }

            var messages = Messages.ToJson();
            if (messages.Count > 0)
            {
                options["messages"] = messages;
            }

            var group = Group.ToJson();
            if (group.Count > 0)
            {
                options["group"] = group;
            }

            Dictionary<string, object> dataSource = (Dictionary<string, object>)DataSource.ToJson();

            //TODO: update logic
            if (DataSource.Data != null)
            {
                dataSource["data"] = new { Data = DataSource.Data };
            }

            options["dataSource"] = dataSource;

            return options;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            SchedulerHtmlBuilder<TModel> builder = new SchedulerHtmlBuilder<TModel>(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
