namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Specifies the animation duration of item.
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Need to align with the numeric value of the named animation.")]
    public enum AnimationDuration
    {
        /// <summary>
        /// Fast animation, duration is set to 200.
        /// </summary>
        Fast = 200,

        /// <summary>
        /// Normal animation, duration is set to 400.
        /// </summary>
        Normal = 400,

        /// <summary>
        /// Slow animation, duration is set to 600.
        /// </summary>
        Slow = 600
    }
}