// A helper function designed to ensure that the combo the user has entered is written in valid numpad notation
export function validateNumPadNotation (notation) {
  // Combos will generally be denoted with ",", ">" or "xx" separating the various steps of the combo, so our first move when checking combo notation submitted by a user will be to split the string they gave us at those symbols
  const notationArray = notation.split(/[,>]|xx/);

  // This is a regex expression that we will use to make sure each step of the combo is written in proper numpad notation
  const numPadEx = /^(([1-9]|\[[1-9]\])*)((LP|MP|HP|PP|LK|MK|HK|KK)+)$/;

  for (let i = 0; i < notationArray.length; i++) {
    // Getting rid of any superfluous spaces in the steps of the combo
    notationArray[i] = notationArray[i].toUpperCase().trim();

    // If a step fails the regex test, we return false
    if (!numPadEx.test(notationArray[i])){
      return false;
    }
  }

  // If every step of the combo they entered passes the regex test, we return the notation array, so it can be used for further operations
  return notationArray;
}