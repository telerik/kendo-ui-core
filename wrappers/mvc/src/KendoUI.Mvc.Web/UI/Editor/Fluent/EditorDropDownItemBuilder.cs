// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Infrastructure;

    public class EditorDropDownItemBuilder : IHideObjectMembers
    {
        private readonly IList<DropDownItem> items;

        public EditorDropDownItemBuilder(IList<DropDownItem> items)
        {
            Guard.IsNotNull(items, "items");

            this.items = items;
        }

        public EditorDropDownItemBuilder Add(string text, string value)
        {
            items.Add(new DropDownItem() { Text = text, Value = value });

            return this;
        }
    }
}