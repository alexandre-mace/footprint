import {
  administration,
  airplane,
  bank,
  building,
  buyingCategory,
  car,
  clothes,
  culture,
  data,
  electricity,
  electricityHeatingRatio,
  electronic,
  fish,
  flatVsHouseRatio,
  foodCategory,
  health,
  healthEducation,
  heating,
  house,
  infrastructure,
  keeperRatio,
  leisure,
  longFlightCost,
  meat,
  mediumFlightCost,
  milkEggs,
  noThrashPolicy,
  oneYoutubeStreamingHourForAYear,
  others,
  othersBuying,
  othersPublic,
  otherTransports,
  publicCategory,
  publicDecarbRatio,
  sevenMnShower,
  teaching,
  thrash,
  veganAnimalConsumption,
  vegetarianFleshConsumption,
} from "./simulation-data";

export interface SimulationPoste {
  name: string;
  size: number;
  category: string;
}

const computeData = (
  vegan: boolean,
  vegetarian: boolean,
  noCar: boolean,
  noThrash: boolean,
  keeper: boolean,
  flat: boolean,
  noHousingFossile: boolean,
  secondHandClothes: boolean,
  publicDecarb: boolean,
  meatReduction: number,
  longFlights: number,
  mediumFlights: number,
  localFood: boolean,
  shortShowers: boolean,
  stopYoutubeStreaming: boolean
) => {
  return data.reduce((acc: Array<SimulationPoste>, category) => {
    category.children.forEach((datum) => {
      acc.push(
        computeDatumSize(
          datum,
          vegan,
          vegetarian,
          noCar,
          noThrash,
          keeper,
          flat,
          noHousingFossile,
          secondHandClothes,
          publicDecarb,
          meatReduction,
          longFlights,
          mediumFlights,
          localFood,
          shortShowers,
          stopYoutubeStreaming
        )
      );
    });
    return acc;
  }, []);
};

const computeDatumSize = (
  datum: SimulationPoste,
  vegan: boolean,
  vegetarian: boolean,
  noCar: boolean,
  noThrash: boolean,
  keeper: boolean,
  flat: boolean,
  noHousingFossile: boolean,
  secondHandClothes: boolean,
  publicDecarb: boolean,
  meatReduction: number,
  longFlights: number,
  mediumFlights: number,
  localFood: boolean,
  shortShowers: boolean,
  stopYoutubeSteaming: boolean
) => {
  if (
    vegan &&
    (datum.name === meat || datum.name === fish || datum.name === milkEggs)
  ) {
    return {
      ...datum,
      size: localFood ? veganAnimalConsumption * 0.87 : veganAnimalConsumption,
    };
  }
  if (vegetarian && (datum.name === meat || datum.name === fish)) {
    return {
      ...datum,
      size: localFood
        ? vegetarianFleshConsumption * 0.87
        : vegetarianFleshConsumption,
    };
  }
  if (localFood && datum.category === foodCategory) {
    return { ...datum, size: datum.size * 0.87 };
  }
  if (noCar && datum.name === car) {
    return { ...datum, size: 0 };
  }
  if (noThrash && datum.name === thrash) {
    return { ...datum, size: noThrashPolicy };
  }
  if (
    keeper &&
    (datum.name === othersBuying ||
      datum.name === electronic ||
      datum.name === leisure)
  ) {
    return { ...datum, size: datum.size / keeperRatio };
  }
  if (flat && keeper && datum.name === house) {
    return {
      ...datum,
      size: datum.size / keeperRatio / flatVsHouseRatio,
    };
  }
  if (keeper && datum.name === house) {
    return { ...datum, size: datum.size / keeperRatio };
  }
  if (flat && datum.name === house) {
    return { ...datum, size: datum.size / flatVsHouseRatio };
  }
  if (flat && datum.name === building) {
    return { ...datum, size: 0 };
  }
  if (noHousingFossile && datum.name === heating) {
    return { ...datum, size: 0 };
  }
  if (!noHousingFossile && datum.name === heating) {
    return { ...datum, size: datum.size - (shortShowers ? sevenMnShower : 0) };
  }
  if (!noHousingFossile && datum.name === electricity) {
    return {
      ...datum,
      size:
        datum.size -
        (stopYoutubeSteaming ? oneYoutubeStreamingHourForAYear : 0),
    };
  }
  if (noHousingFossile && datum.name === electricity && flat) {
    return {
      ...datum,
      size:
        datum.size * 1.3 -
        (stopYoutubeSteaming ? oneYoutubeStreamingHourForAYear : 0) -
        (shortShowers ? sevenMnShower / 3 : 0),
    };
  }
  if (noHousingFossile && datum.name === electricity) {
    return {
      ...datum,
      size:
        datum.size * electricityHeatingRatio -
        (stopYoutubeSteaming ? oneYoutubeStreamingHourForAYear : 0) -
        (shortShowers ? sevenMnShower / 3 : 0),
    };
  }
  if (secondHandClothes && datum.name === clothes) {
    return { ...datum, size: 0 };
  }
  if (
    publicDecarb &&
    (datum.name === infrastructure ||
      datum.name === culture ||
      datum.name === teaching ||
      datum.name === health ||
      datum.name === healthEducation ||
      datum.name === otherTransports ||
      datum.name === bank ||
      datum.name === administration ||
      (datum.name === othersPublic && datum.category === publicCategory))
  ) {
    return { ...datum, size: datum.size / publicDecarbRatio };
  }
  if (meatReduction && datum.name === meat) {
    return { ...datum, size: datum.size / meatReduction };
  }
  if (datum.name === airplane) {
    return {
      ...datum,
      size: longFlights * longFlightCost + mediumFlights * mediumFlightCost,
    };
  }
  return datum;
};

export default computeData;
