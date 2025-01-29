export function assertInputWrapperClasses(inputs) {
    const K_OTPINPUT = "k-otp-input",
          K_INPUT_INNER = "k-input-inner",
          INPUT_WRAPPER_CLASSES = `k-input k-textbox k-input-solid k-input-md k-rounded-md ${K_OTPINPUT}`;

        $(inputs).each(function() {
            let inputWrapper = $(this).closest(`.${K_OTPINPUT}`);

            assert.equal(this[0].className, K_INPUT_INNER);
            assert.equal(inputWrapper[0].className, INPUT_WRAPPER_CLASSES);
        });
}

export function assertStyleModeClasses(option, value, inputs) {
    const K_OTPINPUT = "k-otp-input";

    let styleClass,
        valueClass;

    switch (option) {
        case "size":
            styleClass = "k-input-";
            switch (value) {
                case "small":
                    valueClass = "sm";
                    break;
                case "medium":
                    valueClass = "md";
                    break;
                case "large":
                    valueClass = "lg";
                    break;
                case "full":
                    valueClass = "full";
                    break;
                default:
                    break;
            }
            break;
        case "fillMode":
            styleClass = "k-input-";
            switch (value) {
                case "solid":
                    valueClass = "solid";
                    break;
                case "flat":
                    valueClass = "flat";
                    break;
                case "ouline":
                    valueClass = "outline";
                    break;
                default:
                    break;
            }
            break;
        case "rounded":
            styleClass = "k-rounded-";
            switch (value) {
                case "small":
                    valueClass = "sm";
                    break;
                case "medium":
                    valueClass = "md";
                    break;
                case "large":
                    valueClass = "lg";
                    break;
                case "full":
                    valueClass = "full";
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

    $(inputs).each(function() {
       let inputWrapper = $(this).closest(`.${K_OTPINPUT}`);
       assert.equal(inputWrapper[0].className, `${styleClass}${valueClass}`);
    });
}