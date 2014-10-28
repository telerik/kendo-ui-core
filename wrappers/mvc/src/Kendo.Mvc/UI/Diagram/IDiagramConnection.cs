namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    interface IDiagramConnection
    {
        int From { get; set; }
        int To { get; set; }
        int FromX { get; set; }
        int FromY { get; set; }
        int ToY { get; set; }
        int ToX { get; set; }
        string Text { get; set; }
        string Type { get; set; }
    }
}
