function translateToPython(ast) {  // Main translation entry point
  return translateNode(ast);       // Start recursive translation
}

function translateNode(node) {     // Handle node translation
  switch (node.type) {            // Check node type
    
    case 'Number':                // Handle numeric literals
      return node.value.toString(); // Convert to string
    
    case 'Variable':              // Handle variables
      return node.name;           // Return variable name
    
    case 'BinaryExpression':      // Handle math operations
      let left = translateNode(node.left);   // Translate left side
      let right = translateNode(node.right); // Translate right side
      
      // Handle operator precedence for +/-
      if (node.operator === '+' || node.operator === '-') {
        if (node.left.type === 'BinaryExpression' && 
            (node.left.operator === '*' || node.left.operator === '/')) {
          left = `(${left})`;    // Add parentheses for precedence
        }
        if (node.right.type === 'BinaryExpression' && 
            (node.right.operator === '*' || node.right.operator === '/')) {
          right = `(${right})`;  // Add parentheses for precedence
        }
      }
      
      // Handle operator precedence for *//
      if ((node.operator === '*' || node.operator === '/') && 
          node.left.type === 'BinaryExpression') {
        left = `(${left})`;      // Add parentheses if needed
      }
      if ((node.operator === '*' || node.operator === '/') && 
          node.right.type === 'BinaryExpression') {
        right = `(${right})`;    // Add parentheses if needed
      }
      
      return `${left} ${node.operator} ${right}`; // Combine expression
    
    case 'FunctionCall':          // Handle function calls
      if (node.func === 'square root of') { // Special case sqrt
        return `math.sqrt(${translateNode(node.argument)})`; // Use math.sqrt
      }
      return `${node.func}(${translateNode(node.argument)})`; // Generic function
    
    default:
      throw new Error(`Unknown node type: ${node.type}`); // Error handling
  }
}

module.exports = { translateToPython }; // Export translator function