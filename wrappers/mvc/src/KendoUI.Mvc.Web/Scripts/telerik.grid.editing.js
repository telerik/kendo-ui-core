(function ($) {

    var $t = $.telerik, dateRe = /^\/Date\((.*?)\)\/$/, customFormatRegEx = /[0#?]/, numberTypeRegExp = /[npc?]/;

    $t.scripts.push("telerik.grid.editing.js");

    var UnobtrusiveValidator = function (formId) {
        this.formId = formId;
        this._isBuild = false;
        var data_validation = "tUnobtrusiveValidation";
        var data_container = "tUnobtrusiveContainer";
        var unobtrusive = this.unobtrusive = {
            adapters: [],
            parseElement: function (element, skipAttach) {
                var $element = $(element),
						form = $element.parents("form")[0],
						valInfo, rules, messages;

                if (!form) {
                    return;
                }

                valInfo = unobtrusive.validationInfo(form);
                valInfo.options.rules[element.name] = rules = {};
                valInfo.options.messages[element.name] = messages = {};

                $.each(this.adapters, function () {
                    var prefix = "data-val-" + this.name,
							message = $element.attr(prefix),
							paramValues = {};

                    if (message !== undefined) {
                        prefix += "-";

                        $.each(this.params, function () {
                            paramValues[this] = $element.attr(prefix + this);
                        });

                        this.adapt({
                            element: element,
                            form: form,
                            message: message,
                            params: paramValues,
                            rules: rules,
                            messages: messages
                        });
                    }
                });

                if (!skipAttach) {
                    valInfo.attachValidation();
                }
            },

            parse: function (selector) {
                $(selector).find(":input[data-val=true]").each(function () {
                    unobtrusive.parseElement(this, true);
                });

                $(selector).each(function () {
                    var info = unobtrusive.validationInfo(this);
                    if (info) {
                        info.attachValidation();
                    }
                });
            },

            onError: function (error, inputElement) {
                var container = $(this).find("[data-valmsg-for='" + inputElement[0].name + "']"),
						replace = $.parseJSON(container.attr("data-valmsg-replace")) !== false;

                container.removeClass("field-validation-valid").addClass("field-validation-error");
                error.data(data_container, container);

                if (replace) {
                    container.empty();
                    error.removeClass("input-validation-error").appendTo(container);
                }
                else {
                    error.hide();
                }
            },

            onErrors: function (form, validator) {
                var container = $(this).find("[data-valmsg-summary=true]"),
						list = container.find("ul");

                if (list && list.length && validator.errorList.length) {
                    list.empty();
                    container.addClass("validation-summary-errors").removeClass("validation-summary-valid");

                    $.each(validator.errorList, function () {
                        $("<li />").html(this.message).appendTo(list);
                    });
                }
            },

            onSuccess: function (error) {
                var container = error.data(data_container),
						replace = $.parseJSON(container.attr("data-valmsg-replace"));

                if (container) {
                    container.addClass("field-validation-valid").removeClass("field-validation-error");
                    error.removeData(data_container);

                    if (replace) {
                        container.empty();
                    }
                }
            },

            validationInfo: function (form) {
                var $form = $(form),
						result = $form.data(data_validation);

                if (!result) {
                    result = {
                        options: {
                            errorClass: "input-validation-error",
                            errorElement: "span",
                            errorPlacement: $.proxy(unobtrusive.onError, form),
                            invalidHandler: $.proxy(unobtrusive.onErrors, form),
                            messages: {},
                            rules: {},
                            success: $.proxy(unobtrusive.onSuccess, form)
                        },
                        attachValidation: function () {
                            $form.validate(this.options);
                        },
                        validate: function () {
                            $form.validate();
                            return $form.valid();
                        }
                    };
                    $form.data(data_validation, result);
                }

                return result;
            }
        };
    };

    UnobtrusiveValidator.prototype = {
        build: function () {
            if (this._isBuild)
                return;

            this._isBuild = true;

            var adapters = [];
            function setValidationValues(options, ruleName, value) {
                options.rules[ruleName] = value;
                if (options.message) {
                    options.messages[ruleName] = options.message;
                }
            }

            function splitAndTrim(value) {
                return value.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
            }

            function getModelPrefix(fieldName) {
                return fieldName.substr(0, fieldName.lastIndexOf(".") + 1);
            }

            function appendModelPrefix(value, prefix) {
                if (value.indexOf("*.") === 0) {
                    value = value.replace("*.", prefix);
                }
                return value;
            }

            adapters = this.unobtrusive.adapters;
            adapters.add = function (adapterName, params, fn) {
                if (!fn) {
                    fn = params;
                    params = [];
                }
                this.push({ name: adapterName, params: params, adapt: fn });
                return this;
            };

            adapters.addBool = function (adapterName, ruleName) {
                return this.add(adapterName, function (options) {
                    setValidationValues(options, ruleName || adapterName, true);
                });
            };

            adapters.addMinMax = function (adapterName, minRuleName, maxRuleName, minMaxRuleName, minAttribute, maxAttribute) {
                return this.add(adapterName, [minAttribute || "min", maxAttribute || "max"], function (options) {
                    var min = options.params.min,
						max = options.params.max;

                    if (min && max) {
                        setValidationValues(options, minMaxRuleName, [min, max]);
                    }
                    else if (min) {
                        setValidationValues(options, minRuleName, min);
                    }
                    else if (max) {
                        setValidationValues(options, maxRuleName, max);
                    }
                });
            };

            adapters.addSingleVal = function (adapterName, attribute, ruleName) {
                return this.add(adapterName, [attribute || "val"], function (options) {
                    setValidationValues(options, ruleName || adapterName, options.params[attribute]);
                });
            };

            adapters.addSingleVal("accept", "exts").addSingleVal("regex", "pattern");
            adapters.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
            adapters.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
            adapters.add("equalto", ["other"], function (options) {
                var element = $(options.form).find(":input[name=" + options.params.other + "]")[0];
                setValidationValues(options, "equalTo", element);
            });
            adapters.add("required", function (options) {
                if (options.element.tagName.toUpperCase() !== "INPUT" || options.element.type.toUpperCase() !== "CHECKBOX") {
                    setValidationValues(options, "required", true);
                }
            });
            adapters.add("remote", ["url", "type", "additionalfields"], function (options) {
                var value = {
                    url: options.params.url,
                    type: options.params.type || "GET",
                    data: {}
                },
                    prefix = getModelPrefix(options.element.name);

                $.each(splitAndTrim(options.params.additionalfields || options.element.name), function (i, fieldName) {
                    var paramName = appendModelPrefix(fieldName, prefix);
                    value.data[paramName] = function () {
                        return $(options.form).find(":input[name='" + paramName + "']").val();
                    };
                });

                setValidationValues(options, "remote", value);
            });

            if ($.validator.unobtrusive && $.validator.unobtrusive.adapters)
                $.extend(adapters, $.validator.unobtrusive.adapters);

            $.validator.addMethod("regex", function (value, element, params) {
                if (this.optional(element))
                    return true;

                var match = new RegExp(params).exec(value);
                return match && match.index == 0 && match[0].length == value.length;
            });

            $.validator.addMethod('number', function (value, element) {
                var groupSize = $t.cultureInfo.numericgroupsize;
                if (groupSize) {
                    var builder = new $t.stringBuilder();

                    builder.cat('^-?(?:\\d+|\\d{1,')
                        .cat(groupSize)
                        .cat('}(?:')
                        .cat($t.cultureInfo.numericgroupseparator)
                        .cat('\\d{')
                        .cat(groupSize)
                        .cat('})+)(?:\\')
                        .cat($t.cultureInfo.numericdecimalseparator)
                        .cat('\\d+)?$');
                    return this.optional(element) || (builder && new RegExp(builder.string()).test(value));
                }
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
            });
        },
        parse: function () {
            this.build();
            this.unobtrusive.parse(this.formId);
        }
    };

    var Mvc2Validator = function (validationMetaData) {
        this.validationMetaData = validationMetaData;
    };

    Mvc2Validator.prototype = {
        build: function (validationContext) {

            $.validator.addMethod("regex", function (value, element, params) {
                if (this.optional(element))
                    return true;

                var match = new RegExp(params).exec(value);
                return match && match.index == 0 && match[0].length == value.length;
            });

            $.validator.addMethod('number', function (value, element) {
                var groupSize = $t.cultureInfo.numericgroupsize;
                var builder = new $t.stringBuilder();

                builder.cat('^-?(?:\\d+|\\d{1,')
					   .cat(groupSize)
					   .cat('}(?:')
					   .cat($t.cultureInfo.numericgroupseparator)
					   .cat('\\d{')
					   .cat(groupSize)
					   .cat('})+)(?:\\')
					   .cat($t.cultureInfo.numericdecimalseparator)
					   .cat('\\d+)?$');

                return this.optional(element) || new RegExp(builder.string()).test(value);
            });

            function applyRangeValidator(object, min, max) {
                object["range"] = [min, max];
            };

            function applyRegularExpressionValidator(object, pattern) {
                object["regex"] = pattern;
            };

            function applyRequiredValidator(object) {
                object["required"] = true;
            };

            function applyStringLengthValidator(object, maxLength) {
                object["maxlength"] = maxLength;
            };

            function applyUnknownValidator(object, validationType, validationParameters) {
                object[validationType] = validationParameters;
            };

            function createFieldToValidationMessageMapping(validationFields) {
                var mapping = {};

                for (var i = 0; i < validationFields.length; i++) {
                    var thisField = validationFields[i];
                    mapping[thisField.FieldName] = "#" + thisField.ValidationMessageId;
                }

                return mapping;
            };

            function createErrorMessagesObject(validationFields) {
                var messagesObj = {};

                for (var i = 0; i < validationFields.length; i++) {
                    var thisField = validationFields[i];
                    var thisFieldMessages = {};
                    messagesObj[thisField.FieldName] = thisFieldMessages;
                    var validationRules = thisField.ValidationRules;

                    for (var j = 0; j < validationRules.length; j++) {
                        var thisRule = validationRules[j];
                        if (thisRule.ErrorMessage) {
                            var jQueryValidationType = thisRule.ValidationType;
                            switch (thisRule.ValidationType) {
                                case "regularExpression":
                                    jQueryValidationType = "regex";
                                    break;

                                case "stringLength":
                                    jQueryValidationType = "maxlength";
                                    break;
                            }

                            thisFieldMessages[jQueryValidationType] = thisRule.ErrorMessage;
                        }
                    }
                }

                return messagesObj;
            }
            function createRulesForField(validationField) {
                var validationRules = validationField.ValidationRules;

                // hook each rule into jquery
                var rulesObj = {};
                for (var i = 0; i < validationRules.length; i++) {
                    var thisRule = validationRules[i];
                    switch (thisRule.ValidationType) {
                        case "range":
                            var min = (typeof (thisRule.ValidationParameters['minimum']) == "undefined") ? thisRule.ValidationParameters['min'] : thisRule.ValidationParameters['minimum'];
                            var max = (typeof (thisRule.ValidationParameters['maximum']) == "undefined") ? thisRule.ValidationParameters['max'] : thisRule.ValidationParameters['maximum'];
                            applyRangeValidator(rulesObj,
								    min, max);
                            break;

                        case "regularExpression":
                        case "regex":
                            applyRegularExpressionValidator(rulesObj,
								thisRule.ValidationParameters["pattern"]);
                            break;

                        case "required":
                            applyRequiredValidator(rulesObj);
                            break;

                        case "stringLength":
                            applyStringLengthValidator(rulesObj,
								thisRule.ValidationParameters["maximumLength"]);
                            break;
                        case "length":
                            applyStringLengthValidator(rulesObj,
								thisRule.ValidationParameters["max"]);
                            break;
                        default:
                            applyUnknownValidator(rulesObj,
								thisRule.ValidationType, thisRule.ValidationParameters);
                            break;
                    }
                }

                return rulesObj;
            }

            function createValidationOptions(validationFields) {
                var rulesObj = {};
                for (var i = 0; i < validationFields.length; i++) {
                    var validationField = validationFields[i];
                    var fieldName = validationField.FieldName;
                    rulesObj[fieldName] = createRulesForField(validationField);
                }

                return rulesObj;
            }

            var theForm = $("#" + validationContext.FormId);

            var fields = validationContext.Fields;
            var rulesObj = createValidationOptions(fields);
            var fieldToMessageMappings = createFieldToValidationMessageMapping(fields);
            var errorMessagesObj = createErrorMessagesObject(fields);

            var options = {
                errorClass: "input-validation-error",
                errorElement: "span",
                errorPlacement: function (error, element) {
                    var messageSpan = fieldToMessageMappings[element.attr("name")];
                    if (messageSpan) {
                        $(messageSpan).empty()
										.removeClass("field-validation-valid")
										.addClass("field-validation-error")

                        error.removeClass("input-validation-error")
							 .attr("_for_validation_message", messageSpan)
							 .appendTo(messageSpan);
                    }
                },
                messages: errorMessagesObj,
                rules: rulesObj,
                success: function (label) {
                    $(label.attr("_for_validation_message"))
						.empty()
						.addClass("field-validation-valid")
						.removeClass("field-validation-error");
                }
            };
            theForm.validate(options);
        },
        parse: function () {
            this.build(this.validationMetaData);
        }
    };

    $t.editing = {};

    function cancelAll(grid) {
        $(grid || document.body).find('div.t-grid')
                        .each(function () {
                            var grid = $(this).data('tGrid');
                            if (grid && grid.cancel)
                                grid.cancel();
                        });
    }

    function flatten(result, value, prefix) {
        for (var key in value) {
            if ($.isPlainObject(value[key])) {
                flatten(result, value[key], prefix ? prefix + "." + key : key);
            } else {
                result[prefix ? prefix + "." + key : key] = value[key];
            }
        }
    }

    function unflatten(value) {
        for (var key in value) {
            var firstMemberIndex = key.indexOf(".");

            if (firstMemberIndex > -1) {
                var firstMember = key.substring(0, firstMemberIndex);
                var child = value[firstMember] || {};
                child[key.substring(firstMemberIndex + 1)] = value[key];
                value[firstMember] = unflatten(child);

                delete value[key];
            }
        }
        return value;
    }

    function sanitizeDates(dataItem) {
        var member, value, date;

        for (member in dataItem) {
            value = dataItem[member];
            if (typeof value === "string") {
                date = dateRe.exec(value);
                if (date) {
                    dataItem[member] = new Date(parseInt(date[1]));
                }
            } else if ($.isPlainObject(value)) {
                sanitizeDates(value);
            }
        }
    }

    function serialize(data, prefix, predicate) {
        var result = {};        

        for (var sourceIndex = 0, destinationIndex = 0; sourceIndex < data.length; sourceIndex++) {
            var dataItem = data[sourceIndex];
            sanitizeDates(dataItem);

            if (predicate(dataItem)) {
                for (var member in dataItem) {
                    var value = dataItem[member],
                        key = prefix + '[' + destinationIndex + '].' + member;

                    if ($.isPlainObject(value)) {
                        flatten(result, value, key);
                    } else {
                        result[key] = value;
                    }
                }
                destinationIndex++;
            }
        }

        return result;
    }

    $t.editing.initialize = function (grid) {
        $.extend(grid, this.implementation);
        var $element = $(grid.element);

        grid.modelBinder = new $t.grid.ModelBinder();

        grid.formViewBinder = new $t.grid.FormViewBinder({
            'date': function (name, value) {
                var column = grid.columnFromMember(name);
                var format = column ? column.format : '';
                return $t.formatString(format || '{0:G}', value);
            }
        });

        if (grid.isAjax()) {

            grid.serializeData = function (data, prefix, predicate) {
                if (!predicate) {
                    predicate = function() { return true; }
                }

                data = serialize(data, prefix, predicate);
                return grid._convert(data);
            }

            if (grid.editing.mode == 'InCell') {
                sanitizeDates(grid.editing.defaultDataItem || {});

                grid.changeLog = new $t.grid.ChangeLog(grid.pageSize || (grid.data && grid.data.length) || 0, grid.editing.insertRowPosition);

                $(grid.element).bind('dataBound', function () {
                    grid.changeLog.clear();
                    grid.valid = true;
                    grid.td = null;
                });

                grid.cellEditor = new $t.grid.CellEditor(
                    {
                        columns: grid.columns,
                        cellIndex: function (td) { return grid.cellIndex(td); },
                        id: grid.formId(),
                        bind: $.proxy(grid.formViewBinder.bind, grid.formViewBinder),
                        validate: $.proxy(grid.validation, grid)
                    }
                );

                $element.delegate('.t-grid-save-changes:not(.t-state-disabled)', 'click', $t.stopAll(function (e) {
                    grid.submitChanges();
                }));

                $element.delegate('.t-grid-cancel-changes', 'click', $t.stopAll(function (e) {
                    grid.cancelChanges();
                }));

                grid.hasChanges = function () {
                    return grid.changeLog.dirty();
                }

                grid.updatedDataItems = function () {
                    return $.grep(grid.changeLog.updated, function (value) { return value != undefined });
                }

                grid.insertedDataItems = function () {
                    return grid.changeLog.inserted;
                }

                grid.deletedDataItems = function () {
                    return $.grep(grid.changeLog.deleted, function (value) { return value != undefined });
                }                               

                grid.submitChanges = function () {
                    grid._onCommand( { name: "submitChanges" } );

                    if (grid.changeLog.dirty()) {

                        grid._validateForm(function () {
                            var inserted = grid.changeLog.inserted;
                            var updated = $.grep(grid.changeLog.updated, function (value) { return value != undefined });
                            var deleted = $.grep(grid.changeLog.deleted, function (value) { return value != undefined });
                            var additionalValues = {};

                            if ($t.trigger(grid.element, 'submitChanges', {
                                inserted: inserted,
                                updated: updated,
                                deleted: deleted,
                                values: additionalValues
                            })) {
                                return;
                            }

                            var values = grid.ws ? {
                                inserted: $.map(inserted, function (value) { return grid._convert(value); }),
                                updated: $.map(updated, function (value) { return grid._convert(value); }),
                                deleted: $.map(deleted, function (value) { return grid._convert(value); })
                            } : grid.changeLog.serialize(inserted, updated, deleted);

                            grid.sendValues($.extend(values, additionalValues), 'updateUrl', 'submitChanges');
                        });
                    }
                }

                grid.cancelChanges = function () {
                    grid._onCommand( { name: "cancelChanges" } );

                    grid.changeLog.clear();
                    grid.valid = true;
                    grid.td = null;
                    grid.ajaxRequest();
                }

                grid.cellIndex = function (td) {
                    return $(td).parent().find('td:not(.t-group-cell,.t-hierarchy-cell)').index(td);
                }

                grid.rowIndex = function (tr) {
                    tr = $(tr);

                    if (tr.hasClass("t-grid-new-row")) {
                        return tr.parent().find(".t-grid-new-row").index(tr);
                    }

                    return tr.parent().find('tr:not(.t-detail-row,.t-grouping-row)').index(tr);
                }

                var dirtyIndicator;
                grid.valid = true;

                grid.editCell = function (td) {
                    var column = grid.columns[grid.cellIndex(td)];
                    if (grid.valid && (column && !column.readonly)) {
                        grid.td = td;

                        if (grid.form().length) {
                            $.data(grid.form()[0], 'validator', null);
                        }

                        td = $(td);
                        var tr = td.parent();
                        var index = grid.rowIndex(tr);

                        var dataItem = grid.changeLog.get(index) || grid.dataItem(tr);

                        dirtyIndicator = td.find('.t-dirty');

                        grid.cellEditor.edit(td, dataItem);

                        $t.trigger(grid.element, 'edit', {
                            mode: tr.hasClass('t-grid-new-row') ? 'insert' : 'edit',
                            form: grid.form()[0],
                            dataItem: dataItem,
                            cell: td[0]
                        });
                    } else if (grid.keyboardNavigation) {
                        var td = $(td),
                            dataArea = td.closest(".t-grid-content", grid.element);
                        if (dataArea.length > 0) {
                            var cellWidth = td.outerWidth(),
                                offsetLeft = td.position().left,
                                scrollLeft = dataArea.scrollLeft(),
                                dataWidth = dataArea.outerWidth();
                            if (offsetLeft > scrollLeft && offsetLeft + cellWidth > dataWidth) {
                                var newScroll = scrollLeft + $t.scrollbarWidth() + offsetLeft + cellWidth - dataWidth;
                                dataArea.scrollLeft(newScroll);
                            }
                        }
                    }
                }

                grid.saveCell = function (td) {
                    grid.valid = false;
                    grid._validateForm(function () {
                        grid.valid = true;
                        td = $(td);
                        var tr = td.parent();
                        var dataItem = grid.changeLog.get(grid.rowIndex(tr)) || grid.dataItem(tr);

                        var values = unflatten(grid.modelBinder.bind(td));

                        var dirty = false;

                        if ($t.trigger(grid.element, 'save', { mode: tr.hasClass('t-grid-new-row') ? 'insert' : 'edit',
                            dataItem: dataItem,
                            values: values,
                            form: grid.form()[0],
                            cell: td[0]
                        })) {
                            return;
                        }

                        if (tr.hasClass('t-grid-new-row')) {
                            grid.changeLog.insert(grid.rowIndex(tr), values);
                        } else {

                            dirty = grid.changeLog.update(grid.rowIndex(tr), dataItem, values);
                        }

                        grid.cellEditor.display(td, $.extend(true, {}, dataItem, values));
                        if (dirty || tr.hasClass('t-grid-new-row')) {
                            dirtyIndicator = $('<span class="t-dirty" />');
                        }

                        if (dirtyIndicator && dirtyIndicator.length) {
                            dirtyIndicator.prependTo(grid.td)
                        }

                        grid.td = null;

                    });
                }

                grid.cancelCell = function (td) {
                    td = $(td);
                    var tr = td.parent(),
                        index = grid.rowIndex(tr),
                        dataItem = grid.changeLog.get(index) || grid.dataItem(tr);

                    grid.valid = true;
                    grid.cellEditor.display(td, dataItem);
                    if (dirtyIndicator && dirtyIndicator.length) {
                        dirtyIndicator.prependTo(grid.td)
                    }
                    grid.td = null;
                }

                grid.td = null;
                grid.$tbody.delegate('tr:not(.t-grouping-row,.t-no-data,.t-footer-template,.t-group-footer) > td:not(.t-detail-cell,.t-grid-edit-cell,.t-group-cell,.t-hierarchy-cell)', grid.editing.beginEdit || 'click', function (e) {
                    if ($(this).closest("tbody")[0] == grid.$tbody[0]) {
                        grid.editCell(this);
                    }
                });

                $(document).mousedown(function (e) {
                    if (grid.td && !$.contains(grid.td, e.target) && grid.td != e.target && !$(e.target).closest('.t-animation-container').length) {
                        grid.saveCell(grid.td);
                    }
                });
            } else {
                if (grid.editing.beginEdit) {
                    grid.$tbody.delegate('tr:not(.t-detail-row,.t-grouping-row,.t-grid-edit-row,.t-group-footer)', grid.editing.beginEdit, function (e) {
                        if (!$(e.target).is(':button,a,:input,a>.t-icon')) {
                            grid.editRow($(this));
                        }
                    });
                }
            }
            $element.delegate('.t-grid-edit', 'click', $t.stopAll(function (e) {
                grid.editRow($(this).closest('tr'));
            }))
            .delegate('.t-grid-delete', 'click', $t.stopAll(function (e) {
                grid.deleteRow($(this).closest('tr'));
            }))
            .delegate('.t-grid-add', 'click', $t.stopAll(function (e) {
                grid.addRow();
            }));
        } else {
            $element.delegate('.t-grid-delete', 'click', $t.stop(function (e) {
                if (grid.editing.confirmDelete !== false && !confirm(grid.localization.deleteConfirmation))
                    e.preventDefault();
            }));

            grid.validation();
        }

        grid.errorView = new $t.grid.ErrorView();

        var builder = new $t.grid.DataCellBuilder({ columns: grid.columns, rowTemplate: grid.rowTemplate });

        var column = $.grep(grid.columns, function (c) {
            return c.commands && $.grep(c.commands, function (cmd) { return cmd.name == 'edit' })[0];
        })[0];

        if (!column) {
            column = { commands: [{ name: "edit", buttonType: "Text"}] };
            column.insert = grid.insertFor(column);
            column.edit = grid.editFor(column);
        }

        var formContainerBuilder = new $t.grid.FormContainerBuilder({
            html: function () { return unescape(grid.editing.editor) },
            insert: function () { return column.insert() },
            edit: function () { return column.edit() }
        });

        var editMode = grid.editing.mode;
        var groups = function () {
            return (grid.groups || []).length;
        };

        if (editMode == 'InLine') {
            grid.rowEditor = new $t.grid.Editor({
                id: grid.formId(),
                insertRow: grid.editing.insertRowPosition,
                cancel: builder.display,
                edit: builder.edit,
                insert: builder.insert,
                groups: groups,
                details: grid.detail
            });
        } else if (editMode == 'InForm') {
            grid.rowEditor = new $t.grid.Editor({
                id: grid.formId(),
                cancel: builder.display,
                insertRow: grid.editing.insertRowPosition,
                groups: groups,
                details: grid.detail,
                edit: function () {
                    return '<td colspan="' + $.grep(grid.columns, function(col) { return !col.hidden; }).length + '">' +
                                formContainerBuilder.edit() +
                           '</td>';
                },
                insert: function () {
                    return '<td colspan="' + $.grep(grid.columns, function(col) { return !col.hidden; }).length + '">' +
                                formContainerBuilder.insert() +
                           '</td>';
                }
            });
        } else if (editMode == 'PopUp') {
            grid.rowEditor = new $t.grid.PopUpEditor({
                id: grid.formId(),
                edit: formContainerBuilder.edit,
                container: grid.element,
                settings: grid.editing.popup,
                insert: formContainerBuilder.insert,
                editTitle: grid.localization.edit,
                insertTitle: grid.localization.insert
            });
        } else {
            builder = new $t.grid.CellBuilder({ columns: grid.columns });

            grid.rowEditor = new $t.grid.Editor({
                id: grid.formId(),
                cancel: builder.display,
                insertRow: grid.editing.insertRowPosition,
                edit: builder.edit,
                insert: builder.insert,
                groups: groups,
                details: grid.detail
            });
        }

        if (!grid.keyboardNavigation) {
            $element.delegate(':input:not(.t-button):not(textarea)', 'keydown', $t.stop(function (e) {
                if (e.keyCode == 13 || e.keyCode == 27) {
                    e.preventDefault();
                    var keyMap = { 13: '.t-grid-update, .t-grid-insert', 27: '.t-grid-cancel' };
                    $(this).closest('tr').find(keyMap[e.keyCode]).click();
                }
            }));
        }
    }

    $t.editing.implementation = {
        editFor: function (column) {
            var localization = this.localization;
            if (column.commands) {
                var edit = $.grep(column.commands, function (column) { return column.name == 'edit' })[0];

                if (edit) {
                    var update = $t.grid.ButtonBuilder.create($.extend(true, {}, edit, { text: edit.updateText || localization['update'], name: "update" }));
                    var cancel = $t.grid.ButtonBuilder.create($.extend(true, {}, edit, { text: edit.cancelText || localization['cancel'], name: "cancel" }));

                    var html = update.build() + cancel.build();

                    return function () {
                        return html;
                    };
                } else {
                    return function () { return '' };
                }
            } else if (!column.readonly && column.editor) {
                return function () { return unescape(column.editor) };
            }

            return this.displayFor(column);
        },

        insertFor: function (column) {
            var localization = this.localization;

            if (column.commands) {
                var edit = $.grep(column.commands, function (column) { return column.name == 'edit' })[0];

                if (edit) {
                    var insert = $t.grid.ButtonBuilder.create($.extend(true, {}, edit, { text: edit.insertText || localization['insert'], name: "insert" }));
                    var cancel = $t.grid.ButtonBuilder.create($.extend(true, {}, edit, { text: edit.cancelText || localization['cancel'], name: "cancel" }));

                    var html = insert.build() + cancel.build();

                    return function () {
                        return html;
                    };
                } else {
                    return function () { return '' };
                }
            } else {
                return this.editFor(column);
            }
        },
        insertRow: function ($tr) {
            var that = this;

            if ($.isPlainObject($tr)) {
                var dataItem = $.extend(true, {}, that.editing.defaultDataItem, $tr);
                if (this.editing.mode != 'InCell') {
                    sanitizeDates(dataItem);
                    that.sendValues(dataItem, 'insertUrl', 'insert');    
                } else {                    
                    that.changeLog.insert(dataItem);
                    var groups = (that.groups || []).length + 1,
                        details = that.detail,
                        tr = $('<tr class="t-grid-new-row">' +
                            new Array(groups).join('<td class="t-group-cell" />') +
                            ((details) ? '<td class="t-hierarchy-cell"/>' : "") +
                            '</tr>'),
                        columns = that.columns,
                        td, idx, length;
                    
                    that.$tbody.prepend(tr);
                    tr.closest("table")
                        .wrap(function () {
                            if (!$(this).parent().is("form"))
                                return form(that.formId());
                        });

                    for (idx = 0, length = columns.length; idx < length; idx++) {
                        td = $("<td>").appendTo(tr);
                        that.cellEditor.display(td, dataItem);
                        
                        if (!columns[idx].readonly) {                            
                            td.prepend('<span class="t-dirty" />');                            
                        }

                        if (columns[idx].hidden) {
                            td.hide();
                        }
                    }
                }

                return;
            }

            var tr = ($tr.data('tr') || $tr)[0];

            this._onCommand({ name: "insert", row: tr });

            that._validateForm(function () {
                var values = that.extractValues($tr);

                if ($t.trigger(that.element, 'save', { mode: 'insert', values: values, form: that.form()[0] }))
                    return;

                that.sendValues(values, 'insertUrl', 'insert');
            });
        },
        _validateForm: function (callback) {
            var form = this.form();

            if (form.length) {
                var validator = form.validate();
                if (validator) {
                    this.validate();
                    validator.settings.submitHandler = function () {
                        callback();
                        validator.settings.submitHandler = $.noop;
                    };
                    form.submit();
                }
            }
        },
        _rowForData: function(values) {
            var that = this,
                data = (that.changeLog ? that.changeLog.inserted : []).concat(that.data || []),
                getters = [];

            values = values ? values : {};
            for (var key in that.dataKeys) {
                getters.push(that.valueFor({ member: key }));
            }

            for(var i = 0, length = data.length; i < length; i++) {
                var idx = getters.length - 1,
                    getter = getters[idx];

                while (getter && getter(values) === getter(data[i])) {
                    getter = getters[--idx];
                }

                if (idx < 0) {                    
                    return that.$tbody.find(">tr:not(.t-grouping-row,.t-group-footer,.t-detail-row,.t-no-data,.t-footer-template)").eq(i);
                }
            }
        },
        updateRow: function ($tr) {
            var that = this;

            if ($.isPlainObject($tr)) {
                var values = $tr;
                if (this.editing.mode != 'InCell') {
                    sanitizeDates(values);
                    that.sendValues(values, 'updateUrl', 'update');    
                } else {                     
                    $tr = that._rowForData(values);
                    if (!$tr) {
                        return;
                    }

                    var rowIndex = that.rowIndex($tr),
                        changeLog = that.changeLog,
                        dataItem = changeLog.get(rowIndex) || that.dataItem($tr),
                        cells = $tr.find("td:not(.t-hierarchy-cell,.t-group-cell)"),
                        data = {},
                        td,
                        column;

                    for (var member in values) {
                        data[member] = values[member];
                        column = that.columnFromMember(member);

                        if (column && !column.readonly && changeLog.update(rowIndex, dataItem, data)) {
                            td = cells.eq($.inArray(column, that.columns));
                            that.cellEditor.display(td, data);
                            td.prepend('<span class="t-dirty" />'); 
                        }
                    }
                                   
                    $tr.closest("table")
                        .wrap(function () {
                            if (!$(this).parent().is("form"))
                                return form(that.formId());
                        });
                }

                return;
            }

            var tr = ($tr.data('tr') || $tr)[0];

            this._onCommand({ name: "update", row: tr });

            that._validateForm(function () {
                var dataItem = that.dataItem(tr);
                var values = that.extractValues($tr, (that.editing.mode != 'InCell' || !that.ws));
                if ($t.trigger(that.element, 'save', { mode: 'edit', dataItem: dataItem, values: values, form: that.form()[0] }))
                    return;

                if (that.editing.mode == 'InCell') {
                    values = $.extend(dataItem, values);
                }

                sanitizeDates(values);
                that.sendValues(values, 'updateUrl', 'update');
            });
        },

        deleteRow: function ($tr) {
            var isPlainObject = $.isPlainObject($tr),
                dataItem,
                values,
                that = this;

            if (isPlainObject) {
                dataItem = $tr;
                $tr = that._rowForData($tr); 
                dataItem = $.extend({}, this.dataItem($tr), dataItem);               
                if (that.editing.mode != 'InCell') {
                    if (!that._isServerOperation() && that.dataSource) {
                        that.deletedIds.push(that.dataSource.id(dataItem));
                    }
                    sanitizeDates(dataItem);
                    that.sendValues(dataItem, "deleteUrl", "delete");
                } else {
                    that.changeLog.erase(that.rowIndex($tr), dataItem);

                    if (!that._isServerOperation() && that.dataSource && dataItem) {
                        that.deletedIds.push(that.dataSource.id(dataItem));
                    }
                    
                    $tr.next("tr.t-detail-row").remove();

                    that.cancelRow($tr);
                    $tr.hide();
                }

                return;
            }

            dataItem = this.dataItem($tr);                

            this._onCommand({ name: "delete", row: $tr[0] });

            if (this.editing.mode != 'InCell') {
                values = this.extractValues($tr, true);
                if ($t.trigger(this.element, 'delete', { row: $tr[0], dataItem: dataItem, values: values }))
                    return;

                if (!this._isServerOperation() && this.dataSource) {
                    this.deletedIds.push(this.dataSource.id(dataItem));
                }

                if (this.editing.confirmDelete === false || confirm(this.localization.deleteConfirmation))
                    this.sendValues(values, 'deleteUrl', 'delete');
            } else {
                if (!$tr.hasClass("t-grid-new-row")) {
                    values = this.extractValues($tr, true);
                }
                if ($t.trigger(this.element, 'delete', { row: $tr[0], dataItem: dataItem, values: values }))
                    return;

                if (this.editing.confirmDelete === false || confirm(this.localization.deleteConfirmation)) {
                    this.changeLog.erase(this.rowIndex($tr), dataItem);
                    if (this.td && $.contains($tr[0], this.td)) {
                        this.td = null;
                        this.valid = true;
                    }

                    if(!this._isServerOperation() && this.dataSource && dataItem) {
                        this.deletedIds.push(this.dataSource.id(dataItem));
                    }

                    $tr.next("tr.t-detail-row").remove();

                    this.cancelRow($tr);
                    $tr.hide();
                }
            }
        },

        editRow: function ($tr) {
            var dataItem = this.dataItem($tr);

            this._onCommand({ name: "edit", row: $tr[0] });

            if (this.editing.mode != 'InCell') {
                cancelAll($(this.element).closest(".t-edit-form")[0]);

                var container = this.rowEditor.edit($tr, dataItem);

                var form = this.form();

                form.undelegate('.t-grid-update', "click")
                    .delegate('.t-grid-update', 'click', $t.stopAll($.proxy(function () {
                        this.updateRow(container);
                    }, this)))
                    .undelegate('.t-grid-cancel', "click")
                    .delegate('.t-grid-cancel', 'click', $t.stopAll($.proxy(function () {
                        this.cancelRow($tr);
                    }, this)));

                this.formViewBinder.bind(container, dataItem);

                $t.trigger(this.element, 'edit', {
                    mode: 'edit',
                    form: form[0],
                    dataItem: dataItem
                });

                this.validation();
            } else {
                if (this.valid) {
                    var row = this.rowEditor.edit($tr, dataItem);
                    var cells = row.find("td:not(.t-hierarchy-cell,.t-group-cell)");
                    var input = $tr.find(':input:visible:enabled:first');
                    this.td = input.closest('td')[0];
                    if (!this.td) {
                        var idx = 0;
                        $.each(this.columns, function(index, column) {
                            if(!column.hidden && !column.readonly) {
                                idx = index;
                                return false;
                            }
                        });

                        this.td = cells[idx];
                    }
                    input.focus();
                    this.validation();
                }
            }
        },

        form: function () {
            return $('#' + this.formId());
        },

        addRow: function () {            
            var dataItem = $.extend(true, {}, this.editing.defaultDataItem);           

            this._onCommand({ name: "add" });

            if (this.editing.mode != 'InCell') {
                cancelAll($(this.element).closest(".t-edit-form")[0]);

                var container = this.rowEditor.insert(this.$tbody, dataItem);

                var form = this.form();

                form.undelegate('.t-grid-insert', "click")
                    .delegate('.t-grid-insert', 'click', $t.stopAll($.proxy(function () {
                        this.insertRow(container);
                    }, this)))
                    .undelegate('.t-grid-cancel', "click")
                    .delegate('.t-grid-cancel', 'click', $t.stopAll($.proxy(function () {
                        this.cancelRow(container);
                    }, this)));

                $t.trigger(this.element, 'edit', {
                    mode: 'insert',
                    form: form[0],
                    dataItem: dataItem
                });

                this.validation();
            } else {
                if (this.valid) {
                    var row = this.rowEditor.insert(this.$tbody, dataItem);
                    var cells = row.find("td:not(.t-hierarchy-cell,.t-group-cell)");
                    var input = row.find(':input:enabled:visible:first');
                    this.changeLog.insert(dataItem);
                    
                    this.td = input.closest('td')[0];
                    if (!this.td) {
                        var idx = 0;
                        $.each(this.columns, function(index, column) {
                            if(!column.hidden && !column.readonly) {
                                idx = index;
                                return false;
                            }
                        });

                        this.td = cells[idx];
                    }

                    for (var i = this.columns.length - 1; i >= 0; i--) {
                        if (!this.columns[i].readonly) {
                            var cell = cells.eq(i);
                            if (cell[0] != this.td) {
                                cell.prepend('<span class="t-dirty" />');
                            }
                        }
                    }

                    $t.trigger(this.element, 'edit', {
                        mode: 'insert',
                        form: this.form()[0],
                        dataItem: dataItem,
                        cell: this.td
                    });

                    this.validation();
                    input.focus();
                }
            }

            if (this.editing.mode != 'PopUp') {
                this.$tbody.find(" > tr.t-no-data").hide();
            }
        },

        extractValues: function ($tr, extractKeys) {
            var values = this.modelBinder.bind($tr);

            if (extractKeys) {
                var dataItem = this.dataItem($tr.data('tr') || $tr);

                for (var dataKey in this.dataKeys) {
                    var value = this.valueFor({ member: dataKey })(dataItem);
                    if (value instanceof Date)
                        value = $t.formatString('{0:G}', value);

                    values[this.ws ? dataKey : this.dataKeys[dataKey]] = value;
                }
            }
            return values;
        },

        cancelRow: function ($tr) {
            if (!$tr.length)
                return;

            var tr = ($tr.data('tr') || $tr)[0];

            var dataItem = this.dataItem($tr);

            this._onCommand({ name: "cancel", row: tr});

            this.rowEditor.cancel($tr, dataItem);

            if ($tr.is('.t-grid-new-row')) {
                if (!this.changeLog || !this.changeLog.inserted.length) {
                    this.$tbody.find(" > tr.t-no-data").show();
                }
                return;
            }

            $t.trigger(this.element, 'rowDataBound', { row: $tr[0], dataItem: dataItem });
        },

        validate: function () {
            var form = this.form();
            if (form.length) {
                var validator = form.validate();
                var valid = validator.form();
                if (validator.pendingRequest) {
                    validator.formSubmitted = true;
                    return false;
                }
                return valid;
            }
            return true;
        },

        cancel: function () {
            this.cancelRow(this.$tbody.find('>.t-grid-edit-row'));
        },
        _dataSource: function () {
            var that = this,
                options = this._dataSourceOptions(),
                data = options.data,
                routeKeys = [],
                getters = [];

            $.each(that.dataKeys, function (dataKey, routeKey) {
                routeKeys.push(routeKey);
                getters.push($t.getter(dataKey));
            });

            if (that.isAjax()) {
                $.extend(true, options, {
                    model: $t.Model.define({
                        id: function (data, value) {
                            var keys;

                            if (value === undefined) {
                                return $.map(getters, function (getter) {
                                    return getter(data);
                                }).join("-");
                            } else {
                                keys = value.split("-");

                                $.each(routeKeys, function (index, routeKey) {
                                    data[routeKey] = keys[index];
                                });
                            }
                        }
                    })
                });
            }
            that.dataSource = new $t.DataSource(options);

            if (data && data.data) {
                that._convertInitialData(data.data);
            }

            that.dataSource.bind("change", $.proxy(that._dataChange, that));
        },
        _convert: function (values) {
            for (var key in values) {
                var value = values[key], column, format;
                if (value instanceof Date) {
                    column = this.columnFromMember(key);
                    format = '{0:G}';

                    if (column && column.format)
                        format = column.format;

                    values[key] = this.ws ? '\\/Date(' + value.getTime() + ')\\/' : $t.formatString(format, value);
                }
                if (typeof value === "number") {
                    var numericType = "numeric",
                        types = { "n": numericType, "p": "percent", "c": "currency", "#": numericType, "0": numericType };

                    column = this.columnFromMember(key),
                    format = (column && column.format ? column.format : "N").toLowerCase(),

                    value = value.toString();
                    var type = format.match(numberTypeRegExp) || format.match(customFormatRegEx);
                    values[key] = type ? value.replace(".", $t.cultureInfo[types[type] + "decimalseparator"]) : value;
                }

                if (value == undefined) {
                    delete values[key];
                }
                if ($.isPlainObject(value)) {
                    this._convert(value);
                }
            }
            return values;
        },

        sendValues: function (values, url, commandName) {
            if (this.editing.mode != 'InCell' || !this.ws) {
                this._convert(values);

                for (var dataKey in this.dataKeys) {
                    var value = this.valueFor({ member: dataKey })(values);
                    if (value != undefined) {
                        values[this.ws ? dataKey : this.dataKeys[dataKey]] = value;
                    }
                }
            }

            this.showBusy();

            $.ajax(this.ajaxOptions({
                data: this.ws ? (this.editing.mode == 'InCell' ? values : { value: values }) : values,
                url: this.url(url),
                hasErrors: $.proxy(this.hasErrors, this),
                commandName: commandName,
                displayErrors: $.proxy(this.displayErrors, this)
            }));
        },

        displayErrors: function (data) {
            this.errorView.bind($('#' + this.formId()), data.modelState);
        },

        hasErrors: function (data) {
            var modelState = data.modelState;
            var result = false;

            if (modelState) {
                $.each(modelState, function (key, value) {
                    if ('errors' in value) {
                        result = true;
                        return false;
                    }
                });
            }

            return result;
        },

        formId: function () {
            return $(this.element).attr('id') + 'form';
        },

        validation: function () {
            this.validator().parse();
        },

        validator: function () {
            if (this.validationMetadata) {
                return new Mvc2Validator(this.validationMetadata);
            } else {
                return new UnobtrusiveValidator("#" + this.formId());
            }
        }
    }

    $t.grid.ModelBinder = function () {
        this.binders = {
            ':input.t-autocomplete': function () {
                return $(this).val();
            },
            '.t-numerictextbox :input': function () {
                return $(this).data('tTextBox')
                              .value();
            },
            ':input[name]:not(.t-input, :radio, :button),:radio:checked': function () {
                return $(this).val();
            },
            ':checkbox': function () {
                return $(this).is(':checked');
            },
            '.t-datepicker :input': function () {
                return $(this).data('tDatePicker')
                              .value();
            },
            '.t-timepicker :input': function () {
                return $(this).data('tTimePicker')
                              .value();
            },
            '.t-datetimepicker :input': function () {
                return $(this).data('tDateTimePicker')
                              .value();
            },
            '.t-editor textarea:hidden': function () {
                var editor = $(this).closest(".t-editor")
                                    .data("tEditor");
                if (editor.encoded) {
                    return editor.encodedValue();
                }
                return editor.value();
            }
        };

        this.bind = function ($ui) {
            var model = {};

            $.each(this.binders, function (selector, callback) {
                $ui.find(selector).each(function () {
                    if (!this.disabled) model[this.name] = callback.call(this);
                });
            });

            return model;
        }
    }

    $t.grid.FormViewBinder = function (converters) {
        this.converters = converters || {};
        this.binders = {
            ':input:not(:radio):not([type="file"])': function (value) {
                if (typeof value == 'boolean') {
                    value = value + "";
                }
                $(this).val(value);
            },
            ':checkbox': function (value) {
                $(this).attr('checked', value == true);
            },
            ':radio': function (value) {
                var input = $(this).val();
                if (typeof value == 'boolean') {
                    input = input.toLowerCase();
                }
                if (input == value.toString()) {
                    $(this).attr('checked', true);
                }
            }
        };

        function evaluator(type) {
            return function (value) {
                $(this).data(type)
                       .value(value);
            };
        }

        function editorEvaluator() {
            return function (value) {
                $(this).closest(".t-editor")
                       .data("tEditor")
                       .value(value);
            };
        }

        this.binders['.t-numerictextbox :input'] = evaluator('tTextBox');
        this.binders['.t-dropdown :input:hidden'] = evaluator('tDropDownList');
        this.binders['.t-datepicker :input'] = evaluator("tDatePicker");
        this.binders['.t-datetimepicker :input'] = evaluator("tDateTimePicker");
        this.binders['.t-timepicker :input'] = evaluator("tTimePicker");
        this.binders['.t-slider :input'] = evaluator("tSlider");
        this.binders['.t-combobox :input:hidden'] = evaluator('tComboBox');
        this.binders['.t-editor textarea:hidden'] = editorEvaluator();

        this.evaluate = function (model, expression) {
            if (expression != null) {
                var value = model, match = false, members = expression.split('.');

                while (members.length) {
                    var member = members.shift();

                    if (member.indexOf("[") > -1) {
                        value = new Function("d", "try { return d." + member + "}catch(e){}")(value);
                        if (value != null) {
                            match = true;
                        } else {
                            value = model;
                        }
                    } else if (value != null && typeof (value[member]) != 'undefined') {
                        value = value[member];
                        match = true;
                    } else if (match) {
                        match = false;
                        break;
                    }
                }

                if (match && !$.isPlainObject(value)) {
                    var date = dateRe.exec(value);
                    if (date)
                        value = new Date(parseInt(date[1]));

                    var type = $t.getType(value);

                    if (type in this.converters)
                        value = this.converters[type](expression, value);

                    return value;
                }
            }
        }

        this.bind = function ($ui, model) {
            var undefined;

            $.each(this.binders, $.proxy(function (selector, callback) {
                $ui.find(selector).each($.proxy(function (index, element) {
                    var value = this.evaluate(model, element.name);
                    if (value != undefined)
                        callback.call(element, value);
                }, this));
            }, this));
        }
    }

    $t.grid.CellBuilder = function (options) {
        function impl(dataItem, method) {
            var editableIndex = 0;
            $.each(options.columns, function(index, column) {
                if (!column.readonly && !column.hidden) {
                    editableIndex = index;
                    return false;
                }
            });

            return $.map(options.columns, function (column, index) {
                var className;

                if (index == 0 && method == "insert") {
                    className = "t-grid-edit-cell";
                } else if (index == options.columns.length - 1) {
                    className = "t-last";
                }                                

                return '<td ' + (column.attr ? column.attr : '') + (className ? ' class="' + className + '"' : "") + ">" +
                            column[index == editableIndex ? method : 'display'](dataItem) +
                       '</td>';
            }).join('');
        }

        this.edit = function (dataItem) {
            return impl(dataItem, 'edit');
        }

        this.insert = function (dataItem) {
            return impl(dataItem, 'insert');
        }

        this.display = function (dataItem) {
            return impl(dataItem, 'display');
        }
    }

    $t.grid.DataCellBuilder = function (options) {

        function impl(dataItem, method) {
            return $.map(options.columns, function (column, index) {
                return '<td ' + (column.attr ? column.attr : '') + (index == options.columns.length - 1 ? ' class="t-last">' : '>') +
                            column[method](dataItem) +
                       '</td>';
            }).join('');
        }

        this.edit = function (dataItem) {
            return impl(dataItem, 'edit');
        }

        this.insert = function (dataItem) {
            return impl(dataItem, 'insert');
        }

        this.display = function (dataItem) {
            if (options.rowTemplate) {
                return '<td colspan="' + options.columns.length + '">' + options.rowTemplate(dataItem) + "</td>";
            }

            return impl(dataItem, 'display');
        }
    }

    $t.grid.FormContainerBuilder = function (options) {
        function impl(method) {
            return '<div class="t-edit-form-container">' +
                        options.html() +
                        options[method]() +
                   '</div>';
        }

        this.edit = function () {
            return impl('edit');
        }

        this.insert = function () {
            return impl('insert');
        }
    }

    function form(id) {
        return $('<form />', { id: id }).addClass('t-edit-form').submit($t.preventDefault);
    }

    $t.grid.PopUpEditor = function (options) {

        var wnd;

        function destroy() {
            var w = wnd.data('tWindow');
            w && w.close();
            wnd.remove();
        }

        function impl(dataItem, method) {
            var settings = options.settings;

            wnd = $('<div />', { id: options.container.id + 'PopUp' })
                    .appendTo(options.container)
                    .css({ top: 0, left: '50%', marginLeft: -90 })
                    .tWindow(settings)
                    .find('.t-window-content')
                    .append(options[method](dataItem))
                    .wrapInner(form(options.id))
                    .end();

            $(options.container).one('dataBound', destroy);

            wnd.find('.t-close')
               .click($t.stopAll(destroy))
               .end()
               .data('tWindow')
               .open()
               .title((settings && settings.title) ? settings.title : options[method + 'Title']);

            return wnd;
        }

        this.edit = function (tr, dataItem) {
            tr.addClass('t-grid-edit-row');
            return impl(dataItem, 'edit').data('tr', tr);
        }

        this.insert = function (tr, dataItem) {
            return impl(dataItem, 'insert');
        }

        this.cancel = function (tr) {
            tr.removeClass('t-grid-edit-row');
            destroy();
        }
    }

    $t.grid.Editor = function (options) {
        var groups = options.groups || function () { return 0 };

        function impl(tr, dataItem, method) {
            var td = tr.find('.t-group-cell,.t-hierarchy-cell');

            tr.addClass('t-grid-edit-row')
              .empty()
              .append(td)
              .append(options[method](dataItem))
              .closest('table')
              .wrap(function () {
                  if (!$(this).parent().is('form'))
                      return form(options.id);
              });
        }

        this.cancel = function (tr, dataItem) {
            if (tr.is('.t-grid-new-row')) {
                tr.remove();
            } else {
                impl(tr, dataItem, 'cancel');
                tr.removeClass('t-grid-edit-row');
            }
        }

        this.insert = function (container, dataItem) {
            var html = '<tr class="t-grid-new-row">' +
                       new Array(groups() + 1).join('<td class="t-group-cell" />') +
                       ((options.details) ? '<td class="t-hierarchy-cell"/>' : "") +
                       '</tr>';
            var tr = $(html);

            if (options.insertRow == "bottom") {
                container.append(tr);
            } else {
                container.prepend(tr);
            }

            impl(tr, dataItem, 'insert');

            if (options.insertRow == "bottom") {
                container.closest(".t-grid-content").scrollTop(tr[0].offsetTop + tr[0].offsetHeight);
            }

            return tr;
        }

        this.edit = function (tr, dataItem) {
            impl(tr, dataItem, 'edit');
            return tr;
        }
    }

    $t.grid.CellEditor = function (options) {

        this.edit = function (td, dataItem) {
            var column = options.columns[options.cellIndex(td)];

            if (!column.readonly) {
                td.parent()
                  .addClass('t-grid-edit-row')
                  .end()
                  .empty()
                  .html(column.edit(dataItem))
                  .closest('table')
                  .wrap(function () {
                      if (!$(this).parent().is('form'))
                          return form(options.id);
                  });

                options.bind(td, dataItem);

                options.validate();

                td.find(':input:visible:first')
                  .trigger("focusin")
                  .focus();

                td.addClass('t-grid-edit-cell');

                if ($.browser.msie && $.browser.version < 9) {
                    var dataArea = td.closest('.t-grid-content');
                    dataArea.scrollLeft(dataArea.scrollLeft());
                }
            }

            return !column.readonly;
        }

        this.display = function (td, dataItem) {
            var column = options.columns[options.cellIndex(td)];

            td.removeClass('t-grid-edit-cell')
              .empty()
              .html(column.display(dataItem))
              .parent()
              .removeClass('t-grid-edit-row');
        }
    }

    $t.grid.ChangeLog = function (size, insertRowPosition) {
        this.insert = function (index, values) {
            if (values == undefined) {
                values = index;
                if (insertRowPosition == "bottom") {
                    this.inserted.push(values);
                } else {
                    this.inserted.splice(0, 0, values);
                }
            } else {
                var original = this.inserted[index];

                if (original === undefined) {
                    this.inserted.splice(0, 0, values);
                } else {
                    $.extend(original, values);
                }
            }
        }

        this.get = function (index) {
            var inserted = this.inserted[index];

            if (this.inserted[index]) {
                return inserted;
            }

            return this.updated[index - this.inserted.length];
        }

        this.update = function (index, original, values) {
            index = index - this.inserted.length;

            var last = this.updated[index] || original || {};

            var dirty = false;

            for (var member in values) {
                var sourceValue = last[member],
                    destValue = values[member];

                if (sourceValue instanceof Date) {
                    if (destValue instanceof Date && destValue.getTime() !== sourceValue.getTime()) {
                        dirty = true;
                    }
                } else if (destValue !== sourceValue) {
                    dirty = true;
                }
            }

            if (dirty) {
                this.updated[index] = $.extend({}, last, values);
            }

            return dirty;
        }

        this.erase = function (index, values) {
            var inserted = this.inserted[index];

            if (inserted) {
                this.inserted.splice(index, 1);
            } else {
                index = index - this.inserted.length;

                var updated = this.updated[index];
                if (updated) {
                    delete this.updated[index];
                }

                this.deleted[index] = values;
            }
        }

        this.clear = function () {
            this.updated = new Array(size);
            this.deleted = new Array(size);
            this.inserted = [];
        }        

        this.serialize = function (inserted, updated, deleted) {
            return $.extend({},
                serialize(inserted, 'inserted', function () {
                    return true;
                }),
                serialize(updated, 'updated', function (dataItem) {
                    return dataItem !== undefined;
                }),
                serialize(deleted, 'deleted', function (dataItem) {
                    return dataItem !== undefined;
                })
            );
        }

        this.dirty = function () {

            if (this.inserted.length) {
                return true;
            }

            for (var i = 0; i < this.updated.length; i++) {
                if (this.updated[i]) {
                    return true;
                }
            }

            for (i = 0; i < this.deleted.length; i++) {
                if (this.deleted[i]) {
                    return true;
                }
            }

            return false;
        }

        this.clear();
    }

    $t.grid.ErrorView = function () {
        this.bind = function ($ui, modelState) {
            $ui.find('span[id$=_validationMessage]')
               .removeClass('field-validation-error')
               .addClass('field-validation-valid')
               .html('')
               .end()
               .find('.input-validation-error')
               .removeClass('input-validation-error')
               .addClass('valid');

            $.each(modelState, function (key, value) {
                if ('errors' in value && value.errors[0]) {
                    var originalKey = key;
                    key = key.replace('.', '_');
                    $ui.find('#' + key + '_validationMessage, [data-valmsg-for="' + originalKey + '"]')
                       .html(value.errors[0])
                       .removeClass('field-validation-valid')
                       .addClass('field-validation-error')
                       .end()
                       .find('#' + key)
                       .removeClass('valid')
                       .addClass('input-validation-error');
                }
            });
        }
    }
})(jQuery);
