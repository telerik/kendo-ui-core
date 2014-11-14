namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DiagramPdfMarginSettings settings.
    /// </summary>
    public class DiagramPdfMarginSettingsBuilder<TShapeModel,TConnectionModel>: IHideObjectMembers where TShapeModel : class  where TConnectionModel : class
    {
        private readonly DiagramPdfMarginSettings container;

        public DiagramPdfMarginSettingsBuilder(DiagramPdfMarginSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The bottom margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the bottom.</param>
        public DiagramPdfMarginSettingsBuilder<TShapeModel,TConnectionModel> Bottom(double value)
        {
            container.Bottom = value;

            return this;
        }
        
        /// <summary>
        /// The left margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the left.</param>
        public DiagramPdfMarginSettingsBuilder<TShapeModel,TConnectionModel> Left(double value)
        {
            container.Left = value;

            return this;
        }
        
        /// <summary>
        /// The right margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the right.</param>
        public DiagramPdfMarginSettingsBuilder<TShapeModel,TConnectionModel> Right(double value)
        {
            container.Right = value;

            return this;
        }
        
        /// <summary>
        /// The top margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value that configures the top.</param>
        public DiagramPdfMarginSettingsBuilder<TShapeModel,TConnectionModel> Top(double value)
        {
            container.Top = value;

            return this;
        }
        
        //<< Fields
    }
}

