namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;

    public class Splitter : ViewComponentBase
    {
        public Splitter(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {

            Orientation = SplitterOrientation.Horizontal;

            Panes = new List<SplitterPane>();

            ClientEvents = new SplitterClientEvents();
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

        public SplitterClientEvents ClientEvents
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoSplitter", writer);

            objectWriter.Start();

            objectWriter.Append<SplitterOrientation>("orientation", Orientation, SplitterOrientation.Horizontal);

            var panes = new List<IDictionary<string, object>>();

            Panes.Each(pane =>
            {
                panes.Add(pane.Serialize());
            });

            if (panes.Any())
            {
                objectWriter.AppendCollection("panes", panes);
            }

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

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
