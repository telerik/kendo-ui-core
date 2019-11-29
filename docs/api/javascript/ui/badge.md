---
title: Badge
description: Configuration, methods and events of the Kendo UI Badge
res_type: api
component: badge
---

# kendo.ui.Badge

## Configuration

### appearance  `String` *(default: pill)*

Specifies the shape of the badge - `rectangle` or `pill`.

#### Example

	<button>Button <span id="badge"></span></button>
	<script>
        $('#badge').kendoBadge({
            value: 'badge',
            appearance: 'rectangle'
        })
	</script>

### look `String` *(default: flat)*

Specifies the look of the badge - `flat` or `outlined`.

#### Example

	<button>Button <span id="badge"></span></button>
	<script>
        $('#badge').kendoBadge({
            value: 'badge',
            appearance: 'outlined'
        })
	</script>

### template `String|Function`

The template which renders the content of the badge

#### Example - string template

	<button>Button <span id="badge"></span></button>
	<script>
        $('#badge').kendoBadge({
            value: 1234,
            template: '#=value > 99? "99+" : value#'
        })
	</script>

#### Example - function template

	<button>Button <span id="badge"></span></button>
	<script>
        $('#badge').kendoBadge({
            value: 1234,
            template: function (value){
                return value > 99 ? '99+' : value;
            }
        })
	</script>

### type `String`

Specifies the type of the badge - `primary`, `secondary`, `info`, `success`, `warning` and `error`.

#### Example

	<button>Button <span id="badge"></span></button>
	<script>
        $('#badge').kendoBadge({
            value: 1234,
            template: function (value){
                return value > 99 ? '99+' : value;
            },
            type: 'warning'
        })
	</script>

### value `String|Number`

The value of the badge

#### Example

	<button>Button <span id="badge"></span></button>
	<script>
        $('#badge').kendoBadge({
            value: 1234,
            template: function (value){
                return value > 99 ? '99+' : value;
            },
            type: 'warning'
        })
	</script>

### visible `Boolean`

Ff set to false the badge will not be displayed.

#### Example

	<button>Button <span id="badge"></span></button>
	<script>
        $('#badge').kendoBadge({
            value: 1234,
            template: function (value){
                return value > 99 ? '99+' : value;
            },
            visible: false
        })
	</script>

## Methods

### hide

Hides the badge.

#### Example

	<button>Button <span id="badge"></span></button>
	<script>
        var badge =  $('#badge').kendoBadge({
            value: 'badge'
        }).data('kendoBadge');

        badge.hide();
    </script>

### setOptions

 Modifies the initial configuration of the badge

#### Parameters

##### options `Object`

The new options.

#### Example


	<button>Button <span id="badge"></span></button>
	<script>
        var badge =  $('#badge').kendoBadge({
            value: 7,
            template: function(value){
                return value + 10
            },
            type:'primary'
        }).data('kendoBadge');

        badge.setOptions({
            type: 'error',
            value: 1234,
            template: '#=value > 99? "99+" : value#'
        })
	</script>

### show

Shows the badge.

#### Example

	<button>Button <span id="badge"></span></button>
	<script>
        var badge =  $('#badge').kendoBadge({
            value: 'badge',
            visible: false
        }).data('kendoBadge');

        badge.show();
    </script>

### value

 Sets/gets the value of the badge.

#### Parameters

##### newValue `String|Number`

The new value of the badge.

#### Example


	<button>Button <span id="badge"></span></button>
	<script>
        var badge =  $('#badge').kendoBadge({
            value: 7,
        }).data('kendoBadge');

        badge.value('badge')
	</script>