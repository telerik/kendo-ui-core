namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;


    public class DropDownListBuilderBase<TDropDown, TDropDownBuilder> : ListBuilderBase<TDropDown, TDropDownBuilder>, IHideObjectMembers
        where TDropDown : DropDownListBase
        where TDropDownBuilder : WidgetBuilderBase<TDropDown, TDropDownBuilder>
    {
        public DropDownListBuilderBase(TDropDown component)
            : base(component)
        {
        }

        /// <summary>
        /// Template to be used for rendering the items in the list.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Template("#= data #")
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder Template(string template)
        {
            Component.Template = template;

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// TemplateId to be used for rendering the items in the list.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .TemplateId("widgetTemplateId")
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder TemplateId(string templateId)
        {
            Component.TemplateId = templateId;

            return this as TDropDownBuilder;
        }

        /// <summary>
        /// Sets the value of the widget.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Value("1")
        /// %&gt;
        /// </code>
        /// </example>
        public TDropDownBuilder Value(string value)
        {
            Component.Value = value;

            return this as TDropDownBuilder;
        }
    }
}
