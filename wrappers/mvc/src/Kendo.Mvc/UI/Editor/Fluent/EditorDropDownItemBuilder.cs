namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    public class EditorDropDownItemBuilder : IHideObjectMembers
    {
        private readonly IList<DropDownItem> items;

        public EditorDropDownItemBuilder(IList<DropDownItem> items)
        {

            this.items = items;
        }

        public EditorDropDownItemBuilder Add(string text, string value)
        {
            items.Add(new DropDownItem() { Text = text, Value = value });

            return this;
        }
    }
}