namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DropDownList"/> component.
    /// </summary>
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
            if (string.IsNullOrEmpty(Component.DataValueField)
                && string.IsNullOrEmpty(Component.DataTextField))
            {
                DataValueField("Value");
                DataTextField("Text");
            }

            Component.DataSource.Data = dataSource;
            Component.Value = dataSource.SelectedValue();

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
            return BindTo(dataSource.Select(item => new DropDownListItem
            {
                Text = item.Text,
                Value = item.Value ?? item.Text,
                Selected = item.Selected
            }));
        }

        /// <summary>
        /// Sets the field of the data item that provides the value content of the list items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataTextField("Text")
        ///             .DataValueField("Value")
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder DataValueField(string field)
        {
            Component.DataValueField = field;

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Events(events =>
        ///                 events.Change("change")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder Events(Action<DropDownListEventBuilder> clientEventsAction)
        {
            clientEventsAction(new DropDownListEventBuilder(Component.Events));

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

        /// <summary>
        /// Define the text of the default empty item. If the value is an object, then the widget will use it directly.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .OptionLabel("Select country...")
        /// %&gt;
        /// </code>
        /// </example>
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

        /// <summary>
        /// Use it to set the Id of the parent DropDownList.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList2")
        ///             .CascadeFrom("DropDownList1")
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder CascadeFrom(string cascadeFrom)
        {
            Component.CascadeFrom = cascadeFrom;

            return this;
        }

        /// <summary>
        /// Define the text of the widget, when the autoBind is set to false.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .Text("Chai")
        ///             .AutoBind(false)
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder Text(string text)
        {
            Component.Text = text;

            return this;
        }
    }
}