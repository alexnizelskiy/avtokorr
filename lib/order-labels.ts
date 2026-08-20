export type OrderStage =
  | "REQUEST"
  | "SEARCH"
  | "PURCHASE"
  | "DOCUMENTS"
  | "DELIVERY_TO_PORT"
  | "LOADING"
  | "SEA_FREIGHT"
  | "CUSTOMS"
  | "DELIVERY_RU"
  | "RECEIVED";

/** Порядок этапов трекинга (как в ТЗ). */
export const orderStages: OrderStage[] = [
  "REQUEST",
  "SEARCH",
  "PURCHASE",
  "DOCUMENTS",
  "DELIVERY_TO_PORT",
  "LOADING",
  "SEA_FREIGHT",
  "CUSTOMS",
  "DELIVERY_RU",
  "RECEIVED",
];

export const orderStageLabels: Record<OrderStage, string> = {
  REQUEST: "Заявка",
  SEARCH: "Поиск автомобиля",
  PURCHASE: "Покупка",
  DOCUMENTS: "Подготовка документов",
  DELIVERY_TO_PORT: "Доставка в порт",
  LOADING: "Погрузка",
  SEA_FREIGHT: "Морская перевозка",
  CUSTOMS: "Таможенное оформление",
  DELIVERY_RU: "Доставка по России",
  RECEIVED: "Получение автомобиля",
};

export const orderStageOptions = orderStages.map((s) => [s, orderStageLabels[s]] as const);

/** Индекс этапа в цепочке (для прогресса). */
export function stageIndex(stage: OrderStage): number {
  return orderStages.indexOf(stage);
}
