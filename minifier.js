function minifyLua() {
    const luaInput = document.getElementById("luaInput").value;
    // Simple minifier: removes whitespace and comments
    let minified = luaInput
        .replace(/\s+/g, ' ')
        .replace(/--.*?(\r?\n|$)/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');

    // Replace variables with BanonaVariableNumber
    const variableRegex = /(\b[a-zA-Z_][a-zA-Z0-9_]*\b)/g;
    let variableCounter = 1;
    const variables = new Set();

    // Collect all unique variable names
    minified.replace(variableRegex, (match) => {
        if (!keywords.has(match)) {
            variables.add(match);
        }
    });

    // Replace each variable with BanonaVariableNumber
    variables.forEach(variable => {
        const newVariableName = `Banona${variableCounter++}`;
        const variableReplaceRegex = new RegExp(`\\b${variable}\\b`, 'g');
        minified = minified.replace(variableReplaceRegex, newVariableName);
    });

    document.getElementById("luaInput").value = minified;
}

// Lua keywords to avoid replacing
const keywords = new Set([
    'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for',
    'function', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat',
    'return', 'then', 'true', 'until', 'while'
]);
