const npsCalc = (scores) => {
  let promoters = 0;
  let detractors = 0;

  for (var i = 0, l = scores.length; i < l; i++) {
    if (scores[i].nps >= 9) promoters++;
    if (scores[i].nps <= 6) detractors++;
  }

  let total =  Math.round(((promoters / l) - (detractors / l)) * 100);

  total = total || 0;
  return total;
};

export default npsCalc;
