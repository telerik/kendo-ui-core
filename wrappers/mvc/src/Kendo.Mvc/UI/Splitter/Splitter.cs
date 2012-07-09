namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    public class Splitter : WidgetBase
    {
        public Splitter(ViewContext viewContext, IJavaScriptInitializer initializer)
            : base(viewContext, initializer)
        {
            Orientation = SplitterOrientation.Horizontal;

            Panes = new List<SplitterPane>();
        }

        public SplitterOrientation Orientation
        {
            get;
            set;
        }

        public IList<SplitterPane> Panes
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (Orientation != SplitterOrientation.Horizontal)
            {
                options["orientation"] = Orientation;
            }

            if (Panes.Any())
            {
                options["panes"] = Panes.Select(pane => pane.Serialize());
            }

            writer.Write(Initializer.Initialize(Selector, "Splitter", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            new SplitterHtmlBuilder(this)
                .Build()
                .WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
