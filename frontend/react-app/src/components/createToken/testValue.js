function isInteger(value) {
    if(parseInt(value,10).toString()===value) {
      return true
    }
    return false;
  }
  
export default isInteger;