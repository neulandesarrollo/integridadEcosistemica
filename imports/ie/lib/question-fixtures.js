import { LIKERT_CATEGORIES, LIKERT_ANSWERS} from  './likert.js'

// Shift namespace
const { VEG, FAUNA, LAND, WATER, CONTAM } = LIKERT_CATEGORIES
const {
  AGREE_DESC, AGREE_ASC,
  QUANT_F_DESC, QUANT_F_ASC,
  QUANT_M_DESC, QUANT_M_ASC
} = LIKERT_ANSWERS

export const questions = [
  {
    category: VEG,
    text: "La vegetación presente desde su percepción está bien conservada",
    answers: AGREE_DESC,
    isActive: true,
		isMandatory: true
  },
  {
    category: VEG,
    text: "Se muestran especies que describen a la vegetación como bien conservada",
    answers: QUANT_F_DESC,
    isActive: true,
		isMandatory: true
  },
  {
    category: VEG,
    text: "Están presentes las especies dominantes típicas de la vegetación primaria",
    answers: QUANT_F_DESC,
    isActive: true,
		isMandatory: true
  },
  {
    category: VEG,
    text: "Existen especies introducidas en expansión",
    answers: QUANT_F_ASC,
    isActive: true,
		isMandatory: true
  },
  {
    category: VEG,
    text: "Se han identificado especies invasoras en expansión",
    answers: QUANT_F_ASC,
    isActive: true,
		isMandatory: true
  },
  {
    category: VEG,
    text: "Los aprovechamientos forestales autorizados afectan la cobertura vegetal",
    answers: QUANT_M_ASC,
    isActive: true,
		isMandatory: true
  },
  {
    category: VEG,
    text: "La tala ilegal se observa a gran escala",
    answers: AGREE_DESC,
    isActive: true,
		isMandatory: true
  },
  {
    category: VEG,
    text: "Las prácticas agrícolas amenazan la cobertura vegetación",
    answers: AGREE_DESC,
    isActive: true,
		isMandatory: true
  },
  {
    category: FAUNA,
    text: "De acuerdo con las especies encontradas se puede decir que el área está conservada",
    answers: AGREE_DESC,
    isActive: true,
		isMandatory: true
  },
  {
    category: FAUNA,
    text: "La riqueza y abundancia de algunas especies dan cuenta de la conservación del área",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: FAUNA,
    text: "Las actividades de caza furtiva afectan a las poblaciones",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: FAUNA,
    text: "Se han identificado especies introducidas en expansión",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: FAUNA,
    text: "Se ha presentado extirpación de especies en el área",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: LAND,
    text: "Los suelos están bien conservados",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: LAND,
    text: "La erosión es evidente en el área",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: LAND,
    text: "Se han identificado prácticas, como las agrícolas, que están produciendo erosión",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: LAND,
    text: "En el área la pérdida de cobertura vegetal se encuentra asociada a la erosión",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: LAND,
    text: "El nivel de uso intensivo de pesticidas que afectan al suelo",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: LAND,
    text: "Hay prácticas benéficas de conservación del suelo que benefician a la vegetación",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: LAND,
    text: "Es necesario cambiar las prácticas del manejo del suelo que actualmente se realizan",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: WATER,
    text: "El agua de ríos y cuerpos es de buena calidad",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: WATER,
    text: "Hay acciones de conservación de las fuentes de agua que garantizan el suministro a la población aledaña",
    answers: QUANT_F_DESC,
    isActive: true
  },
  {
    category: WATER,
    text: "Las prácticas agrícolas de regadío afectan la disponibilidad de agua",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: WATER,
    text: "Hay conflictos sociales por la escasez de agua para las actividades agrícolas",
    answers: AGREE_DESC,
    isActive: true
  },
  {
    category: WATER,
    text: "Los cursos de ríos están contaminados",
    answers: QUANT_M_ASC,
    isActive: true
  },
  {
    category: CONTAM,
    text: "Se manifiestan fuentes de contaminantes del agua, suelo o aire",
    answers: QUANT_M_ASC,
    isActive: true
  },
  {
    category: CONTAM,
    text: "Hay uso intensivo de agro-químicos en la zona",
    answers: QUANT_M_DESC,
    isActive: true
  },
  {
    category: CONTAM,
    text: "Se han manifestado quejas por contaminantes de diversos orígenes",
    answers: QUANT_F_ASC,
    isActive: true
  },
  {
    category: CONTAM,
    text: "El grado de contaminación del área afecta su conservación",
    answers: AGREE_DESC,
    isActive: true
  },
  // {
  // category: ,
  //   text: "",
  //   answers: ,
  //   isActive: true
  // },
]
