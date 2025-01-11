function minifyLua() {
    const luaInput = document.getElementById("luaInput").value;
    // Simple minifier: removes whitespace and comments
    const minified = luaInput
        .replace(/\s+/g, ' ')
        .replace(/--.*?(\r?\n|$)/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
    document.getElementById("luaInput").value = minified;
}
