namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    public class EditorDropDownItemBuilder : IHideObjectMembers
    {
        private readonly IList<DropDownListItem> items;

        public EditorDropDownItemBuilder(IList<DropDownListItem> items)
        {

            this.items = items;
        }

        public EditorDropDownItemBuilder Add(string text, string value)
        {
            items.Add(new DropDownListItem() { Text = text, Value = value });

            return this;
        }
    }
}