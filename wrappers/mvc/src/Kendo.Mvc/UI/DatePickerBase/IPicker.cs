namespace Kendo.Mvc.UI
{
    using System;
    using System.Globalization;

    public interface IPicker : IInputComponent<DateTime>
    {
        bool Enabled { get; set; }

        string Culture { get; set; }

        string Format { get; set; }

        CultureInfo CultureInfo { get; }
    }
}
