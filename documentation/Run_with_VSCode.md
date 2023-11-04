# Developing with Visual Studio Code

Tips for running the project with VSCode.

## Testing with VSCode

Add the following run configuration to test the current file.

```json
{
    "type": "node",
    "request": "launch",
    "name": "Debug Current Test File",
    "autoAttachChildProcesses": true,
    "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
    "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
    "args": ["run", "${relativeFile}"],
    "smartStep": true,
    "console": "integratedTerminal"
}
```

