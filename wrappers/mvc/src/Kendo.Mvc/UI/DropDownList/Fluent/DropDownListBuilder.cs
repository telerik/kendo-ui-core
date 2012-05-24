namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using System;
    using System.Collections;


    public class DropDownListBuilder : DropDownBuilderBase<DropDownList, DropDownListBuilder>
    {
        public DropDownListBuilder(DropDownList component)
            : base(component)
        {
        }


        public DropDownListBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public DropDownListBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            Guard.IsNotNull(animationAction, "animationAction");

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        public DropDownListBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        public DropDownListBuilder BindTo(IEnumerable data)
        {
            Component.DataSource.Data = data;

            return this;
        }

        public DropDownListBuilder ClientEvents(Action<DropDownBaseClientEventsBuilder> clientEventsAction)
        {
            clientEventsAction(new DropDownBaseClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        public DropDownListBuilder DataTextField(string field)
        {
            Component.DataTextField = field;

            return this;
        }

        public DropDownListBuilder DataValueField(string field)
        {
            Component.DataValueField = field;

            return this;
        }

        public DropDownListBuilder DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        public DropDownListBuilder Delay(int delay)
        {
            Guard.IsNotNegative(delay, "delay");

            Component.Delay = delay;

            return this;
        }

        /// <summary>
        /// Enables or disables the combobox.
        /// </summary>
        public DropDownListBuilder Enable(bool value)
        {
            Component.Enabled = value;

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
        public DropDownListBuilder IgnoreCase(bool ignoreCase)
        {
            Guard.IsNotNull(ignoreCase, "ignoreCase");

            Component.IgnoreCase = ignoreCase;

            return this;
        }

        public DropDownListBuilder Height(int height)
        {
            Guard.IsNotNegative(height, "height");

            Component.Height = height;

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
        public DropDownListBuilder SelectedIndex(int index)
        {
            if (index != -1)
            {
                Guard.IsNotNegative(index, "index");
            }

            Component.SelectedIndex = index;

            return this;
        }

        public DropDownListBuilder OptionLabel(string optionLabel)
        {
            Component.OptionLabel = optionLabel;

            return this;
        }

        public DropDownListBuilder Template(string template)
        {
            Guard.IsNotNullOrEmpty(template, "template");

            Component.Template = template;

            return this;
        }

        public DropDownListBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }
    }
}