// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';

export function useColumnWidths(storageKey, columnDefinitions) {
  const [widths, saveWidths] = useLocalStorage(storageKey);

  function handleWidthChange(event) {
    saveWidths(mapWithColumnDefinitionIds(columnDefinitions, 'width', event.detail.widths));
  }
  const memoDefinitions = useMemo(() => {
    return addToColumnDefinitions(columnDefinitions, 'width', widths);
  }, [widths, columnDefinitions]);

  return [memoDefinitions, handleWidthChange];
}

const addToColumnDefinitions = (columnDefinitions, propertyName, columns) =>
  columnDefinitions.map(colDef => {
    const column = (columns || []).find(col => col.id === colDef.id);
    return {
      ...colDef,
      [propertyName]: (column && column[propertyName]) || colDef[propertyName],
    };
  });

const mapWithColumnDefinitionIds = (columnDefinitions, propertyName, items) =>
  columnDefinitions().map(({ id }, i) => ({
    id,
    [propertyName]: items[i],
  }));