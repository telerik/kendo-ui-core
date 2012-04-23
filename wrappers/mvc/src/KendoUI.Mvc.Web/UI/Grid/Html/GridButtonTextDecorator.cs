// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridButtonTextDecorator : IGridButtonBuilderDecorator
    {
        private readonly IGridButtonBuilder button;

        public GridButtonTextDecorator(IGridButtonBuilder button)
        {
            this.button = button;
        }

        public void Apply(IHtmlNode parent)
        {
            var text = new LiteralNode(button.Text);
            text.AppendTo(parent);
        }
    }
}
