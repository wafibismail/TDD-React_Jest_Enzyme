
/** render from testing library not needed; we will use shallow from enzyme instead
*///import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';


describe('App', () => {
  it("", () => {
		// shallow: DON't remder the whole tree; Only render the app component
    const appWrapper = shallow(<App />)
  });
});