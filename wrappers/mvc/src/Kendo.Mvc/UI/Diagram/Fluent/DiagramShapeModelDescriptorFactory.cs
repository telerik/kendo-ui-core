namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class DiagramShapeModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactory<TModel>, IHideObjectMembers
        where TModel : class
    {
        private DiagramShapeModelDescriptor shapeModel;

        public DiagramShapeModelDescriptorFactory(DiagramShapeModelDescriptor model)
            : base(model)
        {
            shapeModel = model;
        }

        /// <summary>
        /// Specify the member used for the width.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void Width<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.Width = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the width.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void Width(string fieldName)
        {
            shapeModel.Width = fieldName;
        }

        /// <summary>
        /// Specify the member used for the height.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void Height<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.Height = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the height.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void Height(string fieldName)
        {
            shapeModel.Height = fieldName;
        }

        /// <summary>
        /// Specify the member used for the x.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void X<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.X = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the x.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void X(string fieldName)
        {
            shapeModel.X = fieldName;
        }

        /// <summary>
        /// Specify the member used for the y.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void Y<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.Y = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the y.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void Y(string fieldName)
        {
            shapeModel.Y = fieldName;
        }

        /// <summary>
        /// Specify the member used for the type.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void Type<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.Type = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the type.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void Type(string fieldName)
        {
            shapeModel.Type = fieldName;
        }

        /// <summary>
        /// Specify the member used for the text.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void Text<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.Text = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the text.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void Text(string fieldName)
        {
            shapeModel.Text = fieldName;
        }
    }
}
