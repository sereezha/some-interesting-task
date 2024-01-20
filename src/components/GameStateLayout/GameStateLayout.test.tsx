import { render, screen } from '@testing-library/react';
import GameStateLayout from '.';

describe('GameStateLayout', () => {
  it('should render component', () => {
    const title = 'Some title';
    render(
      <GameStateLayout
        title={title}
        button={{ content: 'button content' }}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render component subtitle if it was passed', () => {
    const subtitle = 'Some subtitle';
    render(
      <GameStateLayout
        title='Some title'
        subtitle={subtitle}
        button={{ content: 'button content' }}
      />
    );

    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });
});
