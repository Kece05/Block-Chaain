function replaceFinalCharacter(inputString, targetCharacter, replacementCharacter) {
    if (inputString.length > 0) {
      const lastCharacter = inputString.charAt(inputString.length - 1);
  
      if (lastCharacter === targetCharacter) {
        const modifiedString = inputString.slice(0, -1) + replacementCharacter;
        return modifiedString;
      }
    }
  
    return inputString;
}

export default replaceFinalCharacter;