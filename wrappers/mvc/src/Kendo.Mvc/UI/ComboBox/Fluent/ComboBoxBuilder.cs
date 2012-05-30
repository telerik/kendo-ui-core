namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using System;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ComboBox"/> component.
    /// </summary>
    public class ComboBoxBuilder : ViewComponentBuilderBase<ComboBox, ComboBoxBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ComboBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ComboBoxBuilder(ComboBox component)
            : base(component)
        {
        }

        public ComboBoxBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public ComboBoxBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        public ComboBoxBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        public ComboBoxBuilder BindTo(IEnumerable data)
        {
            Component.DataSource.Data = data;

            return this;
        } 

        public ComboBoxBuilder Events(Action<DropDownEventBuilderBase> clientEventsAction)
        {
            clientEventsAction(new DropDownEventBuilderBase(Component.Events));

            return this;
        }

        public ComboBoxBuilder DataTextField(string field)
        {
            Component.DataTextField = field;

            return this;
        }

        public ComboBoxBuilder DataValueField(string field)
        {
            Component.DataValueField = field;

            return this;
        }

        public ComboBoxBuilder DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        public ComboBoxBuilder Delay(int delay)
        {

            Component.Delay = delay;

            return this;
        }

        /// <summary>
        /// Enables or disables the combobox.
        /// </summary>
        public ComboBoxBuilder Enable(bool value)
        {
            Component.Enabled = value;

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
        /// Use it to enable case insensitive bahavior of the combobox. If true the combobox will select the first matching item ignoring its casing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .IgnoreCase(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxBuilder IgnoreCase(bool ignoreCase)
        {

            Component.IgnoreCase = ignoreCase;

            return this;
        }

        public ComboBoxBuilder Height(int height)
        {

            Component.Height = height;

            return this;
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

        public ComboBoxBuilder Suggest(bool suggest)
        {
            Component.Suggest = suggest;

            return this;
        }

        public ComboBoxBuilder Placeholder(string placeholder)
        {
            Component.Placeholder = placeholder;

            return this;
        }

        public ComboBoxBuilder Template(string template)
        {

            Component.Template = template;

            return this;
        }

        public ComboBoxBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }
    }
}