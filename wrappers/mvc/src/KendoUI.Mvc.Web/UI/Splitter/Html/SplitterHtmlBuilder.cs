// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.UI;

    public class SplitterHtmlBuilder : HtmlBuilderBase
    {
        private readonly Splitter component;

        public SplitterHtmlBuilder(Splitter component)
        {
            this.component = component;
        }

        public IHtmlNode CreateSplitter()
        {
            return new HtmlElement("div")
                  .Attributes(new { id = component.Id })
                  .Attributes(component.HtmlAttributes)
                  .PrependClass(UIPrimitives.Widget,
                      component.Orientation == SplitterOrientation.Horizontal ? UIPrimitives.Splitter.Horizontal : UIPrimitives.Splitter.Vertical);
        }

        public IHtmlNode CreatePane(SplitterPane pane)
        {
            var paneElement = new HtmlElement("div")
                  .Attributes(pane.HtmlAttributes)
                  .PrependClass(UIPrimitives.Splitter.Pane)
                  .ToggleClass(UIPrimitives.Scrollable, pane.Scrollable);

            pane.Template.Apply(paneElement);

            return paneElement;
        }

        protected override IHtmlNode BuildCore()
        {
            IHtmlNode splitter = CreateSplitter();

            foreach (var pane in component.Panes)
            {
                CreatePane(pane).AppendTo(splitter);
            }

            return splitter;
        }
    }

}
