namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListPdfMarginSettings settings.
    /// </summary>
    public class TreeListPdfMarginSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListPdfMarginSettings container;

        public TreeListPdfMarginSettingsBuilder(TreeListPdfMarginSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The bottom margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the bottom.</param>
        public TreeListPdfMarginSettingsBuilder<T> Bottom(double value)
        {
            container.Bottom = value;

            return this;
        }
        
        /// <summary>
        /// The left margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the left.</param>
        public TreeListPdfMarginSettingsBuilder<T> Left(double value)
        {
            container.Left = value;

            return this;
        }
        
        /// <summary>
        /// The right margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the right.</param>
        public TreeListPdfMarginSettingsBuilder<T> Right(double value)
        {
            container.Right = value;

            return this;
        }
        
        /// <summary>
        /// The top margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the top.</param>
        public TreeListPdfMarginSettingsBuilder<T> Top(double value)
        {
            container.Top = value;

            return this;
        }
        
        //<< Fields
    }
}

