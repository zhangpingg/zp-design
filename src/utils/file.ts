import { message } from 'antd';

const downloadFile = (res: any, messageText = '文件导出成功') => {
  const disposition = res.headers.get('content-disposition');
  if (disposition && disposition.match(/attachment;/)) {
    const filename = disposition.replace(/attachment;.*filename=/, '').replace(/"/g, '');
    res.blob().then((data: Blob | MediaSource) => {
      const blobUrl = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.download = decodeURIComponent(filename);
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      });
    });
    message.success(messageText);
  } else {
    message.warning('获取不到文件');
  }
};

export default downloadFile;
