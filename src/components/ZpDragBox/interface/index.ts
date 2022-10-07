import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

export type AlignProps = 'left' | 'right' | 'center';
export interface DragItemProps {
  title: string;
  dataIndex?: string; // key
  checked?: boolean; // 是否选中
  disabled?: boolean; // 是否可拖拽
  fixed?: string; // 列固定
}
export interface DragBoxProps {
  id: string;
  uniqKey: keyof DragItemProps;
  dragList: DragItemProps[];
  dragEndCb?: (...set: any) => void;
  render: (
    item: DragItemProps,
    provided1: DraggableProvided,
    snapshot: DraggableStateSnapshot,
  ) => any;
}
export type DragItemsProps = Omit<DragBoxProps, ''>;
