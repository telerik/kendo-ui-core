namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class DiagramConnectionModelDescriptorFactory<TModel> : DataSourceModelDescriptorFactory<TModel>, IHideObjectMembers
        where TModel : class
    {
        private DiagramConnectionModelDescriptor shapeModel;

        public DiagramConnectionModelDescriptorFactory(DiagramConnectionModelDescriptor model)
            : base(model)
        {
            shapeModel = model;
        }

        /// <summary>
        /// Specify the member used for the from.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void From<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.From = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the from.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void From(string fieldName)
        {
            shapeModel.From = fieldName;
        }

        /// <summary>
        /// Specify the member used for the To.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void To<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.To = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the height.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void To(string fieldName)
        {
            shapeModel.To = fieldName;
        }

        /// <summary>
        /// Specify the member used for the fromX.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void FromX<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.FromX = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the fromX.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void FromX(string fieldName)
        {
            shapeModel.FromX = fieldName;
        }

        /// <summary>
        /// Specify the member used for the fromY.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void FromY<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.FromY = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the fromY.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void FromY(string fieldName)
        {
            shapeModel.FromY = fieldName;
        }

        /// <summary>
        /// Specify the member used for the toX.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void ToX<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.ToX = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the toX.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void ToX(string fieldName)
        {
            shapeModel.ToX = fieldName;
        }

        /// <summary>
        /// Specify the member used for the toY.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public void ToY<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            shapeModel.ToY = expression.MemberWithoutInstance();
        }

        /// <summary>
        /// Specify the member used for the toY.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public void ToY(string fieldName)
        {
            shapeModel.ToY = fieldName;
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
