namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Define the fluent interface for configuring the <see cref="ProgressBar"/> component.
    /// </summary>
    public class ProgressBarBuilder : WidgetBuilderBase<ProgressBar, ProgressBarBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ProgressBarBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ProgressBarBuilder(ProgressBar component)
            : base(component)
        { 
        }

        /// <summary>
        /// Use to enable or disable the animation.
        /// </summary>
        /// <param name="enable">The boolean value.</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Animation(bool enable)
        {
            Component.Animation.Enable = enable;

            return this;
        }

        /// <summary>
        /// Configures the animation effects.
        /// </summary>
        /// <param name="animationAction">The action which configures the animation effects.</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Animation(Action<ProgressBarAnimationBuilder> animationAction)
        {
            animationAction(new ProgressBarAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Sets the number of chunks to which the ProgressBar will be divided (applies only when type is "chunk")
        /// </summary>
        /// <param name="count">The number of chunks</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder ChunkCount(int count)
        {
            Component.ChunkCount = count;

            return this;
        }

        /// <summary>
        /// Enables or disables the component
        /// </summary>
        /// <param name="value">true if the component should be enabled, false otherwise; the default is true.</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Enable(bool value)
        {
            Component.Enable = value;

            return this;
        }

        /// <summary>
        /// Sets the maximum value of the ProgressBar
        /// </summary>
        /// <param name="value">Integer specifying the maximum value</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Max(int value)
        {
            Component.Max = value;

            return this;
        }

        /// <summary>
        /// Sets the minimum value of the ProgressBar
        /// </summary>
        /// <param name="value">Integer specifying the minimum value</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Min(int value)
        {
            Component.Min = value;

            return this;
        }

        /// <summary>
        /// Sets the orientation of the ProgressBar
        /// </summary>
        /// <param name="orientation">ProgressBarOrientation enumeration specifying the orientation</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Orientation(ProgressBarOrientation orientation)
        {
            Component.Orientation = orientation;

            return this;
        }

        /// <summary>
        /// Specifies if the ProgressBar direction will be reversed
        /// </summary>
        /// <param name="value">The boolean value</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Reverse(bool value)
        {
            Component.Reverse = value;

            return this;
        }

        /// <summary>
        /// Specifies if the Progress status will be displayed
        /// </summary>
        /// <param name="value">The boolean value</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder ShowStatus(bool value)
        {
            Component.ShowStatus = value;

            return this;
        }

        /// <summary>
        /// Specifies the type of the ProgressBar
        /// </summary>
        /// <param name="type">ProgressBarType enumeration specifying the type</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Type(ProgressBarType type)
        {
            Component.Type = type;

            return this;
        }

        /// <summary>
        /// Sets the current value of the ProgressBar
        /// </summary>
        /// <param name="value">Integer specifying the value</param>
        /// <example>
        /// <code lang="CS">
        /// 
        /// </code>
        /// </example>
        public ProgressBarBuilder Value(int value)
        {
            Component.Value = value;

            return this;
        }
    }
}
