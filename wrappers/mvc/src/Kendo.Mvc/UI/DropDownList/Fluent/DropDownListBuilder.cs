namespace Kendo.Mvc.UI.Fluent
{
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

        public DropDownListBuilder DataValueField(string field)
        {
            Component.DataValueField = field;

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

        public DropDownListBuilder OptionLabel(string optionLabel)
        {
            Component.OptionLabel = optionLabel;

            return this;
        }
    }
}