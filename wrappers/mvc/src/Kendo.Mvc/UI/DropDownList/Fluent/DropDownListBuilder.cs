namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;
    using System.Collections.Generic;

    using Extensions;
    using Infrastructure;


    public class DropDownListBuilder : DropDownBuilderBase<DropDownList, DropDownListBuilder>
    {
        public DropDownListBuilder(DropDownList component)
            : base(component)
        {
        }

        /// <summary>
        /// Use it to set selected item index
        /// </summary>
        /// <param name="index">Item index.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .SelectedIndex(0);
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder SelectedIndex(int index)
        {
            Guard.IsNotNegative(index, "index");

            Component.SelectedIndex = index;

            return this;
        }

        /// <summary>
        /// Enables or disables the dropdownlist.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public DropDownListBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }

        // <summary>
        /// Defines the delay (ms) after which filtering buffer is cleared.
        /// </summary>
        /// <param name="value">The delay in milliseconds.</param>
        /// <returns></returns>
        public DropDownListBuilder Delay(int value)
        {
            Component.Delay = value;

            return this;
        }
    }
}