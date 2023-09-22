
/**
 * @param data 
 * @param cols 
 * @returns 
 * @description Make a 2D array with the given data and number of columns and equal rows in columns
 */
export const putDataInCols = (data: any[], cols: number) => {
  const newData = /* mixArray(data); */ data
  const rows = Math.ceil(newData.length / cols);
  const result: any[][] = [];
  let lastCol= 0;
  console.log('rows', rows);
  
  for (let i = 0; i < data.length; i += rows) {
    result.push(newData.slice(i, i + rows));
  }
  console.log("result", result);
  return result;
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