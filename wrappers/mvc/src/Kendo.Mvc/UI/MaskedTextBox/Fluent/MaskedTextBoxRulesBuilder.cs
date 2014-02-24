namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;

    /// <summary>
    /// Defines the fluent interface for configuring the NumericTextBox events.
    /// </summary>
    public class MaskedTextBoxRulesBuilder : IHideObjectMembers
    {
        protected IDictionary<string, object> Rules { get; private set; }

        public MaskedTextBoxRulesBuilder(IDictionary<string, object> rules)
        {
            Rules = rules;
        }

        /// <summary>
        ///  Adds custom mask rule.
        /// </summary>
        /// <param name="name">The name of the rule.</param>
        /// <param name="regexp">The JavaScript RegExp object assigned to defined rule.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().MaskedTextBox()
        ///            .Name("MaskedTextBox")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public MaskedTextBoxRulesBuilder Add(char name, string regexp)
        {
            Rules[name.ToString()] = new ClientHandlerDescriptor { HandlerName = regexp };

            return this;
        }

        /// <summary>
        ///  Adds custom mask rule.
        /// </summary>
        /// <param name="name">The name of the rule.</param>
        /// <param name="handler">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().MaskedTextBox()
        ///            .Name("MaskedTextBox")
        ///            .Events(events => events.Change(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///  )
        /// </code>
        /// </example>
        public MaskedTextBoxRulesBuilder Add(char name, Func<object, object> handler)
        {
            Rules[name.ToString()] = new ClientHandlerDescriptor { TemplateDelegate = handler };

            return this;
        }
    }
}
