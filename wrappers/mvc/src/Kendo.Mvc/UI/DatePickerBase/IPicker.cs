namespace Kendo.Mvc.UI
{
    using System;

    public interface IPicker : IInputComponent<DateTime>
    {
        bool Enabled { get; set; }

        string Format { get; set; }
    }
}
