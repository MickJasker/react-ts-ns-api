/** Import React */
import * as React from 'react';

/** Import Test Enviroment */
import { shallow, ShallowWrapper } from 'enzyme';

/** Import Tested Component */
import RoutePlannerTravelPart from './RoutePlannerTravelPart';

describe(`<${RoutePlannerTravelPart.name} />`, () => {
  describe('default', () => {
    let html = ShallowWrapper;

    beforeAll(() => {
      html = shallow(<RoutePlannerTravelPart />);
    });

    it('should render a <div />', () => {
      expect(html.contains(<div />)).toBe(true);
    });
  });
});
