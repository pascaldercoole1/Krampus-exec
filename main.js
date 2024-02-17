const socketUrl = 'wss://loader.live/?login_token="YOUR_TOKEN_HERE"'; // Add your Token here (Token is inside 'launch.cfg' (without '|RO-EXEC'))
let socket = null; 

function wss() {
  socket = new WebSocket(socketUrl);

  socket.addEventListener("open", () => {
    console.log("WebSocket connection established.");
  });

  socket.addEventListener("message", (event) => {
    console.log("Received message from server:", event.data);
  });

  socket.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });

  socket.addEventListener("close", () => {
    setTimeout(() => {
      wss();
    }, 1000);
    console.log("WebSocket connection closed.");
  });
}

wss();
let editor;
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("execute").addEventListener("click", () => {
    // alert("wow");
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(`<SCRIPT>${editor.getValue()}`);
    } else {
      console.error("WebSocket connection is not open.");
    }
  });
  document.getElementById("clear").addEventListener("click", () => {
    // alert("so Pro");
    editor.setValue("");
  });
});

window.MonacoEnvironment = { getWorkerUrl: () => proxy };

const monacoConfig = {
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs" },
};
const themeRules = [
  { token: "keyword", foreground: "4959b0" },
  { token: "identifier", foreground: "8185a1" },
  { token: "string", foreground: "4959b0" },
  { token: "number", foreground: "4959b0" },
  { token: "comment", foreground: "6A9955", fontStyle: "italic" },
  { background: "#1b1a1d" },
];
const themeColors = {
  "editor.foreground": "#ffffff",
  "editor.background": "#202020",
  "editorCursor.foreground": "#A7A7A7",
  "editor.lineHighlightBackground": "#2D2D30",
  "editorLineNumber.foreground": "#858585",
  "editor.selectionBackground": "#3A3D41",
  "editor.inactiveSelectionBackground": "#2b2d30",
};

