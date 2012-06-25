namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;    

    public class DropDownListBuilder : DropDownListBuilderBase<DropDownList, DropDownListBuilder>
    {
        public DropDownListBuilder(DropDownList component)
            : base(component)
        {
        }

        public DropDownListBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Binds the DropDownList to a list of DropDownListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .BindTo(new List<DropDownListItem>
        ///             {
        ///                 new DropDownListItem{
        ///                     Text = "Text1",
        ///                     Value = "Value1"
        ///                 },
        ///                 new DropDownListItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder BindTo(IEnumerable<DropDownListItem> dataSource)
        {
            Component.DataSource.Data = dataSource;
            Component.ValueOfSelectedItem(dataSource);

            return this;
        }

        /// <summary>
        /// Binds the DropDownList to a list of SelectListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .BindTo(new List<SelectListItem>
        ///             {
        ///                 new SelectListItem{
        ///                     Text = "Text1",
        ///                     Value = "Value1"
        ///                 },
        ///                 new SelectListItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder BindTo(IEnumerable<SelectListItem> dataSource)
        {            
            if (string.IsNullOrEmpty(Component.DataValueField)
                && string.IsNullOrEmpty(Component.DataTextField))
            {                
                DataValueField("Value");
                DataTextField("Text");                
            }

            return BindTo(dataSource.Select(item => new DropDownListItem
            {
                Text = item.Text,
                Value = item.Value,
                Selected = item.Selected
            }));
        }

        public DropDownListBuilder DataValueField(string field)
        {
            Component.DataValueField = field;

            return this;
        }

        /// <summary>
        /// Defines the items in the DropDownList
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder Items(Action<DropDownListItemFactory> addAction)
        {
            var items = new List<DropDownListItem>();

            addAction(new DropDownListItemFactory(items));

            return BindTo(items);
        }

        public DropDownListBuilder OptionLabel(string optionLabel)
        {
            Component.OptionLabel = optionLabel;

            return this;
        }

        /// <summary>
        /// Use it to set selected item index
        /// </summary>
        /// <param name="index">Item index.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .SelectedIndex(0);
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder SelectedIndex(int index)
        {
            Component.SelectedIndex = index;

            return this;
        }

        public DropDownListBuilder CascadeFrom(string cascadeFrom)
        {
            Component.CascadeFrom = cascadeFrom;

            return this;
        }
    }
}