const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSetSize = 50;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);
  //let numberCorrect = 0;
  //for (let i = 0; i < testSet.length; i++) {
  //const bucket = knn(trainingSet, testSet[i][0]);
  //if (bucket === testSet[i][3]) {
  //numberCorrect++;
  //}
  //console.log(bucket, testSet[i][3]);
  //}
  _.range(1, 15).forEach(k => {
    const accuracy = _.chain(testSet)
      .filter(testPoint => knn(trainingSet, testPoint[0],k) === testPoint[3])
      .size()
      .divide(testSetSize)
      .value();
    console.log('Accuracy', accuracy , 'for k = ',k);
  });
}

function knn(data, point,k) {
  return _.chain(data)
    .map(row => [distance(row[0], point), row[3]])
    .sortBy(row => row[0])
    .slice(0, k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(rows => rows[1])
    .last()
    .first()
    .parseInt()
    .value();
}

function distance(pointA, pointB) {
    return _.chain(pointA)
        .zip(pointB)
        .map([a,b]) => (a-b)**2
    .s
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);
  return [testSet, trainingSet];
}
