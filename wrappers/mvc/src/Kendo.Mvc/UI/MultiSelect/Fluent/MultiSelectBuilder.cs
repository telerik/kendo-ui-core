namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="MultiSelect"/> component.
    /// </summary>
    public class MultiSelectBuilder : ListBuilderBase<MultiSelect, MultiSelectBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MultiSelectBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MultiSelectBuilder(MultiSelect component)
            : base(component)
        {
        }

        /// <summary>
        /// Controls whether to bind the widget to the DataSource on initialization.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .AutoBind(false)
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Binds the MultiSelect to a list of DropDownListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().MultiSelect()
        ///             .Name("MultiSelect")
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
        public MultiSelectBuilder BindTo(IEnumerable<DropDownListItem> dataSource)
        {
            if (string.IsNullOrEmpty(Component.DataValueField)
                && string.IsNullOrEmpty(Component.DataTextField))
            {
                DataValueField("Value");
                DataTextField("Text");
            }

            Component.DataSource.Data = dataSource;
            Component.Value = dataSource.Where(item => item.Selected == true)
                                        .Select(item => item.Value ?? item.Text);

            return this;
        }

        /// <summary>
        /// Binds the MultiSelect to a list of SelectListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().MultiSelect()
        ///             .Name("MultiSelect")
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
        public MultiSelectBuilder BindTo(IEnumerable<SelectListItem> dataSource)
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
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .DataTextField("Text")
        ///             .DataValueField("Value")
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder DataValueField(string field)
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
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .Events(events =>
        ///                 events.Change("change")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder Events(Action<MultiSelectEventBuilder> clientEventsAction)
        {
            clientEventsAction(new MultiSelectEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .Filter("startswith");
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder Filter(string filter)
        {
            Component.Filter = filter;

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .Filter(FilterType.Contains);
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder Filter(FilterType filter)
        {
            Component.Filter = filter.ToString().ToLower();

            return this;
        }

        /// <summary>
        /// Defines the items in the MultiSelect
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder Items(Action<DropDownListItemFactory> addAction)
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
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .HighlightFirst(true)
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder HighlightFirst(bool highlightFirst)
        {
            Component.HighlightFirst = highlightFirst;

            return this;
        }

        /// <summary>
        /// Specifies the minimum number of characters that should be typed before the widget queries the dataSource.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .MinLength(3)
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder MinLength(int length)
        {

            Component.MinLength = length;

            return this;
        }

        /// <summary>
        /// A string that appears in the textbox when it has no value.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .Placeholder("Select country...")
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder Placeholder(string placeholder)
        {
            Component.Placeholder = placeholder;

            return this;
        }

        /// <summary>
        /// Template to be used for rendering the items in the list.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .ItemTemplate("#= data #")
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder ItemTemplate(string template)
        {
            Component.ItemTemplate = template;

            return this;
        }

        /// <summary>
        /// TemplateId to be used for rendering the items in the list.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .ItemTemplateId("widgetTemplateId")
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder ItemTemplateId(string templateId)
        {
            Component.ItemTemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Template to be used for rendering the tags of the selected items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .TagTemplate("#= data #")
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder TagTemplate(string template)
        {
            Component.TagTemplate = template;

            return this;
        }

        /// <summary>
        /// TemplateId to be used for rendering the tags of the selected items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .TagTemplateId("widgetTemplateId")
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder TagTemplateId(string templateId)
        {
            Component.TagTemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Sets the value of the widget.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MultiSelect()
        ///             .Name("MultiSelect")
        ///             .Value(new string[] { "1" })
        /// %&gt;
        /// </code>
        /// </example>
        public MultiSelectBuilder Value(IEnumerable<string> value)
        {
            Component.Value = value;

            return this;
        }
    }
}