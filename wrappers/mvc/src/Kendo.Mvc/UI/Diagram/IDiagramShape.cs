namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    interface IDiagramShape
    {
        int Width { get; set; }
        int Height { get; set; }
        int X { get; set; }
        int Y { get; set; }
        string Type { get; set; }
        string Text { get; set; }
    }
}
