const transportCategory = "Déplacements";
const foodCategory = "Nourriture";
const housingCategory = "Logement";
const buyingCategory = "Achats";
const publicCategory = "Dépense publique";

const meat = "Viande 🥩";
const airplane = "Avion ✈️";
const car = "Voiture 🚗";
const fish = "Poisson 🐟";
const milkEggs = "Lait et oeufs 🥛";
const heating = "Gaz et fioul 🪨";
const thrash = "Déchets, eau 🗑️";
const clothes = "Vêtements 🧢";
const electricity = "Électricité ⚡️";
const house = "Maison 🏠";
const building = "Construction 🏗️";
const leisure = "Loisirs ⛱️";
const electronic = "Électronique, telecoms 💻";
const others = "Autres 😶";
const othersFood = "Autres nourriture 😶";
const othersBuying = "Autres achats 😶";
const othersPublic = "Autres public 😶";
const bank = "Assurance, banque 🏦";
const healthEducation = "Santé, éducation 🧑‍🏫";
const health = "Santé 🧑‍⚕️";
const teaching = "Enseignement 🧑‍🏫";
const culture = "Sport, culture 🖼️";
const infrastructure = "Infrastructures 🏤";
const administration = "Administration et défense 📝";
const otherTransports = "Autres transports 🚋";

const defaultCarCost = 2030;
const defaultMeatCost = 920;
const defaultFishCost = 120;
const defaultMilkEggsCost = 390;
const defaultFossileHeatingCost = 1180;
const defaultElectricityHouseCost = 160;
const defaultThrashCost = 120;
const defaultBuildCost = 440;
const defaultHouseCost = 530;
const defaultClothesCost = 170;
const defaultOtherBuyingCost = 240;
const defaultLeisureCost = 320;
const defaultElectronicCost = 180;
const defaultBankCost = 80;
const defaultHealthEducationCost = 80;
const defaultAdministrationCost = 310;
const defaultTeachingCost = 300;
const defaultHealthCost = 230;
const defaultInfrastructureCost = 200;
const defaultCultureCost = 90;
const defaultOtherPublicCost = 270;
const defaultOtherTransportCost = 190;
const defaultDrinksCost = 450;
const defaultVegetablesCost = 240;
const defaultOtherFoodCost = 230;
const longFlightCost = 2000;
const mediumFlightCost = 850;
const veganAnimalConsumption = 0;
const vegetarianFleshConsumption = 0;
const noThrashPolicy = 0;
const keeperRatio = 2;
const flatVsHouseRatio = 2;
const electricityHeatingRatio = 2;
const publicDecarbRatio = 5.5;
const sevenMnShower = 255;
const oneYoutubeStreamingHourForAYear = 3;
const defaultTotal = 13170;

const data = [
  {
    label: transportCategory,
    children: [
      {
        name: otherTransports,
        size: defaultOtherTransportCost,
        category: transportCategory,
      },
      { name: airplane, size: 430, category: transportCategory },
      { name: car, size: defaultCarCost, category: transportCategory },
    ],
  },
  {
    label: foodCategory,
    children: [
      { name: meat, size: defaultMeatCost, category: foodCategory },
      { name: "Boissons 🥤", size: defaultDrinksCost, category: foodCategory },
      { name: milkEggs, size: defaultMilkEggsCost, category: foodCategory },
      {
        name: "Fruits et légumes 🥕",
        size: defaultVegetablesCost,
        category: foodCategory,
      },
      { name: fish, size: defaultFishCost, category: foodCategory },
      { name: othersFood, size: defaultOtherFoodCost, category: foodCategory },
    ],
  },
  {
    label: housingCategory,
    children: [
      {
        name: heating,
        size: defaultFossileHeatingCost,
        category: housingCategory,
      },
      { name: building, size: defaultBuildCost, category: housingCategory },
      {
        name: electricity,
        size: defaultElectricityHouseCost,
        category: housingCategory,
      },
      { name: thrash, size: defaultThrashCost, category: housingCategory },
    ],
  },
  {
    label: buyingCategory,
    children: [
      { name: house, size: defaultHouseCost, category: buyingCategory },
      { name: leisure, size: defaultLeisureCost, category: buyingCategory },
      {
        name: electronic,
        size: defaultElectronicCost,
        category: buyingCategory,
      },
      { name: clothes, size: defaultClothesCost, category: buyingCategory },
      { name: bank, size: defaultBankCost, category: buyingCategory },
      {
        name: healthEducation,
        size: defaultHealthEducationCost,
        category: buyingCategory,
      },
      {
        name: othersBuying,
        size: defaultOtherBuyingCost,
        category: buyingCategory,
      },
    ],
  },
  {
    label: publicCategory,
    children: [
      {
        name: administration,
        size: defaultAdministrationCost,
        category: publicCategory,
      },
      { name: teaching, size: defaultTeachingCost, category: publicCategory },
      { name: health, size: defaultHealthCost, category: publicCategory },
      {
        name: infrastructure,
        size: defaultInfrastructureCost,
        category: publicCategory,
      },
      { name: culture, size: defaultCultureCost, category: publicCategory },
      {
        name: othersPublic,
        size: defaultOtherPublicCost,
        category: publicCategory,
      },
    ],
  },
];

export {
  data,
  buyingCategory,
  foodCategory,
  housingCategory,
  publicCategory,
  transportCategory,
  meat,
  airplane,
  car,
  fish,
  thrash,
  heating,
  milkEggs,
  clothes,
  electricity,
  house,
  building,
  others,
  electronic,
  leisure,
  infrastructure,
  culture,
  teaching,
  health,
  healthEducation,
  otherTransports,
  bank,
  administration,
  longFlightCost,
  veganAnimalConsumption,
  vegetarianFleshConsumption,
  noThrashPolicy,
  defaultCarCost,
  defaultMeatCost,
  defaultFishCost,
  defaultMilkEggsCost,
  defaultFossileHeatingCost,
  defaultElectricityHouseCost,
  defaultThrashCost,
  defaultBuildCost,
  defaultHouseCost,
  defaultClothesCost,
  keeperRatio,
  defaultLeisureCost,
  defaultElectronicCost,
  defaultOtherBuyingCost,
  flatVsHouseRatio,
  electricityHeatingRatio,
  publicDecarbRatio,
  defaultOtherPublicCost,
  defaultInfrastructureCost,
  defaultBankCost,
  defaultHealthCost,
  defaultHealthEducationCost,
  defaultTeachingCost,
  defaultCultureCost,
  defaultAdministrationCost,
  defaultOtherTransportCost,
  mediumFlightCost,
  defaultOtherFoodCost,
  defaultVegetablesCost,
  defaultDrinksCost,
  sevenMnShower,
  oneYoutubeStreamingHourForAYear,
  othersFood,
  othersBuying,
  othersPublic,
  defaultTotal
};
