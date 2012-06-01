namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;


    public class DropDownListBuilderBase<TDropDown, TDropDownBuilder> : ViewComponentBuilderBase<TDropDown, TDropDownBuilder>, IHideObjectMembers
        where TDropDown : DropDownListBase
        where TDropDownBuilder : ViewComponentBuilderBase<TDropDown, TDropDownBuilder>
    {
        public DropDownListBuilderBase(TDropDown component)
            : base(component)
        {
        }

        public TDropDownBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder BindTo(IEnumerable data)
        {
            Component.DataSource.Data = data;

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder Events(Action<DropDownListEventBuilderBase> clientEventsAction)
        {
            clientEventsAction(new DropDownListEventBuilderBase(Component.Events));

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder DataTextField(string field)
        {
            Component.DataTextField = field;

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder Delay(int delay)
        {
            Component.Delay = delay;

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Enables or disables the combobox.
        /// </summary>
        public TDropDownBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this as TDropDownBuilder;
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
        public TDropDownBuilder IgnoreCase(bool ignoreCase)
        {
            Component.IgnoreCase = ignoreCase;

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder Height(int height)
        {
            Component.Height = height;

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder Template(string template)
        {
            Component.Template = template;

            return this as TDropDownBuilder;
        }

        public TDropDownBuilder Value(string value)
        {
            Component.Value = value;

            return this as TDropDownBuilder;
        }
    }
}
