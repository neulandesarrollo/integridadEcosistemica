// Helper method
const reverse = (arr) => {
  return _.clone(arr).reverse()
}

// Selections should be listed in decreasing order (5 -> 1)
// Agreement
const AGREE_DESC = ["Muy de acuerdo", "De acuerdo", "Indiferente", "En desacuerdo", "Muy en desacuerdo"]
const AGREE_ASC = reverse(AGREE_DESC)

// Quantities female
const QUANT_F_DESC = ["Desmasiadas", "Muchas", "Varias", "Pocas", "Ninguna"]
const QUANT_F_ASC = reverse(QUANT_F_DESC)

// Quanities male
const QUANT_M_ASC = ["Ninguno", "Pocos", "Varios", "Muchos", "Desmasiados"]
const QUANT_M_DESC = reverse(QUANT_M_ASC)

export const LIKERT_ANSWERS = {
  AGREE_DESC, AGREE_ASC,
  QUANT_F_DESC, QUANT_F_ASC,
  QUANT_M_DESC, QUANT_M_DESC
}

export const LIKERT_CATEGORIES = {
  "VEG":  "Vegetación"
  "FAUNA":  "Fauna"
  "LAND":  "Suelos"
  "WATER":  "Agua",
  "CONTAM": "Contamination"
}
