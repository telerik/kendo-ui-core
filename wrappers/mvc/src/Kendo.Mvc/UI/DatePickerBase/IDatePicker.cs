using System;
using System.Collections.Generic;
namespace Kendo.Mvc.UI
{
    public interface IDatePicker : IInputComponent<DateTime>
    {
        IDictionary<string, object> InputHtmlAttributes { get; }

        Effects Effects { get; set; }

        IDictionary<string, object> ClientEvents { get; }

        bool OpenOnFocus { get; set; }

        string Format { get; set; }

        string TodayFormat { get; set; }
        
        DateTime MinValue { get; set; }

        DateTime MaxValue { get; set; }

        bool Enabled { get; set; }
    }
}
