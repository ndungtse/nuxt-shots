/**
 * @param data
 * @param cols
 * @returns
 * @description Make a 2D array with the given data and number of columns and equal rows in columns
 */
export const putDataInCols = <T = any>(data: T[], cols: number): T[][] => {
  console.log("put in cols data", data);
  const rows = Math.ceil(data.length / cols);
  const result: T[][] = [];
  for (let i = 0; i < rows; i++) {
    result.push(data.slice(i * cols, i * cols + cols));
  }
  const final: T [][] = reverse2DArray(result);
  console.log("final", final);
  return final;
};

const mixArray = (arr: any[]) => {
  const result = [];
  while (arr.length > 0) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    result.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  console.log("result", result);

  return result;
};

export function reverse2DArray<T = any>(array: T[][]) {
  const numRows = array.length;
  const numCols = array[0].length;

  // Create a new array with reversed dimensions
  const reversedArray = new Array(numCols);
  for (let i = 0; i < numCols; i++) {
    reversedArray[i] = new Array(numRows);
  }

  // Copy values from the original array to the reversed array
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // if (!array[i][j]) {
      //   continue;
      // }
      reversedArray[j][i] = array[i][j];
    }
  }

  return reversedArray;
}

export function transformTo2DArrayWithEqualRows(arr: any[], numCols: number) {
  const numRows = Math.ceil(arr.length / numCols);
  const result = [];
  let currentIndex = 0;

  for (let i = 0; i < numRows; i++) {
    const currentRow = [];
    let elementsToAdd = Math.floor(arr.length / numRows);

    if (i < arr.length % numRows) {
      elementsToAdd++;
    }

    for (let j = 0; j < elementsToAdd; j++) {
      currentRow.push(arr[currentIndex]);
      currentIndex++;
    }

    result.push(currentRow);
  }

  return result;
}
