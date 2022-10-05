import styled from 'styled-components';

// 最外面的弹窗
// 样式变量: -drag-border-color --drag-border-size
export const SplitPaneWapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  overflow: auto;
  --drag-border-color: #ddd;
  --drag-border-size: 2px;
`;
