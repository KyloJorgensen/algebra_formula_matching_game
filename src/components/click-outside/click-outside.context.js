import { createContext } from 'react';
export const ClickOutsideContext = createContext({
	addClickOutsideEventListener: () => {throw new Error('Error: Cannot addClickOutsideEventListener no ClickOutsideContext.Provider element in parents')},
	removeClickOutsideEventListener: () => {throw new Error('Error: Cannot removeClickOutsideEventListener no ClickOutsideContext.Provider element in parents')},
});