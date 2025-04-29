console.log('lol 2'); // Debug output for testing

class Parser {
  constructor(tokens) { // Initialize parser with tokens
    this.tokens = tokens; // Store token array
    this.current = 0; // Start at first token
  }
  
  parse() { // Begin parsing tokens
    return this.expression(); // Start with expression
  }
  
  isAtEnd() { // Check if parsing complete
    return this.current >= this.tokens.length; // No tokens left
  }
  
  peek() { // Look at current token
    if (this.isAtEnd()) return null; // Return null if done
    return this.tokens[this.current]; // Current token
  }
  
  advance() { // Move to next token
    if (!this.isAtEnd()) this.current++; // Increment if available
    return this.tokens[this.current - 1]; // Return previous token
  }
  
  check(type) { // Check token type
    if (this.isAtEnd()) return false; // False if done
    return this.peek().type === type; // Compare types
  }
  
  expression() { // Handle expressions
    return this.term(); // Start with terms
  }
  
  term() { // Handle + and - operations
    let expr = this.factor(); // Get left operand
    
    while (this.check('OPERATOR') && (this.peek().value === 'plus' || this.peek().value === 'minus' || this.peek().value === 'add' || this.peek().value === 'subtract')) { // Check add/subtract ops
      const operator = this.advance().value; // Get operator
      const right = this.factor(); // Get right operand
      
      expr = { // Create binary expression
        type: 'BinaryExpression',
        operator: operator === 'plus' || operator === 'add' ? '+' : '-', // Normalize operator
        left: expr,
        right: right
      };
    }
    
    return expr; // Return built expression
  }
  
  factor() { // Handle * and / operations
    let expr = this.primary(); // Get left operand
    
    while (this.check('OPERATOR') && (this.peek().value === 'times' || this.peek().value === 'multiply' || this.peek().value === 'divided by')) { // Check multiply/divide ops
      const operator = this.advance().value; // Get operator
      const right = this.primary(); // Get right operand
      
      expr = { // Create binary expression
        type: 'BinaryExpression',
        operator: operator === 'divided by' ? '/' : '*', // Normalize operator
        left: expr,
        right: right
      };
    }
    
    return expr; // Return built expression
  }
  
  primary() { // Handle atomic values
    if (this.check('NUMBER')) { // Check for number
      const token = this.advance(); // Get number token
      const numberMap = { // Word-to-number mapping
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
        'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      
      return { // Return number node
        type: 'Number',
        value: numberMap[token.value] // Convert word to number
      };
    }
    
    if (this.check('VARIABLE')) { // Check for variable
      const token = this.advance(); // Get variable token
      return { // Return variable node
        type: 'Variable',
        name: token.value // Variable name
      };
    }
    
    if (this.check('FUNCTION')) { // Check for function
      const funcToken = this.advance(); // Get function token
      const argument = this.primary(); // Get argument
      
      return { // Return function call
        type: 'FunctionCall',
        func: funcToken.value, // Function name
        argument: argument // Function argument
      };
    }
    
    throw new Error('Unexpected token: ' + JSON.stringify(this.peek())); // Error handling
  }
}

module.exports = { Parser }; // Export Parser class