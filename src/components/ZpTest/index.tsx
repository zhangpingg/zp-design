import React, { useEffect } from 'react';
import { getTextWidth } from '@/utils/str';
import { EventEmitter } from '@/utils/subscribe';

const ZpTest = () => {
  const str = '你好此番还会发你麻烦次机会覅';

  useEffect(() => {
    const EventBus = new EventEmitter();

    EventBus.on('suscribe', (value) => {
      console.log(value);
    });

    EventBus.emit('suscribe', 1);
  }, []);

  return <div>{getTextWidth(str)}</div>;
};

export default ZpTest;
