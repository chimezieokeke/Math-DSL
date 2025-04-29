console.log("lol"); // Print lol for debugging

function tokenize(input) { // Tokenize input string
  const tokens = []; // Store parsed tokens
  const words = input.toLowerCase().split(/\s+/); // Split into lowercase words
  
  let i = 0; // Initialize word index
  while (i < words.length) { // Loop through words
    const word = words[i]; // Get current word
    
    if (word === 'divided' && i+1 < words.length && words[i+1] === 'by') { // Check for divided by
      tokens.push({ type: 'OPERATOR', value: 'divided by' }); // Add division operator
      i += 2; // Skip next word
      continue; // Move to next iteration
    }
    
    if (['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].includes(word)) { // Check for number words
      tokens.push({ type: 'NUMBER', value: word }); // Add number token
      i++; // Move to next word
      continue; // Skip rest of loop
    }
    
    if (['plus', 'minus', 'times', 'multiply', 'subtract', 'add'].includes(word)) { // Check for operators
      tokens.push({ type: 'OPERATOR', value: word }); // Add operator token
      i++; // Move to next word
      continue; // Skip rest of loop
    }
    
    if (word === 'square' && i + 2 < words.length && words[i + 1] === 'root' && words[i + 2] === 'of') { // Check for square root
      tokens.push({ type: 'FUNCTION', value: 'square root of' }); // Add function token
      i += 3; // Skip next two words
      continue; // Move to next iteration
    }
    
    if (word.length === 1 && word.match(/[a-z]/)) { // Check single-letter variables
      tokens.push({ type: 'VARIABLE', value: word }); // Add variable token
      i++; // Move to next word
      continue; // Skip rest of loop
    }
    
    tokens.push({ type: 'UNKNOWN', value: word }); // Handle unknown words
    i++; // Move to next word
  }
  
  return tokens; // Return all tokens
}

module.exports = { tokenize }; // Export tokenize function