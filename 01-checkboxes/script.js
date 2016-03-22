function CheckboxesGame(width, height, selector) {
  this._width = width;
  this._height = height;
  this._selector = selector;
  this._id = `${selector}_${CheckboxesGame.prototype.uid++}`;

  this._element = document.querySelector(selector);
  if(!this._element) {
    throw new Error('Target element not found');
  }

}

CheckboxesGame.prototype.uid = 0;

CheckboxesGame.prototype.getTemplate = function() {
  const yArr = "y".repeat(this._height).split('');
  const xArr = "x".repeat(this._width).split('');
  const body = yArr.map(
    (rowNum) => xArr.map(
      (colNum) => `<input type="checkbox" id="${this._id}_${rowNum}_${colNum}" />`
    ).join('')
  ).join('<br />');
  return `<div id="${this._id}">${body}</div>`;
};

CheckboxesGame.prototype.render = function() {
  this._element.innerHTML = this.getTemplate();
};

new CheckboxesGame(5, 5, '#game-box');