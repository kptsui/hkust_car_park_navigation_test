var car_lots = [
  {
    "car_id": "c",
    "x": 297,
    "y":489
  },
  {
    "car_id": "b",
    "x": 297,
    "y": 502
  }
];

var deployed_beacons = [
  {
    "bid": 0,
    "bx": 307,
    "by": 278,
    "x": 0,
    "y": 0
  },
  {
    "bid": 1,
    "bx": 307,
    "by": 278,
    "x": 316,
    "y": 278
  },
  {
    "bid": 2,
    "bx": 302,
    "by": 302,
    "x": 316,
    "y": 302
  },
  {
    "bid": 3,
    "bx": 285,
    "by": 334,
    "x": 316,
    "y": 334
  },
  {
    "bid": 4,
    "bx": 304,
    "by": 362,
    "x": 316,
    "y": 362
  },
  {
    "bid": 5,
    "bx": 284,
    "by": 382,
    "x": 316,
    "y": 382
  },
  {
    "bid": 6,
    "bx": 304,
    "by": 404,
    "x": 316,
    "y": 404
  },
  {
    "bid": 7,
    "bx": 284,
    "by": 420,
    "x": 316,
    "y": 420
  },
  {
    "bid": 8,
    "bx": 284,
    "by": 446,
    "x": 316,
    "y": 446
  },
  {
    "bid": 9,
    "bx": 284,
    "by": 465,
    "x": 316,
    "y": 465
  },
  {
    "bid": 10,
    "bx": 284,
    "by": 489,
    "x": 316,
    "y": 487
  },
  {
    "bid": 11,
    "bx": 303,
    "by": 510,
    "x": 316,
    "y": 502
  },
  {
    "bid": 12,
    "bx": 339,
    "by": 510,
    "x": 336,
    "y": 502
  },
  {
    "bid": 13,
    "bx": 342,
    "by": 489,
    "x": 336,
    "y": 487
  },
  {
    "bid": 14,
    "bx": 342,
    "by": 465,
    "x": 336,
    "y": 465
  },
  {
    "bid": 15,
    "bx": 339,
    "by": 446,
    "x": 336,
    "y": 446
  },
  {
    "bid": 16,
    "bx": 339,
    "by": 420,
    "x": 336,
    "y": 420
  },
  {
    "bid": 17,
    "bx": 339,
    "by": 404,
    "x": 336,
    "y": 404
  },
  {
    "bid": 18,
    "bx": 361,
    "by": 382,
    "x": 336,
    "y": 382
  },
  {
    "bid": 19,
    "bx": 341,
    "by": 362,
    "x": 336,
    "y": 362
  },
  {
    "bid": 20,
    "bx": 260,
    "by": 334,
    "x": 336,
    "y": 334
  },
  {
    "bid": 21,
    "bx": 342,
    "by": 302,
    "x": 336,
    "y": 302
  },
  {
    "bid": 22,
    "bx": 340,
    "by": 278,
    "x": 336,
    "y": 278
  },
  {
    "bid": 98,
    "bx": 348,
    "by": 399,
    "x": 348,
    "y": 399
  },
  {
    "bid": 99,
    "bx": 340,
    "by": 278,
    "x": 0,
    "y": 0
  }
];

var map = {
  c: {

  },
  b: {

  },
  p1: {
    p2: 24
  },
  p2: {
    p3: 32
  },
  p3: {
    p4: 28
  },
  p4: {
    p5: 20
  },
  p5: {
    p6: 22
  },
  p6: {
    p7: 16
  },
  p7: {
    p8: 26
  },
  p8: {
    p9: 19
  },
  p9: {
    p10: 24
  },
  p10: {
    c: 19,
    p11: 21
  },
  p11: {
    b: 21,
    p12: 20
  },
  p12: {
    p13: 21
  },
  p13: {
    p14: 24
  },
  p14: {
    p15: 19
  },
  p15: {
    p16: 26
  },
  p16: {
    p17: 16
  },
  p17: {
    p18: 22
  },
  p18: {
    p19: 20
  },
  p19: {
    p20: 28
  },
  p20: {
    p21: 32
  },
  p21: {
    p22: 24
  }
};

var graph = new Graph(map);
