import React, { memo } from 'react';
import { ZpSelectProps } from '../interface';
import DictSelect from './DictSelect';
// import SearchSelect from './components/SearchSelect';

const ZpSelect: React.FC<ZpSelectProps> = (props) => {
  if (props['queryFn']) {
    // return <SearchSelect {...props} />;
  } else {
    return <DictSelect {...props} />;
  }
};

export default memo(ZpSelect);
