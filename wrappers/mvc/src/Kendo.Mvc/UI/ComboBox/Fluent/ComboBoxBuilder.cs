namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ComboBox"/> component.
    /// </summary>
    public class ComboBoxBuilder : DropDownListBuilderBase<ComboBox, ComboBoxBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ComboBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ComboBoxBuilder(ComboBox component)
            : base(component)
        {
        }

        /// <summary>
        /// Controls whether to bind the widget to the DataSource on initialization.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .AutoBind(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Binds the ComboBox to a list of DropDownListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
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
        public ComboBoxBuilder BindTo(IEnumerable<DropDownListItem> dataSource)
        {
            if (string.IsNullOrEmpty(Component.DataValueField)
                && string.IsNullOrEmpty(Component.DataTextField))
            {
                DataValueField("Value");
                DataTextField("Text");
            }

            Component.DataSource.Data = dataSource;
            Component.ValueOfSelectedItem(dataSource);

            return this;
        }

        /// <summary>
        /// Binds the ComboBox to a list of SelectListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
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
        public ComboBoxBuilder BindTo(IEnumerable<SelectListItem> dataSource)
        {
            return BindTo(dataSource.Select(item => new DropDownListItem
            {
                Text = item.Text,
                Value = item.Value,
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
        public ComboBoxBuilder DataValueField(string field)
        {
            Component.DataValueField = field;

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filter("startswith");
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Filter(string filter)
        {
            Component.Filter = filter;

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filter(FilterType.Contains);
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Filter(FilterType filter)
        {
            Component.Filter = filter.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Defines the items in the ComboBox
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Items(Action<DropDownListItemFactory> addAction)
        {
            var items = new List<DropDownListItem>();

            addAction(new DropDownListItemFactory(items));

            return BindTo(items);
        }

        /// <summary>
        /// Use it to enable highlighting of first matched item.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .HighlightFirst(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder HighlightFirst(bool highlightFirst)
        {
            Component.HighlightFirst = highlightFirst;

            return this;
        }

        /// <summary>
        /// Specifies the minimum number of characters that should be typed before the widget queries the dataSource.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .MinLength(3)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder MinLength(int length)
        {

            Component.MinLength = length;

            return this;
        }
        
        /// <summary>
        /// Use it to set selected item index
        /// </summary>
        /// <param name="index">Item index.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .SelectedIndex(0);
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder SelectedIndex(int index)
        {
            if (index != -1)
            {
            }

            Component.SelectedIndex = index;

            return this;
        }

        /// <summary>
        /// Controls whether the ComboBox should automatically auto-type the rest of text.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .Suggest(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Suggest(bool suggest)
        {
            Component.Suggest = suggest;

            return this;
        }

        /// <summary>
        /// A string that appears in the textbox when it has no value.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .Placeholder("Select country...")
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Placeholder(string placeholder)
        {
            Component.Placeholder = placeholder;

            return this;
        }

        /// <summary>
        /// Use it to set the Id of the parent ComboBox.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox2")
        ///             .CascadeFrom("ComboBox1")
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder CascadeFrom(string cascadeFrom)
        {
            Component.CascadeFrom = cascadeFrom;

            return this;
        }

        /// <summary>
        /// Define the text of the widget, when the autoBind is set to false.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .Text("Chai")
        ///             .AutoBind(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder Text(string text)
        {
            Component.Text = text;

            return this;
        }
    }
}