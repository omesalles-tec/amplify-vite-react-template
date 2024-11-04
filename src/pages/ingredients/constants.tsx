export const INGREDIENT_PREFERENCES = {
  pageSize: 30,
  contentDisplay: [
    { id: "id", visible: false },
    { id: "name", visible: true },
    { id: "unit", visible: true },
    { id: "maxLifespan", visible: true },
    { id: "delete", visible: true },
  ],
  wrapLines: false,
  stripedRows: false,
  contentDensity: "compact",
  stickyColumns: { first: 0, last: 1 },
};
export const ITEM_PREFERENCES = {
  pageSize: 30,
  contentDisplay: [
    { id: "id", visible: false },
    { id: "description", visible: true },
    { id: "price_per_unit", visible: true },
    { id: "price", visible: true },
    { id: "quantity", visible: true },
    { id: "delete", visible: true },
  ],
  wrapLines: false,
  stripedRows: false,
  contentDensity: "compact",
  stickyColumns: { first: 0, last: 1 },
};
