import { render, screen } from '@testing-library/react';
import Container from '.';

const containerContent = 'Container content!';

describe('Container', () => {
  it('should render component', () => {
    render(<Container>{containerContent}</Container>);

    expect(screen.getByText(containerContent)).toBeInTheDocument();
  });
});
