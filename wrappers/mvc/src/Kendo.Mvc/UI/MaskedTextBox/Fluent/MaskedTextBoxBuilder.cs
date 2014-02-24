namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="MaskedTextBox"/> component.
    /// </summary>
    public class MaskedTextBoxBuilder : WidgetBuilderBase<MaskedTextBox, MaskedTextBoxBuilder>
    {
        public MaskedTextBoxBuilder(MaskedTextBox component)
            : base(component)
        { }

        /// <summary>
        /// Sets the initial value of the MaskedTextBox.
        /// </summary>
        public MaskedTextBoxBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }

        /// <summary>
        /// Specifies the character used to represent the absence of user input in the widget
        /// </summary>
        public MaskedTextBoxBuilder PromptChar(string promptChar)
        {
            Component.PromptChar = promptChar;

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="EventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MaskedTextBox()
        ///             .Name("MaskedTextBox")
        ///             .Events(events =>
        ///                 events.Change("change")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MaskedTextBoxBuilder Events(Action<MaskedTextBoxEventBuilder> EventsAction)
        {

            EventsAction(new MaskedTextBoxEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Configures the custom rules.
        /// </summary>
        /// <param name="RulesAction">The rules action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MaskedTextBox()
        ///             .Name("MaskedTextBox")
        ///             .Rules(rules =>
        ///                 rules.Add("~", "/[+-]/")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MaskedTextBoxBuilder Rules(Action<MaskedTextBoxRulesBuilder> RulesAction)
        {
            Component.Rules.Clear();

            RulesAction(new MaskedTextBoxRulesBuilder(Component.Rules));

            return this;
        }

        /// <summary>
        /// Enables or disables the textbox.
        /// </summary>
        /// <param name="allowSpinner"></param>
        /// <returns></returns>
        public MaskedTextBoxBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }

        /// <summary>
        /// Sets the mask of the MaskedTextBox.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MaskedTextBox()
        ///             .Name("MaskedTextBox")
        ///             .Mask("999 000 000")
        /// %&gt;
        /// </code>
        /// </example>
        public MaskedTextBoxBuilder Mask(string mask)
        {

            Component.Mask = mask;

            return this;
        }

        /// <summary>
        /// Specifies the culture info used by the MaskedTextBox widget.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MaskedTextBox()
        ///             .Name("MaskedTextBox")
        ///             .Culture("de-DE")
        /// %&gt;
        /// </code>
        /// </example>
        public MaskedTextBoxBuilder Culture(string culture)
        {
            Component.Culture = culture;

            return this;
        }
    }
}