~ Math DSL Translator

A JavaScript tool that converts natural language math expressions (e.g., "two plus three") into Python code (e.g., `2 + 3`).

~ Features

- Translates English phrases to Python math expressions
- Supports numbers (zero to twenty)
- Handles operations: `+`, `-`, `*`, `/`
- Processes square roots ("square root of nine" → `math.sqrt(9)`)
- Maintains proper operator precedence

~ How to Run

~ Prerequisites
- Node.js (v14+ recommended)
- Terminal/Command Prompt

~ Installation
1. Clone/download the project files
2. Navigate to project folder:
   cd path/to/math-dsl

npm install

node main.js "two plus three"
node main.js "two plus three times 4"
node main.js "nine divided by three"

node main.js "two plus three times five"
~ Output: 2 + 3 * 5

node main.js "square root of nine minus one"
~ Output: math.sqrt(9) - 1



