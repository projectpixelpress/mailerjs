const parse_template = function(template, replacements) {
    if (!template) {
        console.log('Cannot null/empty parse template');
        throw new Error('Cannot null/empty parse template');
    }

    let body = template;
    for (replacementKey in replacements) {
        const replaceWith = replacements[replacementKey];
        body = body.split(replacementKey).join(replaceWith);
    }

    return body;
}

module.exports = {
    parse_template: parse_template
};
