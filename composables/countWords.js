export const countWords = (word) => {
  return word.match(/[\u00ff-\uffff]|\S+/g).length
}
