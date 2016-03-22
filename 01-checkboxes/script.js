var CheckboxesGame = (function() {
  var LEVELS = [
    [{x: 1, y: 1}, {x: 3, y: 1}],
    [{x: 2, y: 1}, {x: 3, y: 1}],
    [{x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 5}]
  ];

  var uid = 0;

  function CheckboxesGame(width, height, selector) {
    this._width = width;
    this._height = height;
    this._selector = selector;
    this._id = `CheckboxesGame_${uid++}`;

    this._element = document.querySelector(selector);
    if(!this._element) {
      throw new Error('Target element not found');
    }

    this._state = "y".repeat(this._height).split('').map(() => new Array(this._width));

    this.render();
    this.bindListeners();
  }

  CheckboxesGame.prototype.getTemplate = function() {
    const yArr = "y".repeat(this._height).split('');
    const xArr = "x".repeat(this._width).split('');
    const body = yArr.map(
      (_, rowNum) => xArr.map(
        (_, colNum) =>
          `<input type="checkbox" data-row=${rowNum} data-col=${colNum} id="${this._id}_${rowNum}_${colNum}" ${!!this._state[rowNum][colNum] ? 'checked' : ''} />`
      ).join('')
    ).join('<br />');

    const levels = [
      `<select data-role="select-level">`,
      `<option disabled selected>Выберите уровень</option>`,
      LEVELS.map((_, i) => `<option value="${i}">Level ${i + 1}</option>`).join('\n'),
      `</select>`
    ];


    return `
      <div id="${this._id}">
         ${body}
         <br />
         <button data-role="clear">Очистить</button>
         <br />
         ${levels}
       </div>`;
  };

  CheckboxesGame.prototype.bindListeners = function() {
    this._element.addEventListener('click', (ev) => {
      const target = ev.target;
      if (target.hasAttribute('data-role') && target.getAttribute('data-role') === 'clear') {
        this.clearAll().render();
      }
    });

    this._element.addEventListener('change', (ev) => {
      const target = ev.target;
      if(target.hasAttribute('data-row') && target.hasAttribute('data-col')) {
        this.did(+target.getAttribute('data-row'), +target.getAttribute('data-col')).render();
      } else if (target.hasAttribute('data-role') && target.getAttribute('data-role') === 'select-level') {
        this.setLevel(+target.value).render();
      }
    });
  };

  CheckboxesGame.prototype.did = function(x, y) {
    this._state[x][y] = !this._state[x][y];

    if(this._state[x - 1]) {
      this._state[x - 1][y] = !this._state[x - 1][y];
    }
    if(this._state[x + 1]) {
      this._state[x + 1][y] = !this._state[x + 1][y];
    }
    this._state[x][y - 1] = !this._state[x][y - 1];
    this._state[x][y + 1] = !this._state[x][y + 1];
    return this;
  };

  CheckboxesGame.prototype.setLevel = function(num) {
    if(!LEVELS[num]) {
      return;
    }
    this.clearAll();
    LEVELS[num].forEach((cell) => this._state[cell.y][cell.x] = true);
    return this;
  };

  CheckboxesGame.prototype.render = function() {
    this._element.innerHTML = this.getTemplate();
  };

  CheckboxesGame.prototype.clearAll = function() {
    this._state.forEach((row, rowNum) => row.forEach((_, colNum) => this._state[rowNum][colNum] = false));
    return this;
  };

  return CheckboxesGame;
})();

var checkboxesGame = new CheckboxesGame(5, 5, '#game-box');