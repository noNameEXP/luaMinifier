function minifyLua() {
    const luaInput = document.getElementById("luaInput").value;
    // Simple minifier: removes unnecessary whitespace and comments
    let minified = luaInput
        .replace(/--.*?(\r?\n|$)/g, '\n') // Remove single line comments, keeping newlines
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multiline comments

    // Regular expressions for variable and function declarations
    const variableRegex = /\blocal\s+([a-zA-Z_][a-zA-Z0-9_]*)\b(?!\s*\()/g;
    const functionRegex = /\bfunction\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    let variableCounter = 1;
    const variables = new Map();
    const functions = new Set();

    // Collect all unique function names
    minified.replace(functionRegex, (match, p1) => {
        functions.add(p1);
        return match;
    });

    // Collect all unique variable names
    minified.replace(variableRegex, (match, p1) => {
        if (!keywords.has(p1) && !functions.has(p1)) {
            const newVariableName = `BanonaVariable${variableCounter++}`;
            variables.set(p1, newVariableName);
        }
        return match;
    });

    // Replace each variable usage with BanonaVariableNumber, except for function names
    variables.forEach((newVariable, originalVariable) => {
        const variableReplaceRegex = new RegExp(`\\b${originalVariable}\\b`, 'g');
        minified = minified.replace(variableReplaceRegex, newVariable);
    });

    document.getElementById("luaInput").value = minified;
}

// Lua keywords to avoid replacing
const keywords = new Set([
    'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for',
    'function', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat',
    'return', 'then', 'true', 'until', 'while'
]);