require.config(monacoConfig);
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor'), {
        theme: "vs-dark",
        inherit: true,
        rules: themeRules,
        language: "lua",
        colors: themeColors,
        value: "Made by neverloseyoursmile_88 and isw_. \ndiscord.gg/NeverLoseYourSmile | discord.gg/twiz", // -- Omer is pro!
    });
    monaco.languages.registerCompletionItemProvider("lua", {
        provideCompletionItems: function (model, position) {
            var word = model.getWordUntilPosition(position);
            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };
            var suggestions = [
                {
                    label: "game",
                    kind: monaco.languages.CompletionItemKind.Module,
                    documentation: "The game object provides access to various aspects of the game.",
                    insertText: "game:",
                    range: range,
                },
                {
                    label: "print",
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: "Prints the provided values to the output window.",
                    insertText: "print(\"\")",
                    range: range,
                },
                {
                    label: "wait",
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: "Suspends the execution of the script for the given amount of time.",
                    insertText: "wait(\"\")",
                    range: range,
                },
                {
                    label: "if",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    documentation: "Begins an if statement to conditionally execute code.",
                    insertText: "if",
                    range: range,
                },
                {
                    label: "elseif",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    documentation: "Adds an additional condition to an if statement.",
                    insertText: "elseif",
                    range: range,
                },
                {
                    label: "else",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    documentation: "Executes code if none of the previous conditions are true.",
                    insertText: "else",
                    range: range,
                },
                {
                    label: "for",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    documentation: "Begins a loop that iterates a specific number of times.",
                    insertText: "for",
                    range: range,
                },
                {
                    label: "while",
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    documentation: "Begins a loop that continues executing code as long as a condition is true.",
                    insertText: "while",
                    range: range,
                },
                // you can add more suggestions here...
            ];

            return { suggestions: suggestions };
        },
    });
    monaco.languages.registerCompletionItemProvider("lua", {
        triggerCharacters: [":"],
        provideCompletionItems: function (model, position) {
            var textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });
            var match = textUntilPosition.match(/\:\s*$/);
            if (!match) return { suggestions: [] };

            var word = model.getWordUntilPosition(position);
            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };
            var suggestions = [
                {
                    label: ':FindFirstChild',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the first child of the Instance found with the given name.',
                    insertText: 'FindFirstChild()',
                    range: range
                },
                {
                    label: ':FindFirstAncestor',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the first ancestor of the Instance whose Name is equal to the given name.',
                    insertText: 'FindFirstAncestor()',
                    range: range
                },
                {
                    label: ':GetChildren',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns an array containing all of the Instance\'s children.',
                    insertText: 'GetChildren()',
                    range: range
                },
                {
                    label: ':GetFullName',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns a string describing the Instance\'s ancestry.',
                    insertText: 'GetFullName()',
                    range: range
                },
                {
                    label: ':GetPropertyChangedSignal',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns an event that fires when a given property of an object changes.',
                    insertText: 'GetPropertyChangedSignal()',
                    range: range
                },
                {
                    label: ':IsDescendantOf',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns true if an Instance is a descendant of the given ancestor.',
                    insertText: 'IsDescendantOf()',
                    range: range
                },
                {
                    label: ':SetPrimaryPartCFrame',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Sets the PrimaryPart of a Model to the given CFrame.',
                    insertText: 'SetPrimaryPartCFrame()',
                    range: range
                },
                {
                    label: ':WaitForChild',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the child of the Instance with the given name. If the child does not exist, it will yield the current thread until it does.',
                    insertText: 'WaitForChild()',
                    range: range
                },
                {
                    label: ':ClearAllChildren',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Removes all of an Instance\'s children.',
                    insertText: 'ClearAllChildren()',
                    range: range
                },
                {
                    label: ':FindFirstAncestorOfClass',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the first ancestor of the Instance whose ClassName is equal to the given className.',
                    insertText: 'FindFirstAncestorOfClass()',
                    range: range
                },
                {
                    label: ':FindFirstAncestorWhichIsA',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the first ancestor of the Instance for whom IsA returns true for the given className.',
                    insertText: 'FindFirstAncestorWhichIsA()',
                    range: range
                },
                {
                    label: ':FindFirstChildOfClass',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the first child of the Instance whose ClassName is equal to the given className.',
                    insertText: 'FindFirstChildOfClass()',
                    range: range
                },
                {
                    label: ':FindFirstChildWhichIsA',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the first child of the Instance for whom IsA returns true for the given className.',
                    insertText: 'FindFirstChildWhichIsA()',
                    range: range
                },
                {
                    label: ':GetAttribute',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the attribute which has been assigned to the given name.',
                    insertText: 'GetAttribute()',
                    range: range
                },
                {
                    label: ':GetAttributes',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns a dictionary of string → variant pairs for each of the Instance\'s attributes.',
                    insertText: 'GetAttributes()',
                    range: range
                },
                {
                    label: ':GetDebugId',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns an coded string of the Instance\'s DebugId used internally by Roblox.',
                    insertText: 'GetDebugId()',
                    range: range
                },
                {
                    label: ':GetPrimaryPartCFrame',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns a CFrame that describes the PrimaryPart’s position and orientation in world space.',
                    insertText: 'GetPrimaryPartCFrame()',
                    range: range
                },
                {
                    label: ':IsAncestorOf',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns true if an Instance is an ancestor of the given descendant.',
                    insertText: 'IsAncestorOf()',
                    range: range
                },
                {
                    label: ':IsA',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns true if an Instance\'s class matches or inherits from a given class.',
                    insertText: 'IsA()',
                    range: range
                },
                {
                    label: ':MoveTo',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Sets the object’s Position to the given Vector3.',
                    insertText: 'MoveTo()',
                    range: range
                },
                {
                    label: ':Remove',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'This function destroys all of an Instance\'s children.',
                    insertText: 'Remove()',
                    range: range
                },
                {
                    label: ':SetAttribute',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Sets the attribute with the given name to the given value.',
                    insertText: 'SetAttribute()',
                    range: range
                },
                {
                    label: ':TranslateBy',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Applies a Vector3 displacement to the Position of a Part.',
                    insertText: 'TranslateBy()',
                    range: range
                },
                {
                    label: ':GetMass',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns the mass of the Part in kilograms.',
                    insertText: 'GetMass()',
                    range: range
                },
                {
                    label: ':CanCollideWith',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns true if the part can collide with another part.',
                    insertText: 'CanCollideWith()',
                    range: range
                },
                {
                    label: ':GetConnectedParts',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns a table of the parts connected to this part.',
                    insertText: 'GetConnectedParts()',
                    range: range
                },
                {
                    label: ':GetJoints',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Returns a table of the joints connected to this part.',
                    insertText: 'GetJoints()',
                    range: range
                },
                {
                    label: ':BreakJoints',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Breaks all joints connected to this part.',
                    insertText: 'BreakJoints()',
                    range: range
                },
                {
                    label: ':MakeJoints',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Creates joints between this part and its touching parts.',
                    insertText: 'MakeJoints()',
                    range: range
                },
                {
                    label: ':SetNetworkOwner',
                    kind: monaco.languages.CompletionItemKind.Method,
                    documentation: 'Sets the network owner of a part, which is the player who has authority over the physical state of the part.',
                    insertText: 'SetNetworkOwner()',
                    range: range
                },
            ];

            return { suggestions: suggestions };
        },
    });

    function CheckStatus() {

        if (socket && socket.readyState === WebSocket.OPEN) {
            document.getElementById("connectionStatus").textContent = "Status: Connected 😁"
          } else {
            document.getElementById("connectionStatus").textContent = "Status: Not Connected 😢"
          }

      }
      
    // setInterval(CheckStatus, 5000); -- MAYBE SOON IDK

});