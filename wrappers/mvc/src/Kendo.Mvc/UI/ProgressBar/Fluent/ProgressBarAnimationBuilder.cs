namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the <see cref="ProgressBarAnimation"/> object.
    /// </summary>
    public class ProgressBarAnimationBuilder
    {
        public ProgressBarAnimationBuilder(ProgressBarAnimation animation)
        {
            Animation = animation;
        }

        protected ProgressBarAnimation Animation
        {
            get;
            private set;
        }

        /// <summary>
        /// Enables or disables the progress animation
        /// </summary>
        /// <param name="enable">The boolean value</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().ProgressBar()
        ///     .Name(&quot;progressBar&quot;)
        ///     .Animation(a => a.Enable(false))
        /// %&gt;
        /// </code>
        /// </example>
        public ProgressBarAnimationBuilder Enable(bool enable)
        {
            Animation.Enable = enable;

            return this;
        }

        /// <summary>
        /// Specifies the duration of the progress animation
        /// </summary>
        /// <param name="enable">The boolean value</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().ProgressBar()
        ///     .Name(&quot;progressBar&quot;)
        ///     .Animation(a => a.Duration(200))
        /// %&gt;
        /// </code>
        /// </example>
        public ProgressBarAnimationBuilder Duration(int value)
        {
            Animation.Duration = value;

            return this;
        }
    }
}
