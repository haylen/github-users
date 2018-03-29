import React from 'react';
import { noop } from 'lodash';
import { shallow } from 'enzyme';

import LoadMoreBtn from '../../components/loadMoreBtn';

describe('components/loadMoreBtn', () => {
  const loadMoreBtn = props => shallow(
    <LoadMoreBtn onClick={noop} {...props} />
  );

  it('renders without crashing', () => {
    const subject = loadMoreBtn();

    expect(subject).toBeInstanceOf(Object);
    expect(subject.find('.LoadMoreBtn').length).toEqual(1);
  });

  it('calls onClick when button is clicked', () => {
    const mockOnClick = jest.fn();
    const subject = loadMoreBtn({ onClick: mockOnClick });

    subject.find('.LoadMoreBtn').simulate('click');

    expect(mockOnClick).toHaveBeenCalled();
  });
});
