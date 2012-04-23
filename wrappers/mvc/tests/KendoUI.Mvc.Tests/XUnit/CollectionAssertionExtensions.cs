namespace Xunit
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    /// <summary>
    /// Extensions which provide assertions to classes derived from <see cref="IEnumerable"/> and <see cref="IEnumerable&lt;T&gt;"/>.
    /// </summary>
    public static class CollectionAssertExtensions
    {
        /// <summary>
        /// Verifies that a collection is empty.
        /// </summary>
        /// <param name="collection">The collection to be inspected</param>
        /// <exception cref="ArgumentNullException">Thrown when the collection is null</exception>
        public static void ShouldBeEmpty(this IEnumerable collection)
        {
            Assert.Empty(collection);
        }

        /// <summary>
        /// Verifies that a collection contains a given object.
        /// </summary>
        /// <typeparam name="T">The type of the object to be verified</typeparam>
        /// <param name="collection">The collection to be inspected</param>
        /// <param name="expected">The object expected to be in the collection</param>
        public static void ShouldContain<T>(this IEnumerable<T> collection,
                                            T expected)
        {
            Assert.Contains(expected, collection);
        }

        /// <summary>
        /// Verifies that a collection contains a given object, using a comparer.
        /// </summary>
        /// <typeparam name="T">The type of the object to be verified</typeparam>
        /// <param name="collection">The collection to be inspected</param>
        /// <param name="expected">The object expected to be in the collection</param>
        /// <param name="comparer">The comparer used to equate objects in the collection with the expected object</param>
        public static void ShouldContain<T>(this IEnumerable<T> collection,
                                            T expected,
                                            IEqualityComparer<T> comparer)
        {
            Assert.Contains(expected, collection, comparer);
        }

        /// <summary>
        /// Verifies that a collection is not empty.
        /// </summary>
        /// <param name="collection">The collection to be inspected</param>
        /// <exception cref="ArgumentNullException">Thrown when a null collection is passed</exception>
        public static void ShouldNotBeEmpty(this IEnumerable collection)
        {
            Assert.NotEmpty(collection);
        }

        /// <summary>
        /// Verifies that a collection does not contain a given object.
        /// </summary>
        /// <typeparam name="T">The type of the object to be compared</typeparam>
        /// <param name="expected">The object that is expected not to be in the collection</param>
        /// <param name="collection">The collection to be inspected</param>
        public static void ShouldNotContain<T>(this IEnumerable<T> collection,
                                               T expected)
        {
            Assert.DoesNotContain(expected, collection);
        }

        /// <summary>
        /// Verifies that a collection does not contain a given object, using a comparer.
        /// </summary>
        /// <typeparam name="T">The type of the object to be compared</typeparam>
        /// <param name="expected">The object that is expected not to be in the collection</param>
        /// <param name="collection">The collection to be inspected</param>
        /// <param name="comparer">The comparer used to equate objects in the collection with the expected object</param>
        public static void ShouldNotContain<T>(this IEnumerable<T> collection,
                                               T expected,
                                               IEqualityComparer<T> comparer)
        {
            Assert.DoesNotContain(expected, collection, comparer);
        }
    }
}