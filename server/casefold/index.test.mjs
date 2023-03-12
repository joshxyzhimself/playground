
// @ts-check

import * as casefold from './index.mjs';

const values = [
  '\u0041 \u00DF \u0130',
  '\u0041 \u00DF \u0130',
  '\u0041 \u00DF \u0130',
  'MASSE',
  'Maße',
  'example',
  'Leszek Jańczuk',
  'とある白い猫',
  'Encyclopædius',
  'Vejvančický',
  'حسن علي البط',
  'Þadius',
  '😂',
  'παράδειγμα',
  'ΠΑΡΑΔΕΙΓΜΑ',
];

values.forEach((value) => {
  console.log(`simple_casefold "${value}" : "${casefold.simple_casefold(value)}"`);
  console.log(`full_casefold "${value}" : "${casefold.full_casefold(value)}"`);
  console.log(`full_casefold_normalize_nfkc "${value}" : "${casefold.full_casefold_normalize_nfkc(value)}"`);
  console.log(`special_casefold "${value}" : "${casefold.special_casefold(value)}"`);
  console.log('---');
});