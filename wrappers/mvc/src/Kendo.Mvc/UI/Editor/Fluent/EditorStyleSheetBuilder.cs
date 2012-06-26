namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the Editor stylesheets.
    /// </summary>
    public class EditorStyleSheetBuilder : IHideObjectMembers
    {
        private IList<string> stylesheets;

        public EditorStyleSheetBuilder(IList<string> stylesheets)
        {
            this.stylesheets = stylesheets;
        }

        public EditorStyleSheetBuilder Add(string url)
        {
            stylesheets.Add(url);

            return this;
        }
    }
}