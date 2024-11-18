// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export const VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main distribution properties",
    options: [
      { id: "avgCost", label: "Average cost" },
      { id: "avgTime", label: "Average Time" },
      { id: "recipesArray", label: "Recipes" },
    ],
  },
];

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Distributions" },
  { value: 30, label: "30 Distributions" },
  { value: 50, label: "50 Distributions" },
];

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: ["avgCost", "avgTime", "recipesArray"],
};
