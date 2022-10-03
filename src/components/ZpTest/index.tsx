import React, { useEffect } from 'react';
import { getTextWidth } from '@/utils/str';

const ZpTest = () => {

  const str = '你好此番还会发你麻烦次机会覅'

  return (
    <div>
      {getTextWidth(str)}
    </div>
  )
}

export default ZpTest;
