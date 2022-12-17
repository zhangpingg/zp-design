import commonZpSelect from './components';

type commonZpSelectProps = typeof commonZpSelect;
interface commonZpSelectAllProps extends commonZpSelectProps {}

const ZpSelect = commonZpSelect as commonZpSelectAllProps;

export default ZpSelect;
