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

        public ProgressBarAnimationBuilder Enable(bool enable)
        {
            Animation.Enable = enable;

            return this;
        }

        public ProgressBarAnimationBuilder Duration(int value)
        {
            Animation.Duration = value;

            return this;
        }
    }
}
