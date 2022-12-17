import { ZpSelectOptionValue, IObject } from '../interface/index';
import { useMemo } from 'react';

export const getDisabledTitle = (values: ZpSelectOptionValue[], opitons: IObject) => {
  let title = '';
  (values || [])?.forEach((i: ZpSelectOptionValue) => {
    title += `${opitons.find((d: IObject) => d.value === i)?.label}
  `;
  });
  return title;
};
