import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';

import { SetURLSearchParams } from 'react-router-dom';
import { addUrlParameter } from '../utils/addUrlParameter';
import { deleteUrlParameter } from '../utils/deleteUrlParams';
interface DebounceInputProps {
  search?: string;
  setSearch: (value: string) => void;
  setSearchParams: SetURLSearchParams;
}

const DebounceInput = ({
  search,
  setSearch,
  setSearchParams,
}: DebounceInputProps) => {
  const [value, setValue] = useState(search || '');

  const sendRequest = useCallback((value: string) => {
    // set url params and navigation to new url
    if (!value) {
      const urlWithDeletedSearchParams = deleteUrlParameter('search');
      setSearchParams(urlWithDeletedSearchParams);
      setSearch('');
    } else if (value) {
      const urlWithUpdatedSearchParams = addUrlParameter('search', value);
      setSearchParams(urlWithUpdatedSearchParams);
      setSearch(value);
    }
  }, []);

  // now send request is debounced
  // memoize the debounce call with useMemo
  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  // onChange calls debounced function
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // send data from input field to the backend here
    // will be triggered on every keystroke
    const value = e.target.value;
    setValue(value);
    debouncedSendRequest(value);
  };

  return <input onChange={onChange} max={100} value={value} />;
};

export default DebounceInput;
