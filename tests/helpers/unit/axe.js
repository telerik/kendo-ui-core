import axe from "axe-core";

export async function axeRun(container, exclude) {
    let excludedRules = {
        // Skip color contrast violations as those are subject to styling
        "color-contrast": { enabled: false }
    };

    if (exclude && exclude.length) {
        exclude.forEach(function(ex) {
            excludedRules[ex] = { enabled: false };
        });
    }

    const run = await axe.run(container, {
        rules: excludedRules
    });

    try {
        assert.equal(run.violations.length, 0);
    } catch (asseertionError) {
        const violations = axeViolations(run.violations, run.passes.length);

        if (violations.length) {
            asseertionError.stack = violations;
        }
    }
}

function axeViolations(violations, numberOfPasses) {
    let messages = [];
    let numberOfViolations = violations.length;
    let result;

    violations.forEach(function(violation) {
        let nodes = violation.nodes;
        let message = [("Accessibility error: " + violation.impact).toUpperCase()];

        message.push("Description: " + violation.description);
        message.push("Help: " + violation.help);
        message.push("Info: " + violation.helpUrl);

        nodes.forEach(function(node) {
            message.push("Element: " + node.html);
            message.push("\t" + node.failureSummary);
        });

        messages.push(message.join("\r\n"));
    });

    result = messages.join("\r\n===================================================\r\n");

    return result += "\r\nCompliance level: " + Math.floor(numberOfPasses * 100 / (numberOfViolations + numberOfPasses)) + "%";
}