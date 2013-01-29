namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DatePickerBase"/> component.
    /// </summary>
    public class FlatColorPickerBuilder : WidgetBuilderBase<FlatColorPicker, FlatColorPickerBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FlatColorPickerBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public FlatColorPickerBuilder(FlatColorPicker component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().FlatColorPicker()
        ///             .Name("FlatColorPicker")
        ///             .Events(events =>
        ///                 events.Select("select").Change("change")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public FlatColorPickerBuilder Events(Action<SimpleColorPickerEventBuilder> clientEventsAction)
        {
            clientEventsAction(new SimpleColorPickerEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Sets the value of the picker input
        /// </summary>
        /// <param name="color">The initially selected color</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().FlatColorPicker()
        ///             .Name("FlatColorPicker")
        ///             .Value("#ff0000")
        /// %&gt;
        /// </code>
        /// </example>
        public FlatColorPickerBuilder Value(string color)
        {
            Component.Value = color;

            return this;
        }

        /// <summary>
        /// Indicates whether the picker will allow transparent colors to be picked.
        /// </summary>
        /// <param name="allowOpacity">Whether the user is allowed to change the color opacity.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().FlatColorPicker()
        ///             .Name("FlatColorPicker")
        ///             .Opacity(true)
        /// %&gt;
        /// </code>
        /// </example>
        public FlatColorPickerBuilder Opacity(bool allowOpacity)
        {
            Component.Opacity = allowOpacity;

            return this;
        }

        /// <summary>
        /// Indicates whether the picker will show an input for entering colors.
        /// </summary>
        /// <param name="showInput">Whether the input field should be shown.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().FlatColorPicker()
        ///             .Name("FlatColorPicker")
        ///             .Input(false)
        /// %&gt;
        /// </code>
        /// </example>
        public FlatColorPickerBuilder Input(bool showInput)
        {
            Component.Input = showInput;

            return this;
        }

        /// <summary>
        /// Indicates whether the picker will show a preview of the selected color.
        /// </summary>
        /// <param name="showPreview">Whether the preview area should be shown.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().FlatColorPicker()
        ///             .Name("FlatColorPicker")
        ///             .Preview(false)
        /// %&gt;
        /// </code>
        /// </example>
        public FlatColorPickerBuilder Preview(bool showPreview)
        {
            Component.Preview = showPreview;

            return this;
        }

        /// <summary>
        /// Indicates whether the picker will show apply / cancel buttons.
        /// </summary>
        /// <param name="showButtons">Whether the buttons should be shown.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().FlatColorPicker()
        ///             .Name("FlatColorPicker")
        ///             .Buttons(false)
        /// %&gt;
        /// </code>
        /// </example>
        public FlatColorPickerBuilder Buttons(bool showButtons)
        {
            Component.Buttons = showButtons;

            return this;
        }
    }
}