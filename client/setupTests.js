import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
require('jest-fetch-mock').enableMocks()
configure({ adapter: new Adapter() });