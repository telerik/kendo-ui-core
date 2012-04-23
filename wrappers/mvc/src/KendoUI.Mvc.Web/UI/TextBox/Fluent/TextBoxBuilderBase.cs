// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TextBoxBase"/> component.
    /// </summary>
    public class TextBoxBuilderBase<T, TViewComponent, TBuilder> : ViewComponentBuilderBase<TViewComponent, TBuilder>, IHideObjectMembers 
        where T : struct
        where TViewComponent : TextBoxBase<T>
        where TBuilder : TextBoxBuilderBase<T, TViewComponent, TBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TextBoxBaseBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TextBoxBuilderBase(TViewComponent component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the initial value of the textbox.
        /// </summary>
        public TBuilder Value(T? value)
        {
            Component.Value = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the step, used ti increment/decrement the value of the textbox.
        /// </summary>
        public TBuilder IncrementStep(T step)
        {
            Guard.IsNotNull(step, "step");

            Component.IncrementStep = step;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the minimal possible value allowed to the user.
        /// </summary>
        public TBuilder MinValue(T? minValue)
        {
            Component.MinValue = minValue;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the maximal possible value allowed to the user.
        /// </summary>
        public TBuilder MaxValue(T? maxValue)
        {
            Component.MaxValue = maxValue;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the group size of the number.
        /// </summary>
        public TBuilder NumberGroupSize(int size)
        {
            Guard.IsNotNull(size, "size");

            Component.NumberGroupSize = size;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the group separator of the number.
        /// </summary>
        public TBuilder NumberGroupSeparator(string separator)
        {
            Guard.IsNotNull(separator, "separator");

            Component.NumberGroupSeparator = separator;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the index of the negative pattern.
        /// </summary>
        public TBuilder NegativePatternIndex(int negativePatternIndex)
        {
            Guard.IsNotNull(negativePatternIndex, "negativePatternIndex");

            Component.NegativePatternIndex = negativePatternIndex;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the text which will be displayed if the textbox is empty.
        /// </summary>
        public TBuilder EmptyMessage(string emptyMessage)
        {
            Component.EmptyMessage = emptyMessage;

            return this as TBuilder;
        }

        /// <summary>
        /// Enables or disables the spin buttons.
        /// </summary>
        /// <param name="allowSpinner"></param>
        /// <returns></returns>
        public TBuilder Spinners(bool allowSpinner)
        {
            Component.Spinners = allowSpinner;

            return this as TBuilder;
        }

        /// <summary>
        /// Define the tooltip text of the up button.
        /// </summary>
        public TBuilder ButtonTitleUp(string buttonTileUp)
        {
            Guard.IsNotNullOrEmpty(buttonTileUp, "buttonTileUp");

            Component.ButtonTitleUp = buttonTileUp;

            return this as TBuilder;
        }

        /// <summary>
        /// Define the tooltip text of the down button.
        /// </summary>
        public TBuilder ButtonTitleDown(string buttonTileDown)
        {
            Guard.IsNotNullOrEmpty(buttonTileDown, "buttonTileDown");

            Component.ButtonTitleDown = buttonTileDown;

            return this as TBuilder;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().NumericTextBox()
        ///             .Name("NumericTextBox")
        ///             .ClientEvents(events =>
        ///                 events.OnLoad("onLoad").OnChange("onChange")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder ClientEvents(Action<TextBoxBaseClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new TextBoxBaseClientEventsBuilder(Component.ClientEvents, Component.ViewContext));

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the Input HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public TBuilder InputHtmlAttributes(object attributes)
        {
            return InputHtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the Input HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        public TBuilder InputHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            Component.InputHtmlAttributes.Clear();
            Component.InputHtmlAttributes.Merge(attributes);

            return this as TBuilder;
        }

        /// <summary>
        /// Enables or disables the textbox.
        /// </summary>
        /// <param name="allowSpinner"></param>
        /// <returns></returns>
        public TBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this as TBuilder;
        }
    }
}