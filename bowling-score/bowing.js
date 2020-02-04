function bowlingScore(frames) {
  // Figure out the score!
  //   Get the frames
  const _frames = frames.split(' ');
  let totalScore = 0;
  let scores = [];

  //   Get the scores for each frame
  for (let i = 0; i < _frames.length; i++) {
    let _nextTwoRolls = i === 9 ? [] : _frames[i + 1].split('');
    if (_nextTwoRolls.length === 1) {
      _nextTwoRolls.push(_frames[i + 2][0]);
    }

    let _score = getDefaultFrameScore(_frames[i], {
      isLastFrame: i === 9,
      nextTwoRolls: _nextTwoRolls
    });
    scores.push(_score);
    totalScore += _score;
  }
  return totalScore;
}

// nextTwoRolls is expected if frame is a strike or a spare. it is an array
function getDefaultFrameScore(
  frame,
  { isLastFrame = false, nextTwoRolls = [] }
) {
  let score = 0;
  if (isLastFrame) {
    //     check if there's a slash, discard value before it and return 10
    if (frame.indexOf('/') === 1) {
      score = 10 + getRollScore(frame[2]);
    } else if (frame.indexOf('/') === 2) {
      score = 10 + getRollScore(frame[0]);
    } else {
      score = frame
        .split('')
        .reduce((total, item) => getRollScore(item) + total, 0);
    }
  } else {
    if (isStrike(frame)) {
      score =
        10 +
        (nextTwoRolls[1] === '/'
          ? 10
          : getRollScore(nextTwoRolls[0]) + getRollScore(nextTwoRolls[1]));
    } else if (isSpare(frame)) {
      score = 10 + getRollScore(nextTwoRolls[0]);
    } else {
      score = frame
        .split('')
        .reduce((total, item) => getRollScore(item) + total, 0);
    }
  }
  return score;
}

function getRollScore(roll) {
  return roll.toUpperCase() === 'X' ? 10 : parseInt(roll);
}

// The following only apply to the first 9 frames!
/**
 * @param {String} frame
 */
function isStrike(frame) {
  return frame.toUpperCase() === 'X';
}

function isSpare(frame) {
  return frame.indexOf('/') !== -1;
}
