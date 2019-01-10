(function() {

    var container,
        Validator = kendo.ui.Validator;

    function setup(element, options) {
        if (!element.parent().length) {
            element.appendTo(container);
        }
        return new Validator(element, $.extend({}, options));
    }

    describe("kendo.ui.validation", function () {
        beforeEach(function() {
            kendo.ns = "kendo-";

            Mocha.fixture.append(
                '<script id="template" type="text/x-kendo-template">' +
                '<span>template text</span>' +
                '</script>'
            );
            container = $("<div/>").appendTo("<form/>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);

            kendo.ns = "";
            kendo.ui.validator = { rules: {}, messages: {} };
            container.remove();
        });

        it("validate returns false for empty input with attribute required", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate triggers validate event", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input, {
                    validate: function(e) {
                        assert.isOk(!e.valid);
                    }
                });

            validator.validate();
        });

        it("validate returns true for non empty input with attribute required", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            input.val("someValue");

            assert.isOk(validator.validate());
        });

        it("validate returns true for non empty input with attribute required which is initially invalid", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            assert.isOk(!validator.validate());

            input.val("someValue");

            assert.isOk(validator.validate());
        });

        it("checkValidity returns true for non empty input with attribute required", function() {
            var input = $('<input type="text" required="required" />'),
                validator = setup(input);

            input.val("someValue");

            assert.isOk(validator._checkValidity(input));
        });

        it("validates multiple input elements if initialized with container", function() {
            container.append($('<input type="text" required="required" /><input type="text" required="required" />'));
            var validator = setup(container);
            assert.isOk(!validator.validate());
        });

        it("validate returns false if at least one element is invalid", function() {
            container.append($('<input type="text" required="required" value="1" /><input type="text" required="required" />'));
            var validator = setup(container);
            assert.isOk(!validator.validate());
        });

        it("validate returns true if every element is valid", function() {
            container.append($('<input type="text" required="required" value="1" /><input type="text" required="required" value="2" />'));
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate returns true if container does not contain input elements", function() {
            container.append($('<span />'));
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate returns false if checkbox marked as required is not checked", function() {
            container.append($('<input type="checkbox" required />'));
            var validator = setup(container);
            assert.isOk(!validator.validate());
        });

        it("validate returns true if checkbox marked as required is checked", function() {
            container.append($('<input type="checkbox" required checked="checked"/>'));
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate returns false if checkbox marked as required is not checked but have value set", function() {
            container.append($('<input type="checkbox" required value="foo"/>'));
            var validator = setup(container);
            assert.isOk(!validator.validate());
        });

        it("validate returns true if checkbox marked as required is checked and have value set", function() {
            container.append($('<input type="checkbox" required value="foo" checked="checked" />'));
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate returns false if multi select is marked as required and no value is selected", function() {
            container.append($('<select multiple required><option>foo</option></select>'));
            var validator = setup(container);
            assert.isOk(!validator.validate());
        });

        it("validate returns true if multi select is marked as required and value is selected", function() {
            container.append($('<select multiple required><option value="foo" selected="selected">foo</option></select>'));
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate returns false if select is marked as required and option with empty value is selected", function() {
            container.append($('<select required><option value="" selected="selected">foo</option></select>'));
            var validator = setup(container);
            assert.isOk(!validator.validate());
        });

        it("validate returns true container is empty", function() {
            container.empty();
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate does not validate inputs with attribute data-validate set to false", function() {
            container.append($('<input data-kendo-validate="false" required />'));
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate validates input with attribute data-validate set to false if it is initialized on the input", function() {
            var validator = setup($('<input data-kendo-validate="false" required />'));
            assert.isOk(!validator.validate());
        });

        it("validate does not validate checkboxes with attribute data-validate set to false", function() {
            container.append($('<input type="checkbox" data-kendo-validate="false" required />'));
            var validator = setup(container);
            assert.isOk(validator.validate());
        });

        it("validate validates checkbox with attribute data-validate set to false if it is initialized on the checkbox", function() {
            var validator = setup($('<input type="checkbox" data-kendo-validate="false" required />'));
            assert.isOk(!validator.validate());
        });

        it("errors returns empty array if validate is not executed", function() {
            var input = $('<input type="text" required  validationMessage="message" />'),
                validator = setup(input);

            assert.equal(validator.errors().length, 0);
        });

        it("errors returns type specific message if attribute is set for single invalid element", function() {
            var input = $('<input type="text" required  data-kendo-required-msg="required message" validationMessage="message" />'),
                validator = setup(input);

            validator.validate();
            var messages = validator.errors();

            assert.equal(messages.length, 1);
            assert.equal(messages[0], "required message");
        });

        it("errors returns validationMessage attribute value for single invalid element", function() {
            var input = $('<input type="text" required  validationMessage="message" />'),
                validator = setup(input);

            validator.validate();
            var messages = validator.errors();

            assert.equal(messages.length, 1);
            assert.equal(messages[0], "message");
        });

        it("errors returns title if no validationMessage attribute for single invalid element", function() {
            var input = $('<input type="text" required  title="message" />'),
                validator = setup(input);

                validator.validate();
            var messages = validator.errors();
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "message");
        });

        it("errors returns validationMessage if both validationMessage and title are set for single invalid element", function() {
            var input = $('<input type="text" required  title="message" validationMessage="validationMessage"/>'),
                validator = setup(input);

                validator.validate();
            var messages = validator.errors();
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "validationMessage");
        });

        it("errors returns formatted with input name message if set for single invalid element", function() {
            var input = $('<input type="text" name="Foo" required validationMessage="{0} is invalid"/>'),
                validator = setup(input);

            validator.validate();

            var messages = validator.errors();
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "Foo is invalid");
        });

        it("errors returns messages for every invalid element", function() {
            container.append($('<input name="input1" type="text" required="required" title="input1 message" /><input name="input2" type="text" required="required" title="input2 message"/>'));
            var validator = setup(container);

            validator.validate();

            var messages = validator.errors();
            assert.equal(messages.length, 2);
            assert.equal(messages[0], "input1 message");
            assert.equal(messages[1], "input2 message");
        });

        it("errors is cleared if revalidated single input", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            validator.validate();
            input.val("someValue");
            validator.validate();

            var messages = validator.errors();
            assert.equal(messages.length, 0);
        });

        it("errors are reset if element is valid multiple inputs", function() {
            container.append($('<input name="input1" type="text" required="required" title="input1 message" /><input name="input2" type="text" required="required" title="input2 message"/>'));
            var validator = setup(container);

            validator.validate();

            container.find(":input").first().val("someValue");

            validator.validate();

            var messages = validator.errors();
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "input2 message");
        });

        it("existing error message element container is reused", function() {
            container.append($('<input type="text" name="foo" required validationMessage="invalid" /><span>some text</span><span class="k-invalid-msg" data-kendo-for="foo"/>')),
            validator = setup(container, { errorTemplate: "<span>${message}</span>" });
            validator.validate();

            var span = container.find("span");
            assert.isOk(!span.eq(0).hasClass("k-invalid-msg"));
            assert.isOk(span.eq(1).hasClass("k-invalid-msg"));
            assert.isOk(span.eq(1).text(), "invalid");
        });

        it("existing error message element container retains its ID attribute", function() {
            container.append($('<input type="text" name="foo" required /><span class="k-invalid-msg" id="errSpan" data-kendo-for="foo"/>')),
            validator = setup(container, { errorTemplate: "<span>${message}</span>" });
            validator.validate();

            var span = container.find("span");
            assert.isOk(span.eq(0).attr("id"), "errSpan");
        });

        it("existing error message element in multiple containers is reused", function() {
            container.append($('<div></div><div><input type="text" name="foo" required validationMessage="invalid" /><span>some text</span><span class="k-invalid-msg" data-kendo-for="foo"/></div>')),
            validator = setup(container.find("div"), { errorTemplate: "<span>${message}</span>" });
            validator.validate();

            var span = container.find("span");
            assert.isOk(!span.eq(0).hasClass("k-invalid-msg"));
            assert.isOk(span.eq(1).hasClass("k-invalid-msg"));
            assert.isOk(span.eq(1).text(), "invalid");
        });

        it("existing error message element container is reused on multiple validate calls", function() {
            container.append($('<input type="text" name="foo" required validationMessage="invalid" /><span>some text</span><span class="k-invalid-msg" data-kendo-for="foo"/>')),
            validator = setup(container, { errorTemplate: "<span>${message}</span>" });
            validator.validate();
            validator.validate();

            assert.equal(container.find("span.k-invalid-msg").length, 1);
        });

        it("correct error message element container for the validated element is used", function() {
            container.append($('<div><span class="k-invalid-msg" data-kendo-for="foo"/><input type="text" name="foo" required validationMessage="invalid" /><span class="k-invalid-msg" data-kendo-for="someotherfield"/></div>')),
            validator = setup(container);
            validator.validate();

            assert.equal(container.find("span.k-invalid-msg:visible").length, 1);
            assert.isOk(container.find("span[data-kendo-for=foo]").is(":visible"));
        });

        it("error message as external template", function() {
            var input = $('<input type="text" required validationMessage="invalid" />'),
            validator = setup(input, { errorTemplate: $("#template").html() });
            validator.validate();

            assert.equal(input.next("span").text(), "template text");
        });

        it("displayes message next to the validated element", function() {
            var input = $('<input type="text" required validationMessage="invalid" />'),
            validator = setup(input, { errorTemplate: "<span>${message}</span>" });
            validator.validate();

            assert.equal(input.next("span").text(), "invalid");
        });

        it("hideMessages hides the validation message", function() {
            var input = $('<input type="text" required validationMessage="invalid" />'),
            validator = setup(input, { errorTemplate: "<span>${message}</span>" });

            validator.validate();
            validator.hideMessages();

            assert.isOk(!input.next("span").is(":visible"));
        });

        it("hideMessages hides the validation messages for the container", function() {
            container.append($('<input type="text" name="foo" required validationMessage="invalid" /><input type="text" name="bar" required validationMessage="invalid" />')),
            validator = setup(container, { errorTemplate: "<span>${message}</span>" });

            validator.validate();
            validator.hideMessages();

            assert.equal(container.find("span.k-invalid-msg").length, 2);
            assert.isOk(!container.find("span.k-invalid-msg").is(":visible"));
        });

        it("multiple calls to validation does not render multiple messages", function() {
            var input = $('<input type="text" required validationMessage="invalid" />'),
            validator = setup(input, { errorTemplate: "<span>${message}</span>" });

            validator.validate();
            validator.validate();
            validator.validate();

            assert.equal(input.parent().find("span.k-invalid-msg").length, 1);
        });

        it("does not displayes message if element is valid", function() {
            var input = $('<input type="text" required validationMessage="invalid" value="1" />'),
            validator = setup(input);
            validator.validate();

            assert.isOk(!input.next("span").length);
        });

        it("message element is hidden if element change its state from invalid to valid", function() {
            var input = $('<input type="text" required validationMessage="invalid" />'),
                validator = setup(input);

            validator.validate();

            input.val("someValue");

            validator.validate();

            assert.isOk(!input.next("span:visible").length);
        });

        it("message element is hidden if input with $ in the name change its state from invalid to valid ", function() {
            var input = $('<input name="foo$bar" type="text" required validationMessage="invalid" />');
            container.append(input);
            var validator = setup(container);

            validator.validate();

            input.val("someValue");

            validator.validate();

            assert.isOk(!input.next("span:visible").length);
        });

        it("message element is hidden if input with special charecters in the name change its state from invalid to valid ", function() {
            var input = $('<input name="!#$%&()*+,./:;<=>?@[]^`" type="text" required validationMessage="invalid" />');
            container.append(input);
            var validator = setup(container);

            validator.validate();

            input.val("someValue");

            validator.validate();

            assert.isOk(!input.next("span:visible").length);
        });

        it("external message element is shown when validating input with special characters", function() {
            var input = $('<input name="f.b" type="text" required validationMessage="invalid" /><input name="f.b.c" type="hidden" /><span class="k-invalid-msg" data-kendo-for="f.b" id="foo"></span>');
            container.append(input);
            var validator = setup(container);

            validator.validate();

            assert.equal(container.children("span").length, 1);
        });

        it("individualErrors template overrides the default template", function() {
            var input = $('<input type="text" required validationMessage="invalid"/>'),
            validator = setup(input, {
                errorTemplate: "<div>${message}</div>"
            });
            validator.validate();
            assert.equal(input.next("div").text(), "invalid");
        });

        it("validate returns true if input with type=text value does not match min attribute", function() {
            var input = $('<input type="text" value="1" min="10" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=text and data-kendo-type=number value does not match min attribute", function() {
            var input = $('<input type="text" value="1" min="10" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns false if input with type=number value does not match min attribute", function() {
            var input = $('<input type="number" value="1" min="10" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns false if input with type=number value does not match min attribute decimal", function() {
            var input = $('<input type="number" value="10" min="10.10" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=number value does match min attribute decimal", function() {
            var input = $('<input type="number" value="10.10" min="10.10" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with type=number value does match min attribute", function() {
            var input = $('<input type="number" value="11" min="10" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with type=text and data-kendo-type=number value does match min attribute", function() {
            var input = $('<input type="text" value="11" min="10" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with type=number value does have same value as min attribute", function() {
            var input = $('<input type="number" value="10" min="10" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with data-type=number value is bigger than the min attribute when a culture with comma for the decimal separator is used", function() {
            var input = $('<input ' + kendo.attr("type") + '="number" value="10,6" min="10.5" />'),
                validator = setup(input),
                culture = kendo.culture(),
                defaultDecimalSeparator = culture.numberFormat["."],
                defaultGroupSeparator = culture.numberFormat[","];

            culture.numberFormat["."] = ",";
            culture.numberFormat[","] = ".";

            assert.isOk(validator.validate());

            culture.numberFormat["."] = defaultDecimalSeparator;
            culture.numberFormat[","] = defaultGroupSeparator;
        });

        it("validate returns false if input with data-type=number value is smaller than the min attribute when a culture with comma for the decimal separator is used", function() {
            var input = $('<input ' + kendo.attr("type") + '="number" value="10,4" min="10.5" />'),
                validator = setup(input),
                culture = kendo.culture(),
                defaultDecimalSeparator = culture.numberFormat["."],
                defaultGroupSeparator = culture.numberFormat[","];

            culture.numberFormat["."] = ",";
            culture.numberFormat[","] = ".";

            assert.isOk(!validator.validate());

            culture.numberFormat["."] = defaultDecimalSeparator;
            culture.numberFormat[","] = defaultGroupSeparator;
        });

        it("validate returns true if input with type=number value does have same value as max attribute", function() {
            var input = $('<input type="number" value="10" max="10" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=text and data-kendo-type=number value does not match max attribute", function() {
            var input = $('<input type="text" value="11" max="10" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=text and data-kendo-type=number value match max attribute decimal value", function() {
            var input = $('<input type="text" value="10.10" max="10.20" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=text and data-kendo-type=number value does not match max attribute decimal value", function() {
            var input = $('<input type="text" value="10.20" max="10" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with data-type=number value is smaller than the max attribute when a culture with comma for the decimal separator is used", function() {
            var input = $('<input ' + kendo.attr("type") + '="number" value="10,4" max="10.5" />'),
                validator = setup(input),
                culture = kendo.culture(),
                defaultDecimalSeparator = culture.numberFormat["."],
                defaultGroupSeparator = culture.numberFormat[","];

            culture.numberFormat["."] = ",";
            culture.numberFormat[","] = ".";

            assert.isOk(validator.validate());

            culture.numberFormat["."] = defaultDecimalSeparator;
            culture.numberFormat[","] = defaultGroupSeparator;
        });

        it("validate returns false if input with data-type=number value is bigger than the max attribute when a culture with comma for the decimal separator is used", function() {
            var input = $('<input ' + kendo.attr("type") + '="number" value="10,6" max="10.5" />'),
                validator = setup(input),
                culture = kendo.culture(),
                defaultDecimalSeparator = culture.numberFormat["."],
                defaultGroupSeparator = culture.numberFormat[","];

            culture.numberFormat["."] = ",";
            culture.numberFormat[","] = ".";

            assert.isOk(!validator.validate());

            culture.numberFormat["."] = defaultDecimalSeparator;
            culture.numberFormat[","] = defaultGroupSeparator;
        });

        it("validate returns false if input with type=number value does not match max attribute", function() {
            var input = $('<input type="number" value="11" max="10" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=text value does not match max attribute", function() {
            var input = $('<input type="text" value="11" max="10" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with type=number value does match max attribute", function() {
            var input = $('<input type="number" value="9" max="10" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with type=text and data-kendo-type=number value does match step attribute and have min set with three decimal places step", function() {
            var input = $('<input type="text" value="3.5" step="0.001" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with type=text and data-kendo-type=number value does match step attribute and have min set with two decimal places step", function() {
            var input = $('<input type="text" value="3.5" step="0.01" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns true if input with type=text and data-kendo-type=number value does match step attribute and have min set with decimal step", function() {
            var input = $('<input type="text" value="18.1" step="0.1" min="5" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=text and data-kendo-type=number value does not match step attribute and have min set", function() {
            var input = $('<input type="text" value="6" max="10" step="3" min="5" data-kendo-type="number" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns false if input with type=number value does not match step attribute and have min set", function() {
            var input = $('<input type="number" value="6" max="10" step="3" min="5" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=number value does match step attribute and have both max and min set", function() {
            var input = $('<input type="number" value="8" max="10" step="3" min="5" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate step with number with accuracy problem", function() {
            var input = $('<input type="number" value="0.56" step="0.01" min="0" max="1" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate min defaults to 0 if not set and step is set - invalid value", function() {
            var input = $('<input type="number" value="8" step="3" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate min defaults to 0 if not set and step is set - valid value", function() {
            var input = $('<input type="number" value="8" step="4" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=text value does not match pattern attribute", function() {
            var input = $('<input type="text" value="aaa" pattern="\\d"/>'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=text value does match pattern attribute", function() {
            var input = $('<input type="text" value="6" pattern="\\d"/>'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=text and data-kendo-type=email value is not valid email", function() {
            var input = $('<input type="text" value="aaaaa" data-kendo-type="email" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns false if input with type=email value is not valid email", function() {
            var input = $('<input type="email" value="aaaaa" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=email value is valid email", function() {
            var input = $('<input type="email" value="test@test.com" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=email value does not match the pattern", function() {
            var input = $('<input type="email" value="test@test.com" pattern="6test?@\\w+\\.\\w+" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns false if input with type=email value does not match the pattern", function() {
            var input = $('<input type="email" value="6test@test.com" pattern="6test?@\\w+\\.\\w+" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=text and data-kendo-type=url value does not match", function() {
            var input = $('<input type="text" value="test" data-kendo-type="url" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns false if input with type=url value does not match", function() {
            var input = $('<input type="url" value="test" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=url value match", function() {
            var input = $('<input type="url" value="http://www.test.test" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=url value does not match the pattern", function() {
            var input = $('<input type="url" value="http://test.test" pattern="https?://www.+" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=url value does match the pattern", function() {
            var input = $('<input type="url" value="http://www.test.test" pattern="https?://www.+" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=tel value does not match the pattern", function() {
            var input = $('<input type="tel" value="test" pattern="\\d+" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=tel value does match the pattern", function() {
            var input = $('<input type="tel" value="666" pattern="\\d+" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=password value does not match the pattern", function() {
            var input = $('<input type="password" value="aaa" pattern="\\d+" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=password value does match the pattern", function() {
            var input = $('<input type="password" value="666" pattern="\\d+" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate returns false if input with type=search value does not match the pattern", function() {
            var input = $('<input type="search" value="test" pattern="\\d+" />'),
                validator = setup(input);

            assert.isOk(!validator.validate());
        });

        it("validate returns true if input with type=search value does match the pattern", function() {
            var input = $('<input type="search" value="666" pattern="\\d+" />'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("invalid class is added to the invalid inputs", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            validator.validate();

            assert.isOk(input.hasClass("k-invalid"));
        });

        it("valid class is added to the valid inputs", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            input.val(1);

            validator.validate();

            assert.isOk(input.hasClass("k-valid"));
        });

        it("aria-invalid is added to the invalid input", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            validator.validate();

            assert.isOk(input.filter("[aria-invalid]").length);
        });

        it("aria-alert is added to the invalid input message", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            validator.validate();

            assert.isOk(input.next().filter("[role=alert]").length);
        });

        it("aria-invalid is removed after input become valid", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            validator.validate();
            input.val("foo");
            validator.validate();

            assert.isOk(!input.filter("[aria-invalid]").length);
        });

        it("invalid class is not added to a valid input", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            input.val(1);

            validator.validate();

            assert.isOk(!input.hasClass("k-invalid"));
        });

        it("valid class is not added to an invalid input", function() {
        var input = $('<input type="text" required />'),
        validator = setup(input);

        validator.validate();

        assert.isOk(!input.hasClass("k-valid"));
        });

        it("invalid class is removed if an invalid input passes validation", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            validator.validate();

            input.val(1);

            validator.validate();

            assert.isOk(!input.hasClass("k-invalid"));
        });

        it("valid class is removed if a valid input fails validation", function() {
        var input = $('<input type="text" required />'),
        validator = setup(input);

        validator.validate();

        assert.isOk(!input.hasClass("k-valid"));
        });

        it("checkbox field is revalidated on click", function() {
            var input = $('<input type="checkbox" required />'),
                validator = setup(input);

            input.trigger("click");
            input.trigger("click");

            assert.isOk(input.hasClass("k-invalid"));
        });

        it("checkbox field is revalidated on click when validation is attached to the container", function() {
            var container = $('<div><input type="checkbox" required /></div>'),
                validator = setup(container),
                input = container.find("input");

            input.trigger("click");
            input.trigger("click");

            assert.isOk(input.hasClass("k-invalid"));
        });

        it("input fields are not revalidated on click", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            input.trigger("click");
            assert.isOk(!input.hasClass("k-invalid"));
        });

        it("field is revalidated on blur", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            input.trigger("blur");
            assert.isOk(input.hasClass("k-invalid"));
        });

        it("field is not revalidated on blur validateonblur is false", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input, { validateOnBlur: false });

            input.trigger("blur");

            assert.isOk(!input.hasClass("k-invalid"));
        });

        it("multiple errors are not added when invalid input is blured several times", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

            input.trigger("blur");
            input.trigger("blur");
            assert.equal(validator.errors().length, 1);
        });

        it("field is revalidated on blur with container", function() {
            container.append($('<input type="text" required="required" title="input1 message" /><input type="text" required="required" title="input2 message"/>'));
            var validator = setup(container);

            container.find(":input").trigger("blur");
            assert.isOk(container.find(":input").eq(0).hasClass("k-invalid"));
            assert.isOk(container.find(":input").eq(1).hasClass("k-invalid"));
        });

        it("input is not validated on blur if it has the data-validate attribute set to false", function() {
            var input = $('<input data-kendo-validate="false" required />').appendTo(container);
            setup(container);

            input.trigger("blur");
            assert.isOk(!input.hasClass("k-invalid"));
        });

        it("input is validated on blur if it has the data-validate attribute set to false when the validator is initialized on the input", function() {
            var input = $('<input data-kendo-validate="false" required />');
            setup(input);

            input.trigger("blur");
            assert.isOk(input.hasClass("k-invalid"));
        });

        it("checkbox is not validated on click if it has the data-validate attribute set to false", function() {
            var input = $('<input type="checkbox" data-kendo-validate="false" checked="checked" required />').appendTo(container);
            setup(container);

            input.trigger("click");
            assert.isOk(!input.hasClass("k-invalid"));
        });

        it("checkbox is validated on click if it has the data-validate attribute set to false when the validator is initialized on the checkbox", function() {
            var input = $('<input type="checkbox" data-kendo-validate="false" checked="checked" required />');
            setup(input);
            input.trigger("click");
            assert.isOk(input.hasClass("k-invalid"));
        });

        it("message for required is applied", function() {
            var input = $('<input type="text" required />'),
            validator = setup(input, { messages: { required: "Field is required" } });

            validator.validate();

            assert.equal(validator.errors()[0], "Field is required");
        });

        it("message for custom rule is applied with custom rule data attribute value", function() {
            var input = $('<input name="Foo" type="number" data-kendo-custom="42" value="1" />'),
            validator = setup(input, {
                rules: {
                    custom: function() {
                        return false;
                    },
                },
                messages: {
                    custom: "{0}, {1}"
                }
            });

            validator.validate();

            assert.equal(validator.errors()[0], "Foo, 42");
        });

        it("message for min is applied with min attribute value", function() {
            var input = $('<input name="Foo" type="number" min="2" value="1" />'),
            validator = setup(input);

            validator.validate();

            assert.equal(validator.errors()[0], "Foo should be greater than or equal to 2");
        });

        it("message for max is applied with max attribute value", function() {
            var input = $('<input name="Foo" type="number" max="2" value="10" />'),
            validator = setup(input);

            validator.validate();

            assert.equal(validator.errors()[0], "Foo should be smaller than or equal to 2");
        });

        it("message as function", function() {
            var input = $('<input type="text" required />'),
                element,
                validator = setup(input, { messages: {
                        required: function() {
                            element = arguments[0];
                            return "Field is required";
                        }
                }});

            validator.validate();

            assert.equal(validator.errors()[0], "Field is required");
            assert.isOk(element);
        });

        it("custom validation rule is executed", function() {
            var input = $('<input name="Field" type="text" />'),
                element,
                validator = setup(input, {
                    rules: {
                        custom: function() {
                            element = arguments[0];
                            return false
                        }
                    },
                    messages: { custom: "Custom message" }
                });

            assert.isOk(!validator.validate());
            assert.equal(element[0], input[0]);
            assert.equal(validator.errors()[0], "Custom message");
        });

        it("custom validation rule is executed in the context of the validator object", function() {
            var input = $('<input name="Field" type="text" />'),
                element,
                validator = setup(input, {
                    rules: {
                        custom: function() {
                            assert.isOk(this === validator);
                        }
                    },
                    messages: { custom: "Custom message" }
                });

            validator.validate();
        });

        it("form submit is preveneted if container is form element and validation fails", function() {
            container.append($('<form><input type="text" required="required" title="input1 message" /></form>'));
            var validator = setup(container.find("form")),
                called = false;

            container.find("form").bind("submit", function(e) {
                called = true;
                e.preventDefault();
            }).trigger("submit");

            assert.isOk(!called);
        });

        it("form is submited if container is form element and validation pass", function() {
            container.append($('<form><input type="text" required="required" title="input1 message" value="1" /></form>'));
            var validator = setup(container.find("form")),
                called = false;

            container.find("form").bind("submit", function(e) {
                called = true;
                e.preventDefault();
            }).trigger("submit");

            assert.isOk(called);
        });

        it("novalidate is added to the form if container is a form element", function() {
            container.append($('<form><input type="text" required="required" title="input1 message" /></form>'));
            var form = container.find("form"),
                validator = setup(form);

            assert.isOk(form.attr("novalidate"), "novalidate");
        });

        it("validate skips button elements", function() {
            container.append("<button type=button /><input type=submit /><input type=submit />");
            var calledCount = 0,
                validator = setup(container, {
                    rules: {
                        custom: function() {
                            calledCount++;
                            return true;
                        }
                    }
                });

            validator.validate();
            assert.equal(calledCount, 0);
        });

        it("validate skips input[type=submit] elements", function() {
            container.append("<input type=submit />");
            var calledCount = 0,
                validator = setup(container, {
                    rules: {
                        custom: function() {
                            calledCount++;
                            return true;
                        }
                    }
                });

            validator.validate();
            assert.equal(calledCount, 0);
        });

        it("validate skips input[type=button] elements", function() {
            container.append("<input type=button />");
            var calledCount = 0,
                validator = setup(container, {
                    rules: {
                        custom: function() {
                            calledCount++;
                            return true;
                        }
                    }
                });

            validator.validate();
            assert.equal(calledCount, 0);
        });

        it("validate skips input[type=reset] elements", function() {
            container.append("<input type=reset />");
            var calledCount = 0,
                validator = setup(container, {
                    rules: {
                        custom: function() {
                            calledCount++;
                            return true;
                        }
                    }
                });

            validator.validate();
            assert.equal(calledCount, 0);
        });

        it("validate skips disabled inputs elements", function() {
            container.append('<input type="text" disabled="disabled" />');
            var calledCount = 0,
                validator = setup(container, {
                    rules: {
                        custom: function() {
                            calledCount++;
                            return true;
                        }
                    }
                });

            validator.validate();
            assert.equal(calledCount, 0);
        });

        it("validate skips readonly inputs elements", function() {
            container.append('<input type="text" readonly="readonly" />');
            var calledCount = 0,
                validator = setup(container, {
                    rules: {
                        custom: function() {
                            calledCount++;
                            return true;
                        }
                    }
                });

            validator.validate();
            assert.equal(calledCount, 0);
        });


    /* //Chrome type=date does not return value if it is not valid date
        it("validate returns false if input type=date value is not valid date", function() {
            var input = $('<input type="date" value="foo"/>'),
                validator = setup(input);

            assert.isOk(!validator.validate())
        });

        it("validate returns true if input type=date value is valid date", function() {
            var input = $('<input type="date" value="1/1/2001"/>'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });
    */
        it("validate returns false if input type=text and data-kendo-type=date value is not valid date", function() {
            var input = $('<input type="text" data-kendo-type="date" value="foo"/>'),
                validator = setup(input);

            assert.isOk(!validator.validate())
        });

        it("validate returns true if input type=text and data-kendo-type=date value is valid date", function() {
            var input = $('<input type="text" data-kendo-type="date" value="1/1/2001"/>'),
                validator = setup(input);

            assert.isOk(validator.validate());
        });

        it("validate input elements with array index names on multiple validation calls", function() {
            container.append("<input type='text' name='test[]' />");
            var called = false,
                validator = setup(container, { rules: { custom: function(input) { called = true } } });

            validator.validate();
            validator.validate();
            assert.isOk(called);
        });

        it("register external rules", function() {
            kendo.ui.validator.rules = { foo: function() { assert.isOk(true); } };

            container.append("<input type='text' name='test[]' />");

            var validator = setup(container, {});
            validator.validate();
        });

        it("external overrides default rules", function() {
            kendo.ui.validator.rules = { required: function() { assert.isOk(true); } };

            container.append("<input type='text' name='test[]' />");

            var validator = setup(container);

            validator.validate();
        });

        it("custom rules overrides external rules", function() {
            kendo.ui.validator.rules = { foo: function() { assert.isOk(false); } };

            container.append("<input type='text' name='test[]' />");

            var validator = setup(container, { rules: { foo: function() { assert.isOk(true) } } });
            validator.validate();
        });

        it("register external messages", function() {
            var called = false;
            kendo.ui.validator.rules = { foo: function() { return false; } };
            kendo.ui.validator.messages = { foo: function() { called =true; return "test"; } };
            container.append("<input type='text' name='test[]' />");

            var validator = setup(container, {});
            validator.validate();
            var messages = validator.errors();
            assert.isOk(called);
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "test");
        });

        it("external overrides default messages", function() {
            kendo.ui.validator.rules = { required: function() { return false; } };
            kendo.ui.validator.messages = { required: function() { assert.isOk(true) } };

            container.append("<input type='text' name='test[]' />");

            var validator = setup(container);

            validator.validate();
        });

        it("custom overrides external messages", function() {
            var called = false;
            kendo.ui.validator.rules = { foo: function() { return false; } };
            kendo.ui.validator.messages = { foo: function() { return "test"; } };

            container.append("<input type='text' name='test[]' />");

            var validator = setup(container, { messages: { foo: function() { called =true; return "test2"; } } });
            validator.validate();
            var messages = validator.errors();
            assert.isOk(called);
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "test2");
        });

        it("custom function overrides title messages", function() {
            var called = false;
            kendo.ui.validator.rules = { foo: function() { return false; } };

            container.append("<input type='text' title='validation title' name='test[]' />");

            var validator = setup(container, { messages: { foo: function() { called =true; return "test2"; } } });
            validator.validate();
            var messages = validator.errors();
            assert.isOk(called);
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "test2");
        });

        it("custom overrides title messages", function() {
            kendo.ui.validator.rules = { foo: function() { return false; } };

            container.append("<input type='text' title='validation title' name='test[]' />");

            var validator = setup(container, { messages: { foo: "test2" } });
            validator.validate();
            var messages = validator.errors();
            assert.equal(messages.length, 1);
            assert.equal(messages[0], "test2");
        });

        it("locate custom message locator", function() {
            kendo.ui.validator.messageLocators = {
                mylocator: {
                    locate: function(element, fieldName) {
                        assert.equal(element[0], container[0]);
                        assert.equal(fieldName, "test");
                    }
                }
            };

            container.append("<input type='text' name='test' />");

            var validator = setup(container);
            validator.validate();
        });

        it("decorate custom message locator", function() {
            kendo.ui.validator.messageLocators = {
                mylocator: {
                    locate: function(element, fieldName) {
                        return $();
                    },
                    decorate: function(message, fieldName) {
                        assert.isOk(message.length);
                        assert.equal(fieldName, "test");
                    }
                }
            };

            container.append("<input type='text' name='test' />");

            var validator = setup(container, { rules: { foo: function() { return false } } });
            validator.validate();
        });

        it("rules resolver is called", function() {
            kendo.ui.validator.ruleResolvers = {
                foo: {
                    resolve: function(element) {
                    assert.deepEqual(element[0], container[0]);
                    }
                }
            }
            container.append("<input type='text' name='test' />");

            var validator = setup(container);
        });

        it("resolves empty rules", function() {
            kendo.ui.validator.ruleResolvers = {
                foo: {
                    resolve: function(element) {
                        assert.isOk(true);
                        return;
                    }
                }
            }
            container.append("<input type='text' name='test' />");

            var validator = setup(container);
        });

        it("resolved rules and messages are added to the validator", function() {
            kendo.ui.validator.ruleResolvers = {
                foo: {
                    resolve: function(element) {
                        return { rules: { foo: function() {} }, messages: { foo: "foo" } };
                    }
                }
            }
            container.append("<input type='text' name='test' />");

            var validator = setup(container);
            assert.isOk("foo" in validator.options.rules);
            assert.isOk("foo" in validator.options.messages);
        });

        it("all rules resolver are called", function() {
            kendo.ui.validator.ruleResolvers = {
                foo: {
                    resolve: function(element) {
                    assert.deepEqual(element[0], container[0]);
                    }
                },
                bar: {
                    resolve: function(element) {
                    assert.deepEqual(element[0], container[0]);
                    }
                }
            }
            container.append("<input type='text' name='test' />");

            var validator = setup(container);
        });

        it("resolved rules from multiple resolvers are merged", function() {
            kendo.ui.validator.ruleResolvers = {
                foo: {
                    resolve: function(element) {
                        return { rules: { foo: $.noop }};
                    }
                },
                bar: {
                    resolve: function(element) {
                        return { rules: { bar: $.noop }};
                    }
                }
            }
            container.append("<input type='text' name='test' />");

            var validator = setup(container);

            assert.isOk("foo" in validator.options.rules);
            assert.isOk("bar" in validator.options.rules);
        });

        it("validating a container which contains svg", function() {
            container.append($('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="120" height="120" viewBox="0 0 236 120"></svg><input type="text" required="required" />'));
            var validator = setup(container);
            assert.isOk(!validator.validate());
        });

        it("value initial state is false", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        assert.isOk(!validator.value());
        });

        it("value is false is validation fails", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        validator.validate();

        assert.isOk(!validator.value());
        });

        it("value is true if validation succeed", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        input.val("foo");

        assert.isOk(validator.validate(), "Form is not valid");

        assert.isOk(validator.value(), "State is not correct");
        });

        it("change event is not triggered when validate is called on initial load when validation fails", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input, {
                    change: function() {
                        assert.isOk(false);
                    }
                });

        validator.validate();
        });

        it("change event is triggered when validate is called on initial load when validation succeed", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input, {
                    change: function() {
                        assert.isOk(true);
                    }
                });

        input.val("foo");

        validator.validate();
        });

        it("change event is not triggered when state is not changed", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        input.val("foo");
        validator.validate();

        validator.bind("change", function() {
            assert.isOk(false);
        });

        validator.validate();
        });

        it("change event is triggered when state is changed", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        input.val("foo");
        validator.validate();

        validator.bind("change", function() {
            assert.isOk(true);
        });

        input.val("");
        validator.validate();
        });

        it("change event is not triggered on blur on initial load when validation fails", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input, {
                    change: function() {
                        assert.isOk(false);
                    }
                });

            input.trigger("blur");
        });

        it("change event is triggered on blur on initial load when validation succeed", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input, {
                    change: function() {
                        assert.isOk(true);
                    }
                });

        input.val("foo");

        input.trigger("blur");
        });

        it("change event is not triggered when state is not changed - on blur", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        input.val("foo");
        validator.validate();

        validator.bind("change", function() {
            assert.isOk(false);
        });

        input.trigger("blur");
        });

        it("change event is triggered when state is changed - on blur", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        input.val("foo");
        validator.validate();

        validator.bind("change", function() {
            assert.isOk(true);
        });

        input.val("");
        input.trigger("blur");
    });

    it("errors are updated if input is validate on blur after being invalid", function() {
            var input = $('<input type="text" required />'),
                validator = setup(input);

        input.val("");
        validator.validate();

        input.val("foo");
        input.trigger("blur");

        assert.isOk(!validator.errors().length);
        });

        it("errors only validated input are cleared - on blur", function() {
            container.append($('<input type="text" name="foo1" required="required" /><input type="text" name="foo2" required="required" />'));
            var validator = setup(container);

            validator.validate();

            var input = container.find("input:first");

            input.val("foo");
            input.trigger("blur");

            assert.equal(validator.errors().length, 1);
        });

        it("validateInput is triggered when input becomes invalid", function() {
            container.append($('<input type="text" id="foo1" name="foo1" required="required" />'));
            var validator = setup(container);
            validator.bind("validateInput", function(e) {
                assert.isOk(!e.valid);
            });

            validator.validateInput(container.find("#foo1").get(0));
        });

        it("validateInput is triggered when input becomes valid", function() {
            container.append($('<input type="text" id="foo1" name="foo1" required="required" />'));
            var validator = setup(container);
            var input = container.find("#foo1").get(0);
            validator.validateInput(input);
            input.value = "text";
            validator.bind("validateInput", function(e) {
                assert.isOk(e.valid);
            });

            validator.validateInput(input);
        });

        it("validateInput is not triggered when input validation state does not change", function() {
            container.append($('<input type="text" id="foo1" name="foo1" required="required" /><input type="text" id="foo2" name="foo2" required="required" aria-invalid="true" />'));
            var validator = setup(container);
            var input = container.find("#foo1").get(0);
            var input2 = container.find("#foo2").get(0);
            validator.bind("validateInput", function(e) {
                assert.isOk(true);
            });
            input.value = "text";

            validator.validateInput(input);
            validator.validateInput(input2);
        });

        it("validateInput is triggered with full form validation", function() {
            container.append($('<input type="text" id="foo1" name="foo1" required="required" /><input type="text" id="foo2" name="foo2" required="required" />'));
            var validator = setup(container);
            validator.bind("validateInput", function(e) {
                assert.isOk(true);
            });

            validator.validate();
        });

        it("validateInput contains data for the validated input", function() {
            container.append($('<input type="text" id="foo1" name="foo1" required="required" /><input type="text" id="foo2" name="foo2" />'));
            var validator = setup(container);
            var input = container.find("#foo1");
            validator.bind("validateInput", function(e) {
                assert.equal(input.attr("id"), e.input.attr("id"));
            });

            validator.validate();
        });
    });
}());
