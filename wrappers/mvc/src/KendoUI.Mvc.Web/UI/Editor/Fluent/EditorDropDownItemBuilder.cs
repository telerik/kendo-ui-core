namespace KendoUI.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;

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