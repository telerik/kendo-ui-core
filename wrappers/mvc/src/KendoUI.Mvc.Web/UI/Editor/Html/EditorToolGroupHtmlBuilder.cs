// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;
    
    public class EditorToolGroupHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorToolGroup group;

        public EditorToolGroupHtmlBuilder(EditorToolGroup group)
        {
            this.group = group;
        }

        protected override IHtmlNode BuildCore()
        {
            var ul = new HtmlElement("ul")
                .AddClass("t-editor-toolbar");

            group.Tools.Each(tool =>
            {
                tool.CreateHtmlBuilder()
                    .Build()
                    .AppendTo(ul);
            });

            return ul;
        }
    }
}
