// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";

interface ColumnDefinition {
  id: string;
  width?: number;
  [key: string]: any;
}

const mapWithColumnDefinitionIds = (
  columnDefinitions: ColumnDefinition[],
  propertyName: string,
  items: number[]
): { id: string; [key: string]: any }[] =>
  columnDefinitions.map(({ id }, i) => ({
    id,
    [propertyName]: items[i],
  }));

const addToColumnDefinitions = (
  columnDefinitions: ColumnDefinition[],
  propertyName: string,
  columns: Partial<ColumnDefinition>[] | undefined
): ColumnDefinition[] =>
  columnDefinitions.map((colDef) => {
    const column = (columns || []).find((col) => col.id === colDef.id);
    return {
      ...colDef,
      [propertyName]: column?.[propertyName] ?? colDef[propertyName],
    };
  });

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export function useColumnWidths(storageKey: any, columnDefinitions: any) {
  const [widths, saveWidths] = useLocalStorage(storageKey);

  function handleWidthChange(event: any) {
    saveWidths(mapWithColumnDefinitionIds(columnDefinitions, 'width', event.detail.widths));
  }
  const memoDefinitions = useMemo(() => {
    return addToColumnDefinitions(columnDefinitions, 'width', widths as Partial<ColumnDefinition>[] | undefined);
  }, [widths, columnDefinitions]);

  return [memoDefinitions, handleWidthChange];
}
