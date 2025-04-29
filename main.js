// Debug startup message
console.log("just testing to see if runs ");

// Import parser module and log its exports
const parserModule = require('./parser');
console.log("Parser Module Exports:", Object.keys(parserModule));

// Import required modules from other files
const { tokenize } = require('./lexer');  // Tokenization functionality
const { Parser } = require('./parser');  // AST parser
const { translateToPython } = require('./translator');  // Code generator

// Main processing function
function processMathExpression(input) {
  // Step 1: Convert input string to tokens
  const tokens = tokenize(input);
  
  // Step 2: Parse tokens into AST
  const parser = new Parser(tokens);
  const ast = parser.parse();
  
  // Step 3: Convert AST to Python code
  return translateToPython(ast);
}

// Only run if executed directly (not required as module)
if (require.main === module) {
  // Get input from CLI or use default
  const input = process.argv[2] || "two plus three times five";
  
  // Process and display results
  console.log("\nProcessing:", input);
  const result = processMathExpression(input);
  console.log("\nFinal Python Output:", result);
}

// Export for use as module
module.exports = { processMathExpression };

// Duplicate execution block (should be removed)
if (require.main === module) {
  const input = process.argv[2] || "two plus three times five";
  console.log("\nProcessing:", input);
  const result = processMathExpression(input);
  console.log("\nFinal Python Output:", result);
}