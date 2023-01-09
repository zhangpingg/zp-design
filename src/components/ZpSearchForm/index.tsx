import SearchForm from './part/SearchForm';
import SimpleSearchForm from './part/SimpleSearchForm';

type SearchFormType = typeof SearchForm;

type ZpSearchFormInstance = {
  SimpleSearchForm: typeof SimpleSearchForm;
} & SearchFormType;

const ZpSearchForm = SearchForm as ZpSearchFormInstance;

ZpSearchForm.SimpleSearchForm = SimpleSearchForm;
export default ZpSearchForm;
