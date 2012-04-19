namespace Xunit
{
    /// <summary>
    /// Extensions which provide assertions to classes derived from <see cref="bool"/>.
    /// </summary>
    public static class BooleanAssertionExtensions
    {
        /// <summary>
        /// Verifies that the condition is false.
        /// </summary>
        /// <param name="condition">The condition to be tested</param>
        public static void ShouldBeFalse(this bool condition)
        {
            Assert.False(condition);
        }

        /// <summary>
        /// Verifies that the condition is false.
        /// </summary>
        /// <param name="condition">The condition to be tested</param>
        /// <param name="userMessage">The message to show when the condition is not false</param>
        public static void ShouldBeFalse(this bool condition,
                                         string userMessage)
        {
            Assert.False(condition, userMessage);
        }

        /// <summary>
        /// Verifies that an expression is true.
        /// </summary>
        /// <param name="condition">The condition to be inspected</param>
        public static void ShouldBeTrue(this bool condition)
        {
            Assert.True(condition);
        }

        /// <summary>
        /// Verifies that an expression is true.
        /// </summary>
        /// <param name="condition">The condition to be inspected</param>
        /// <param name="userMessage">The message to be shown when the condition is false</param>
        public static void ShouldBeTrue(this bool condition,
                                        string userMessage)
        {
            Assert.True(condition, userMessage);
        }
    }
}