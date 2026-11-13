// ==UserScript==
// @name         5kmrun-age
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Show position by age achievement!
// @author       dabidesh
// @match        https://app.5kmrun.bg/5kmrun/result/*
// @icon         https://www.google.com/s2/favicons?domain=5kmrun.bg
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  let timer;

  // Изчакваме DOM промените да приключат
  const observer = new MutationObserver(function () {

    clearTimeout(timer);

    let table = document.querySelector('table');

    if (!table || table.rows.length < 2) return;

    // Изчакваме 700 ms без нови промени
    timer = setTimeout(function () {

      observer.disconnect();

      processTable();

    }, 1400);

  });

  // Наблюдаваме целия DOM
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // Проверка и ако таблицата вече съществува
  let table = document.querySelector('table');

  if (table && table.rows.length >= 2) {
    timer = setTimeout(function () {
      observer.disconnect();
      processTable();
    }, 1400);
  }

  function processTable() {

    let table = document.querySelector('table');

    if (!table) return;

    let rows = table.rows;

    let colAchievement = [];
    let colPositions = [];

    for (let i = 1; i < rows.length; i++) {

      let cell = rows[i].cells[5];

      if (cell) {
        colAchievement.push(cell.textContent.trim());
      }

      let cellP = rows[i].cells[0];

      if (cellP) {
        colPositions.push(
          cellP.querySelector('span')?.textContent ?? ''
        );
      }
    }

    let colNumbers = colAchievement.map(function (i) {
      return i == 'Няма' ? 0 : parseFloat(i);
    });

    let colNumbersCopy = colNumbers.slice();

    colNumbersCopy = colNumbersCopy.map(function (i) {
      return i == 0 ? '-' : i;
    });

    let sorted = colNumbers.sort((a, b) => b - a);

    for (let i = 0; i < colPositions.length; i++) {

      let index = sorted.indexOf(colNumbersCopy[i]);

      if (index == -1) {
        colPositions[i] = colPositions[i] + '(-)';
      } else {
        colPositions[i] =
          colPositions[i] + '(' + Number(index + 1) + ')';
      }
    }

    for (let i = 1; i < rows.length; i++) {

      let cellP = rows[i].cells[0];

      if (cellP) {
        let span = cellP.querySelector('span');

        if (span) {
          span.textContent = colPositions[i - 1];
        }
      }
    }
  }

})();
