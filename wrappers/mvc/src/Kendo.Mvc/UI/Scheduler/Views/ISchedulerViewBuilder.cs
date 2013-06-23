namespace Kendo.Mvc.UI
{
    using System;
    using Kendo.Mvc.UI.Fluent;

    public interface ISchedulerViewBuilder
    {
        ISchedulerViewBuilder Title(string title);

        ISchedulerViewBuilder StartTime(DateTime startTime);

        ISchedulerViewBuilder EndTime(DateTime endTime);

        ISchedulerViewBuilder Editable(Action<SchedulerViewEditableSettingsBuilder> configurator);

        ISchedulerViewBuilder EventTemplate(string eventTemplate);

        ISchedulerViewBuilder EventTemplateId(string eventTemplate);

        ISchedulerViewBuilder SelectedDateFormat(string selectedDateFormat);
    }
}
