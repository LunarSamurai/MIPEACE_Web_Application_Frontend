import { createContext } from 'react';

const TestPageContext = createContext({
    isRandomizeEnabled: false,
    setIsRandomizeEnabled: () => {}
});

export default TestPageContext;
